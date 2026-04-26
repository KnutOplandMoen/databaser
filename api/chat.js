// Vercel serverless function — TDT4145 studieassistent.
//
// Tar imot {question, preset?, page_context?, history?}, gjør embedding-basert
// retrieval mot public/chunks.json (læreboken + Bratsbergs notater), bygger
// system-prompt med synlig tekst fra siden + topp-3 boktekst-utdrag, og
// streamer svar fra OpenRouter som NDJSON.
//
// Ingen engelsk-gren — siden er bare på norsk.

import { readFileSync } from "fs";
import { join } from "path";

// ─────────────────────── Presets / model fallback ───────────────────────────

const DEFAULT_PRESET = "balanced";

const PRESET_MODEL_DEFAULTS = {
  fast:        "liquid/lfm-2.5-1.2b-instruct:free",
  balanced:    "google/gemma-4-26b-a4b-it:free",
  quality:     "nvidia/nemotron-3-super-120b-a12b:free",
  quality_alt: "openai/gpt-oss-120b:free",
};

const PRESET_MODEL_FALLBACKS = {
  balanced:    ["nvidia/nemotron-3-nano-30b-a3b:free", "minimax/minimax-m2.5:free"],
  quality:     ["openai/gpt-oss-120b:free"],
  quality_alt: ["nvidia/nemotron-3-super-120b-a12b:free"],
  fast:        ["liquid/lfm-2.5-1.2b-thinking:free"],
};

const PRESET_ENV_KEYS = {
  fast:        "OPENROUTER_CHAT_MODEL_FAST",
  balanced:    "OPENROUTER_CHAT_MODEL_BALANCED",
  quality:     "OPENROUTER_CHAT_MODEL_QUALITY",
  quality_alt: "OPENROUTER_CHAT_MODEL_QUALITY_ALT",
};

function getModelCandidatesForPreset(preset) {
  const envKey = PRESET_ENV_KEYS[preset];
  const envOverride = envKey ? process.env[envKey] : null;
  const primary = envOverride || PRESET_MODEL_DEFAULTS[preset];
  const fallbacks = PRESET_MODEL_FALLBACKS[preset] || [];
  const seen = new Set();
  const out = [];
  for (const m of [primary, ...fallbacks]) {
    if (m && !seen.has(m)) {
      seen.add(m);
      out.push(m);
    }
  }
  return out;
}

// ─────────────────────── Constants ──────────────────────────────────────────

const MAX_BOOK_CONTEXT_CHARS = 12000;
const TOP_K = 3;
const CHAPTER_HINT_BOOST = 0.03;

const NDJSON_HEADERS = {
  "Content-Type":      "application/x-ndjson; charset=utf-8",
  "Cache-Control":     "no-store",
  "X-Accel-Buffering": "no",
};

const EMBED_MODEL = "nvidia/llama-nemotron-embed-vl-1b-v2:free";

// ─────────────────────── Chunks loader (cached) ─────────────────────────────

let _chunksCache = null;

function loadChunks() {
  if (_chunksCache) return _chunksCache;
  const path = join(process.cwd(), "public", "chunks.json");
  const raw = readFileSync(path, "utf-8");
  _chunksCache = JSON.parse(raw);
  return _chunksCache;
}

// ─────────────────────── Embedding ──────────────────────────────────────────

async function getEmbedding(text, apiKey) {
  const resp = await fetch("https://openrouter.ai/api/v1/embeddings", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: EMBED_MODEL,
      input: [text],
      encoding_format: "float",
    }),
  });
  if (!resp.ok) {
    const body = await resp.text();
    throw new Error(`Embedding-kall feilet (${resp.status}): ${body}`);
  }
  const data = await resp.json();
  return data.data[0].embedding;
}

// ─────────────────────── Cosine similarity ──────────────────────────────────

function cosineSim(a, b) {
  let dot = 0, na = 0, nb = 0;
  const n = Math.min(a.length, b.length);
  for (let i = 0; i < n; i++) {
    dot += a[i] * b[i];
    na  += a[i] * a[i];
    nb  += b[i] * b[i];
  }
  const denom = Math.sqrt(na) * Math.sqrt(nb);
  return denom ? dot / denom : 0;
}

function topKChunks(queryVec, chunks, chapterHint, k) {
  const hint = (chapterHint || "").toLowerCase();
  const scored = chunks.map((c) => {
    let score = cosineSim(queryVec, c.embedding || []);
    if (hint && (c.chapter || "").toLowerCase().includes(hint)) {
      score += CHAPTER_HINT_BOOST;
    }
    return { score, chunk: c };
  });
  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, k).map((x) => x.chunk);
}

// ─────────────────────── System prompt (NO only) ────────────────────────────

const INTRO =
  "Du er en hjelpsom studieassistent for TDT4145 – Databaser og databasesystemer (NTNU). " +
  "Pensum er Silberschatz, Korth & Sudarshan: «Database System Concepts» (Del 1) samt " +
  "Bratsbergs egne notater for Del 2 (lagring, queries, transaksjoner). Utdrag fra begge " +
  "finnes under.";

const SHARED_RULES = `
Språk: Svar alltid på norsk (bokmål). Ikke bytt til engelsk med mindre brukeren uttrykkelig skriver på engelsk.
Tone: hjelpsom studieassistent — tydelig og konkret, ikke et generisk sammendrag av hele pensum.
Hvis brukeren spør hva de ser på siden nå, eller hva teksten handler om, bygg svaret først og fremst på «Synlig tekst fra nettsiden» under, deretter utdragene fra boka.
Hvis du ikke finner svaret i konteksten under, si fra i stedet for å finne på noe.
Ikke avslutt med ordtelling eller etiketter som «(99 ord)» eller «Antall ord:». Ikke «tenker høyt»-innledning — svar rett på spørsmålet.
Matematikk: chatten rendrer KaTeX bare inne i avgrensere. Bruk inline som \\(...\\) eller $...$, og uttrykk som skal stå for seg selv som \\[...\\] eller $$...$$. Rå LaTeX som \\text{...} eller \\frac{}{} utenfor slike omgivelser vises som vanlig tekst, ikke som formler.
Hold inline-matte på samme linje som ord og tegnsetting rundt (unngå linjeskift mellom formel og komma eller «og») slik at setningene flyter naturlig.
Viktig: bare firkantklammer [ og ] er ikke ekte matte-omgivelser. Chatten prøver å rette noen vanlige feilformater (f.eks. «[» alene på en linje før LaTeX, eller «[» etterfulgt av en LaTeX-kommando på samme linje, avsluttet med «]» alene på en linje), men det er best effort — bruk alltid \\[ ... \\] eller $$ ... $$ slik at formler rendres stabilt.
Ikke legg matematikk inne i markdown code fence (triple backticks): da vises det som monospace «kode», ikke som rendret matte. Skriv formler i vanlig avsnitt med avgenser over. Reserver \`\`\`-blokker til faktiske program-/konfigurasjonsutdrag.
Ikke legg vanlig forklaringstekst i fenced blocks — bare ekte kode eller konfigurasjon. Ikke linjeskift inne i **fet**-markering eller inne i én inline $...$-formel (hold hele $-paret på samme linje som setningen rundt).
`.trim();

const VISIBLE_HEADING = "## Synlig tekst fra nettsiden brukeren leser akkurat nå:";
const BOOK_HEADING = "## Kontekst fra pensum (læreboken og Bratsbergs notater):";
const TRUNCATION_NOTE = "\n\n[Utdrag avkortet for å passe i konteksten.]";

function buildSystemPrompt({ pageContext, bookContext }) {
  const ctx = pageContext || {};
  const visibleText = (ctx.visible_text || "").trim() || "(ingen)";
  let locationInfo = "";
  if (ctx.chapter) {
    locationInfo = `\nBrukeren leser: ${ctx.chapter}`;
    if (ctx.section && ctx.section.title) {
      locationInfo += ` — seksjon: «${ctx.section.title}»`;
    }
  }

  return [
    INTRO,
    SHARED_RULES,
    locationInfo,
    "",
    VISIBLE_HEADING,
    visibleText,
    "",
    BOOK_HEADING,
    bookContext || "(ingen tilgjengelig)",
  ].join("\n");
}

// ─────────────────────── SSE → NDJSON converter ─────────────────────────────

function openRouterSseToNdjsonStream(upstreamBody) {
  const enc = new TextEncoder();
  const dec = new TextDecoder();

  return new ReadableStream({
    async start(controller) {
      const reader = upstreamBody.getReader();
      let buf = "";
      const write = (obj) => controller.enqueue(enc.encode(JSON.stringify(obj) + "\n"));
      const processBlock = (block) => {
        for (const line of block.split("\n")) {
          if (!line.startsWith("data:")) continue;
          const raw = line.slice(5).trimStart();
          if (raw === "[DONE]") continue;
          let json;
          try {
            json = JSON.parse(raw);
          } catch {
            continue;
          }
          if (json.error) {
            const msg =
              (json.error && (json.error.message || JSON.stringify(json.error))) ||
              "ukjent feil fra modell";
            write({ e: msg });
            controller.close();
            return false;
          }
          const piece = json.choices?.[0]?.delta?.content;
          if (typeof piece === "string" && piece.length) {
            write({ t: piece });
          }
        }
        return true;
      };

      try {
        while (true) {
          const { done, value } = await reader.read();
          buf += dec.decode(value ?? new Uint8Array(), { stream: !done });
          if (done) {
            buf += dec.decode();
            buf = buf.replace(/\r\n/g, "\n");
            // Final flush — process any remaining whole blocks + trailing partial
            while (true) {
              const sep = buf.indexOf("\n\n");
              if (sep === -1) break;
              const block = buf.slice(0, sep);
              buf = buf.slice(sep + 2);
              if (!processBlock(block)) return;
            }
            if (buf.trim()) {
              if (!processBlock(buf)) return;
            }
            break;
          }
          buf = buf.replace(/\r\n/g, "\n");
          while (true) {
            const sep = buf.indexOf("\n\n");
            if (sep === -1) break;
            const block = buf.slice(0, sep);
            buf = buf.slice(sep + 2);
            if (!processBlock(block)) return;
          }
        }
        write({ d: true });
        controller.close();
      } catch (err) {
        try {
          write({ e: err.message || String(err) });
        } catch {}
        controller.close();
      }
    },
  });
}

// ─────────────────────── POST handler ───────────────────────────────────────

export async function POST(request) {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: "OPENROUTER_API_KEY er ikke satt i miljøet." },
      { status: 500 }
    );
  }

  let body;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Ugyldig JSON i request body." }, { status: 400 });
  }

  const question = (body && body.question) || "";
  if (typeof question !== "string" || !question.trim()) {
    return Response.json({ error: "Spørsmål mangler." }, { status: 400 });
  }

  // Normalize preset
  let preset = body.preset;
  if (preset === null || preset === undefined || preset === "") {
    preset = DEFAULT_PRESET;
  }
  if (!Object.prototype.hasOwnProperty.call(PRESET_MODEL_DEFAULTS, preset)) {
    return Response.json({ error: `Ukjent preset: ${preset}` }, { status: 400 });
  }

  const pageContext = body.page_context || null;
  const history = Array.isArray(body.history) ? body.history : [];

  // Build search query (with chapter hint when available)
  const chapterHint = pageContext?.chapter || "";
  const sectionTitle = pageContext?.section?.title || "";
  let searchQuery = question.trim();
  if (sectionTitle) {
    searchQuery = `[${chapterHint} – ${sectionTitle}] ${searchQuery}`;
  } else if (chapterHint) {
    searchQuery = `[${chapterHint}] ${searchQuery}`;
  }

  // Parallel: embed query + load chunks
  let bookContext = "";
  try {
    const embedPromise = getEmbedding(searchQuery, apiKey);
    let chunks = [];
    try {
      chunks = loadChunks();
    } catch (err) {
      console.warn("[chat] kunne ikke laste public/chunks.json:", err.message);
    }
    const queryVec = await embedPromise;

    if (chunks.length > 0) {
      const top = topKChunks(queryVec, chunks, chapterHint, TOP_K);
      bookContext = top.map((c) => c.text).join("\n\n---\n\n");
      if (bookContext.length > MAX_BOOK_CONTEXT_CHARS) {
        bookContext = bookContext.slice(0, MAX_BOOK_CONTEXT_CHARS) + TRUNCATION_NOTE;
      }
    }
  } catch (err) {
    // Embedding failed — proceed without book context. The chat can still
    // answer based on visible page text.
    console.warn("[chat] retrieval feilet:", err.message);
  }

  // Compose messages
  const systemPrompt = buildSystemPrompt({ pageContext, bookContext });
  const messages = [
    { role: "system", content: systemPrompt },
    ...history.slice(-10),
    { role: "user", content: question },
  ];

  // Try preset's primary model, then fallbacks
  const candidates = getModelCandidatesForPreset(preset);
  let lastErr = null;

  for (let i = 0; i < candidates.length; i++) {
    const model = candidates[i];
    if (i > 0) {
      // Small backoff before retry
      await new Promise((r) => setTimeout(r, 400));
    }

    let resp;
    try {
      resp = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model,
          messages,
          stream: true,
        }),
      });
    } catch (err) {
      lastErr = err;
      console.warn(`[chat] nettverksfeil mot ${model}:`, err.message);
      continue;
    }

    if (resp.ok && resp.body) {
      const ndjson = openRouterSseToNdjsonStream(resp.body);
      return new Response(ndjson, { status: 200, headers: NDJSON_HEADERS });
    }

    // Read body for diagnostics
    let errBody = "";
    try {
      errBody = await resp.text();
    } catch {}

    if (resp.status === 429 || resp.status === 503) {
      console.warn(`[chat] ${model} ratelimit/unavailable (${resp.status}) — prøver neste`);
      lastErr = new Error(`HTTP ${resp.status}: ${errBody || resp.statusText}`);
      continue;
    }

    // Other non-OK — bail
    const status = resp.status >= 500 ? 502 : resp.status;
    return Response.json(
      { error: `Modell-API feilet (${resp.status}): ${errBody || resp.statusText}` },
      { status }
    );
  }

  // All candidates exhausted
  return Response.json(
    {
      error:
        "Alle modell-kandidater feilet (rate limit eller utilgjengelig). Prøv igjen om litt. " +
        (lastErr ? `Siste feil: ${lastErr.message}` : ""),
    },
    { status: 502 }
  );
}

// Optional GET for debugging
export async function GET() {
  let chunkCount = null;
  try {
    chunkCount = loadChunks().length;
  } catch (err) {
    return Response.json(
      { status: "error", message: `kunne ikke lese chunks.json: ${err.message}` },
      { status: 500 }
    );
  }
  return Response.json({
    status: "ok",
    chunks: chunkCount,
    embed_model: EMBED_MODEL,
    presets: Object.keys(PRESET_MODEL_DEFAULTS),
  });
}
