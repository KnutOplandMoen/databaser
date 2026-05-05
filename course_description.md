# TDT4145 — Databaser og databasesystemer

NTNU · 7,5 studiepoeng · Vårsemester · 2. årskurs

## Mål

Gi grunnleggende forståelse av relasjonelle databaser, databasedesign, og hvordan
moderne databasesystemer faktisk er bygget — fra SQL-overflate til diskblokker.

## Hovedtemaer

1. Relasjonsmodellen og relasjonsalgebra
2. SQL: DDL, spørringer, joins, views, transaksjons-syntaks, prosedyrer/triggere
3. Databasedesign: ER-modell, funksjonelle avhengigheter, normalformer (BCNF)
4. Lagring: record/block-format, buffer-pool, heapfiler, hashing
5. Indeksering: B+-trær, clustered vs unclustered
6. Spørringsutføring: aksessmetoder, sortering, join-algoritmer, kostnadsestimering
7. Transaksjoner: ACID, schedules, serializability
8. Samtidighet: 2PL, deadlock, MVCC, isolation levels
9. Recovery: WAL, undo/redo, ARIES, sjekkpunkter

## Vekting

- **Del 1 (Theodoros) ~ 40 %** — pkt 1–3. Lik stil som midtveiseksamen.
- **Del 2 (Svein Erik) ~ 60 %** — pkt 4–9. Lik stil som tidligere års eksamen.

## Pensum

- *Database System Concepts* — Silberschatz, Korth & Sudarshan (lærebok, Del 1)
- Bratsbergs egne notater (Del 2 — lagring, queries, transaksjoner)
- Slides: lagring.pdf, queries.pdf, transaksjoner.pdf
