"""Generate the <section id="quiz"> block of every kap*/index.html.

Norwegian-only fork of the KTN quiz generator.

Run from anywhere:
    python tools/generate_chapter_quizzes.py

The script glob-walks ../kap*/index.html (relative to repo root), regex-replaces
the existing <section id="quiz">…</section> block with a freshly-rendered one
based on chapter_facts() below, and writes back UTF-8 with LF endings.

Edit chapter_facts() to fill in real questions/answers, then re-run.
"""

import re
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[1]

DIFF_SEQUENCE = [
    "L", "M", "H", "M", "L", "H", "M", "H", "L", "H", "M", "H", "L",
    "M", "H", "M", "L", "H", "M", "H", "M", "H", "L", "M", "H",
]

NO_TAG = {"L": "Lett", "M": "Middels", "H": "Vanskelig"}

NO_TEMPLATE = {
    "L": "Hva beskriver best {}?",
    "M": "Hvilken påstand er mest korrekt om {} i praksis?",
    "H": "I et større databasesystem, hvilken vurdering om {} er faglig best?",
}

OFFSETS = [7, 13, 19, 5, 11, 17, 3]


def pick_distractor_indices(n: int, i: int) -> list[int]:
    out = []
    for off in OFFSETS:
        j = (i + off) % n
        if j == i or j in out:
            continue
        out.append(j)
        if len(out) == 3:
            return out
    j = 0
    while len(out) < 3 and j < n:
        if j != i and j not in out:
            out.append(j)
        j += 1
    return out


def chapter_facts() -> dict[int, list[dict]]:
    """Return 25 facts per chapter — fill these in over time."""
    facts: dict[int, list[dict]] = {}

    for kap in range(1, 9):
        # Placeholder: 25 stub facts per chapter.
        # Replace these with real topic_no / answer_no pairs.
        facts[kap] = [
            {
                "topic_no": f"konsept #{i + 1} i kapittel {kap}",
                "answer_no": f"[Skriv inn svar for konsept #{i + 1} i kap {kap}]",
            }
            for i in range(25)
        ]

    return facts


def render_quiz_section(chapter_num: int, facts: list[dict]) -> str:
    assert len(facts) == 25, f"Kap {chapter_num} må ha 25 spørsmål, har {len(facts)}"

    cards = []
    for i, fact in enumerate(facts):
        diff = DIFF_SEQUENCE[i]
        tag = NO_TAG[diff]
        question = NO_TEMPLATE[diff].format(fact["topic_no"])
        answer = fact["answer_no"]
        cards.append(
            f'      <div class="quiz" data-quiz>\n'
            f'        <div class="q-label">Spørsmål {i + 1} · {tag}</div>\n'
            f'        <div class="q-text">{question}</div>\n'
            f'        <div class="quiz-reveal">\n'
            f'          <button class="reveal-btn">Se svar</button>\n'
            f'          <div class="answer">{answer}</div>\n'
            f'        </div>\n'
            f'      </div>'
        )

    body = "\n\n".join(cards)
    return (
        f'<section id="quiz">\n'
        f'    <div class="container">\n'
        f'      <h2>Test deg selv</h2>\n'
        f'      <p class="section-intro">Sjekk om du har forstått de viktigste konseptene fra dette kapittelet.</p>\n\n'
        f'{body}\n'
        f'    </div>\n'
        f'  </section>'
    )


def replace_quiz_section(path: Path, new_section: str) -> bool:
    text = path.read_text(encoding="utf-8")
    pattern = re.compile(r'<section id="quiz">.*?</section>', re.DOTALL)
    if not pattern.search(text):
        print(f"  WARN: ingen <section id=\"quiz\"> i {path}")
        return False
    new_text = pattern.sub(new_section, text)
    path.write_text(new_text, encoding="utf-8", newline="\n")
    return True


def main() -> None:
    facts = chapter_facts()
    paths = sorted(REPO_ROOT.glob("kap*/index.html"))
    if not paths:
        print(f"Ingen kap*/index.html funnet under {REPO_ROOT}")
        return

    for path in paths:
        m = re.match(r"kap(\d+)", path.parent.name)
        if not m:
            continue
        kap = int(m.group(1))
        if kap not in facts:
            print(f"  Hopper over {path} (ingen fakta for kap {kap})")
            continue
        section = render_quiz_section(kap, facts[kap])
        if replace_quiz_section(path, section):
            print(f"  OK   kap{kap}/index.html")


if __name__ == "__main__":
    main()
