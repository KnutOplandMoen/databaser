"""Embedding pipeline for the TDT4145 chat assistant.

Reads two corpora:
  1. `database_systems.txt`   — Silberschatz/Korth/Sudarshan textbook (Del 1)
  2. `del_2_egnenotater.txt`  — Bratsbergs egne notater (Del 2)

Chunks them into ~500-word windows tagged with a chapter label, embeds each
chunk via OpenRouter's free embedding model, and writes the result to
`public/chunks.json`. The chat function (`api/chat.js`) loads this file at
runtime to do nearest-neighbour retrieval.

Requirements
------------
    pip install openai
    export OPENROUTER_API_KEY=<your key>

Run from the repo root:
    python noe.py

Env vars
--------
    OPENROUTER_API_KEY        (required)
    EMBED_MODEL               (default: nvidia/llama-nemotron-embed-vl-1b-v2:free)
    CHUNK_SIZE                (default: 500 words)
    NOE_MAX_CHUNKS            (debug: cap total chunks; useful for smoke tests)
    NOE_DRY_RUN=1             (skip embedding calls; write chunks with empty
                              embeddings — fast structural check)
"""

from __future__ import annotations

import json
import os
import re
import sys
import time
from collections import Counter
from pathlib import Path
from typing import Iterable

import openai

REPO_ROOT = Path(__file__).resolve().parent

EMBED_MODEL = os.environ.get("EMBED_MODEL", "nvidia/llama-nemotron-embed-vl-1b-v2:free")
CHUNK_SIZE = int(os.environ.get("CHUNK_SIZE", "500"))

# ─────────────────────────── Source 1: lærebok ───────────────────────────────

# Real chapter starts in the plain-text extract are uppercase on their own line:
#   CHAPTER 1
#   CHAPTER 2
#   ...
# (The lower-case "Chapter N Title" matches earlier in the file are TOC entries.)
TEXTBOOK_HEADER = re.compile(r"^CHAPTER\s+(\d+)\s*$", re.MULTILINE)

TEXTBOOK_TITLES: dict[int, str] = {
    1: "Introduction",
    2: "Introduction to the Relational Model",
    3: "Introduction to SQL",
    4: "Intermediate SQL",
    5: "Advanced SQL",
    6: "Database Design Using the E-R Model",
    7: "Relational Database Design",
    8: "Complex Data Types",
    9: "Application Development",
    10: "Big Data",
    11: "Data Analytics",
    12: "Physical Storage Systems",
    13: "Data Storage Structures",
    14: "Indexing",
    15: "Query Processing",
    16: "Query Optimization",
    17: "Transactions",
    18: "Concurrency Control",
    19: "Recovery System",
    20: "Database-System Architectures",
    21: "Parallel and Distributed Storage",
    22: "Parallel and Distributed Query Processing",
    23: "Parallel and Distributed Transaction Processing",
    24: "Advanced Indexing Techniques",
    25: "Advanced Application Development",
    26: "Blockchain Databases",
    27: "Formal Relational Query Languages",
    28: "Advanced Relational Database Design",
    29: "Object-Based Databases",
    30: "XML",
    31: "Information Retrieval",
    32: "PostgreSQL",
}


def textbook_chunks(text: str) -> list[dict]:
    """Yield 500-word chunks of the textbook, each tagged with its chapter."""
    matches = list(TEXTBOOK_HEADER.finditer(text))
    if not matches:
        print("  WARN: ingen 'CHAPTER N'-overskrifter funnet i læreboken", file=sys.stderr)
        return []

    spans: list[tuple[int, str]] = []  # (start_offset, chapter_label)
    for i, m in enumerate(matches):
        ch_num = int(m.group(1))
        title = TEXTBOOK_TITLES.get(ch_num, f"Chapter {ch_num}")
        label = f"Lærebok – Chapter {ch_num}: {title}"
        # Body of this chapter starts after the header line
        start = m.end()
        spans.append((start, label))

    # Build word-level (word, chapter) tuples
    word_tuples: list[tuple[str, str]] = []
    for i, (start, label) in enumerate(spans):
        end = spans[i + 1][0] if i + 1 < len(spans) else len(text)
        body = text[start:end]
        for w in body.split():
            word_tuples.append((w, label))

    return _windows_to_chunks(word_tuples, prefix="lærebok")


# ─────────────────────────── Source 2: notater ───────────────────────────────

# Notes use monotonically-increasing top-level numbers as chapter markers:
#   1. The architecture of a DBMS
#   2. Database storage
#   ...
# But sub-bullets inside chapters also start with "1. " / "2. " etc. We
# distinguish them with the rule: a chapter heading must have a number STRICTLY
# greater than the previous chapter number.
NOTES_HEADER = re.compile(r"^(\d+)\.\s+(.+)$", re.MULTILINE)


def notes_chunks(text: str) -> list[dict]:
    chapters: list[tuple[int, int, str]] = []  # (offset, num, title)
    last_num = 0
    for m in NOTES_HEADER.finditer(text):
        num = int(m.group(1))
        title = m.group(2).strip()
        if num <= last_num:
            continue  # sub-bullet, not a chapter
        chapters.append((m.start(), num, title))
        last_num = num

    if not chapters:
        print("  WARN: ingen toppnivå-kapitler funnet i notatene", file=sys.stderr)
        return []

    # Body of each chapter spans from end-of-header to start-of-next-header.
    word_tuples: list[tuple[str, str]] = []
    for i, (offset, num, title) in enumerate(chapters):
        # Find end of header line
        nl = text.find("\n", offset)
        body_start = nl + 1 if nl != -1 else offset
        body_end = chapters[i + 1][0] if i + 1 < len(chapters) else len(text)
        body = text[body_start:body_end]
        label = f"Notater – {num}. {title}"
        for w in body.split():
            word_tuples.append((w, label))

    return _windows_to_chunks(word_tuples, prefix="notater")


# ─────────────────────────── Shared chunking ─────────────────────────────────


def _windows_to_chunks(word_tuples: list[tuple[str, str]], prefix: str) -> list[dict]:
    """Slice (word, label) tuples into CHUNK_SIZE windows. Each chunk's chapter
    is the most-common label across the window."""
    chunks: list[dict] = []
    n = len(word_tuples)
    for i in range(0, n, CHUNK_SIZE):
        win = word_tuples[i : i + CHUNK_SIZE]
        if not win:
            continue
        text = " ".join(w for w, _ in win)
        if not text.strip():
            continue
        label = Counter(c for _, c in win).most_common(1)[0][0]
        chunks.append({
            "id": f"{prefix}-{len(chunks)}",
            "text": text,
            "chapter": label,
        })
    return chunks


# ─────────────────────────── Embedding ───────────────────────────────────────


def embed_with_retry(client: openai.OpenAI, text: str, *, attempts: int = 4) -> list[float]:
    """Call the embedding endpoint with linear backoff. Free models on
    OpenRouter rate-limit aggressively, so retry is non-optional."""
    last_err: Exception | None = None
    for attempt in range(attempts):
        try:
            resp = client.embeddings.create(
                model=EMBED_MODEL,
                input=[text],
                encoding_format="float",
            )
            return resp.data[0].embedding
        except Exception as e:  # noqa: BLE001 — network/HTTP errors vary by SDK version
            last_err = e
            wait = 2 ** attempt  # 1, 2, 4, 8 s
            print(f"      embed-retry {attempt + 1}/{attempts} ({type(e).__name__}: {e}); venter {wait}s", file=sys.stderr)
            time.sleep(wait)
    raise RuntimeError(f"embedding feilet etter {attempts} forsøk: {last_err}")


# ─────────────────────────── Driver ──────────────────────────────────────────


def progress(i: int, total: int, label: str, every: int = 25) -> None:
    if (i + 1) % every == 0 or i + 1 == total:
        pct = 100.0 * (i + 1) / total
        print(f"  [{i + 1:>5}/{total}] {pct:5.1f}%  {label[:60]}")


def main() -> None:
    api_key = os.environ.get("OPENROUTER_API_KEY")
    dry_run = os.environ.get("NOE_DRY_RUN") == "1"

    if not api_key and not dry_run:
        print("ERROR: OPENROUTER_API_KEY ikke satt. Sett miljøvariabelen, eller", file=sys.stderr)
        print("       kjør med NOE_DRY_RUN=1 for å bare bygge chunks.json uten embeddings.", file=sys.stderr)
        sys.exit(1)

    client = None
    if not dry_run:
        client = openai.OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=api_key,
        )

    # ── Read sources ───────────────────────────────────────────────────────
    book_path = REPO_ROOT / "database_systems.txt"
    notes_path = REPO_ROOT / "del_2_egnenotater.txt"

    if not book_path.exists():
        print(f"ERROR: mangler {book_path}", file=sys.stderr)
        sys.exit(1)
    if not notes_path.exists():
        print(f"ERROR: mangler {notes_path}", file=sys.stderr)
        sys.exit(1)

    print(f"Leser {book_path.name} …")
    book_text = book_path.read_text(encoding="utf-8", errors="replace")
    print(f"Leser {notes_path.name} …")
    notes_text = notes_path.read_text(encoding="utf-8", errors="replace")

    print("Chunker …")
    book_chunks = textbook_chunks(book_text)
    nts_chunks = notes_chunks(notes_text)
    print(f"  Lærebok: {len(book_chunks)} chunks")
    print(f"  Notater: {len(nts_chunks)} chunks")
    chunks = book_chunks + nts_chunks

    # Optional cap for smoke tests
    cap = os.environ.get("NOE_MAX_CHUNKS")
    if cap:
        cap_n = int(cap)
        chunks = chunks[:cap_n]
        print(f"  NOE_MAX_CHUNKS={cap_n} — kutter til {len(chunks)} totalt")

    # Show chapter histogram
    hist = Counter(c["chapter"] for c in chunks)
    print("\nKapittel-fordeling (topp 15):")
    for label, n in hist.most_common(15):
        print(f"  {n:>4}  {label}")
    if len(hist) > 15:
        print(f"  …  + {len(hist) - 15} flere kapitler")

    # ── Embed ─────────────────────────────────────────────────────────────
    if dry_run:
        print("\nNOE_DRY_RUN=1 — hopper over embedding")
        for c in chunks:
            c["embedding"] = []
    else:
        print(f"\nEmbedder {len(chunks)} chunks med {EMBED_MODEL} …")
        for i, c in enumerate(chunks):
            c["embedding"] = embed_with_retry(client, c["text"])
            progress(i, len(chunks), c["chapter"])

    # ── Write ─────────────────────────────────────────────────────────────
    out_path = REPO_ROOT / "public" / "chunks.json"
    out_path.parent.mkdir(parents=True, exist_ok=True)
    print(f"\nSkriver {out_path} …")
    with out_path.open("w", encoding="utf-8") as f:
        json.dump(chunks, f, ensure_ascii=False)

    size_mb = out_path.stat().st_size / (1024 * 1024)
    print(f"  Ferdig — {len(chunks)} chunks, {size_mb:.1f} MB")


if __name__ == "__main__":
    main()
