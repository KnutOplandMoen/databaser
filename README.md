# Databaser (TDT4145) — studieside

Statisk studieside for TDT4145 *Databaser og databasesystemer* ved NTNU. Norsk only.

## Struktur

- `index.html` — forside med søk og kapittelraster
- `pensum.html` — oversikt over forelesninger og pensum-mapping
- `kap1/ … kap8/` — 8 kapitler (overview + sub-pages + 25-spm quiz per kap)
- `reisen/` — interaktiv "spørringens reise gjennom DBMS-en"
- `powerpoints/` — kopier av Bratsbergs slides (lagring, queries, transaksjoner)
- `style.css` — felles stilark (indigo-palett, parchment-bakgrunn)
- `chat-widget.js` — flytende studieassistent (NDJSON-streaming mot `/api/chat`)
- `nav-search.js` + inline søk i `index.html` — Fuse.js-basert tekstsøk
- `quiz.js` — "Se svar"-knapp på quiz-kort
- `api/chat.js` — Vercel-funksjon (skal skrives senere — se `plan.md`)
- `noe.py` — embedding-pipeline (skal skrives senere)
- `tools/generate_chapter_quizzes.py` — quiz-generator

## Lokal dev

```bash
# Statisk side (uten chat-funksjon):
python -m http.server 8000

# Med chat-funksjon (krever OPENROUTER_API_KEY):
vercel dev
```

## Innhold

Skjelett-fasen er ferdig: alle sider rendrer, søk indekserer tomme bodies rent, quiz-kort viser/skjuler svar. Innhold (prose, figurer, quiz-fakta) fylles inn i HTML-skjelettene.

## Pensum-kilder (i `.gitignore` der det er aktuelt)

- `Databaser bok.pdf` — Silberschatz, Korth & Sudarshan: *Database System Concepts*
- `database_systems.txt` — tekst-utdrag av læreboken (input til `noe.py`)
- `del_2_egnenotater.txt` — Bratsbergs notater for Del 2
- `presentasjoner/*.pdf` — slides
- `exam_info.txt` — eksamensvekting og forelesnings-til-kapittel-mapping
