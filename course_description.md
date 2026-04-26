# TDT4145 — Databaser og databasesystemer

NTNU · 7,5 studiepoeng · Vårsemester · 2. årskurs

## Mål

Gi grunnleggende forståelse av relasjonelle databaser, databasedesign, og hvordan
moderne databasesystemer faktisk er bygget — fra SQL-overflate til diskblokker.

## Hovedtemaer

1. Relasjonsmodellen og relasjonsalgebra
2. SQL: DDL, spørringer, joins, views, transaksjons-syntaks, prosedyrer/triggere
3. Databasedesign: ER-modell, funksjonelle avhengigheter, normalformer (BCNF)
4. Komplekse typer og NoSQL (kort)
5. Lagring: record/block-format, buffer-pool, heapfiler, hashing
6. Indeksering: B+-trær, clustered vs unclustered
7. Spørringsutføring: aksessmetoder, sortering, join-algoritmer, kostnadsestimering
8. Transaksjoner: ACID, schedules, serializability
9. Samtidighet: 2PL, deadlock, MVCC, isolation levels
10. Recovery: WAL, undo/redo, ARIES, sjekkpunkter

## Vekting

- **Del 1 (Theodoros) ~ 40 %** — pkt 1–4. Lik stil som midtveiseksamen.
- **Del 2 (Svein Erik) ~ 60 %** — pkt 5–10. Lik stil som tidligere års eksamen.

## Pensum

- *Database System Concepts* — Silberschatz, Korth & Sudarshan (lærebok, Del 1)
- Bratsbergs egne notater (Del 2 — lagring, queries, transaksjoner)
- Slides: lagring.pdf, queries.pdf, transaksjoner.pdf
