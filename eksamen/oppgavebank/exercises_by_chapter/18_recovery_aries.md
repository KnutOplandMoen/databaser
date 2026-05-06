# Chapter 18 — Recovery / ARIES

**About:** WAL + force-log-at-commit; transaction table + Dirty Page Table; PageLSN per block; three-phase recovery (Analysis from last checkpoint forward; Redo from oldest recLSN; Undo from end backwards through losers, writing CLRs).

**Exercise types seen on exams:**
- **Analysis:** given a log (LSN, prevLSN, op, page) and the checkpoint TT/DPT, produce the post-Analysis TT and DPT.
- **Redo:** given DPT and per-page PageLSN at start of redo, decide which log records get redone and why; or determine the LSN at which redo scan begins.
- **Undo:** list the CLRs and abort records written during undo for the loser transactions; resulting PageLSN for the affected pages.
- **"Which pages can we be sure were flushed before the crash?"** — reasoning from absence in DPT or `recLSN > LSN`.
- **Conceptual / true-false:** WAL rule, force vs. no-force, steal vs. no-steal, what's in a checkpoint, why redo starts at oldest recLSN, why undo writes CLRs, why durability needs force-log-at-commit.
- **"Why do we need recovery?"** open-ended.

**Total exercises:** 27 — sourced from D2018, D2018_K, D2019, D2019_K, D2020, D2021, D2022, D2023, D2023_K, D2024, D2024_K, D2025.

---

*Shared setup for D2018 Problem 9:*

Anta følgende logg blir funnet etter en krasj:

| LSN | PrevLSN | TransactionID | Operation | PageID |
| --- | --- | --- | --- | --- |
| 237 |  |  | End_ckpt |  |
| 238 | NULL | T1 | Update | A |
| 239 | NULL | T2 | Update | B |
| 240 | 239 | T2 | Commit |  |
| 241 | 238 | T1 | Update | A |
| 242 | NULL | T3 | Update | B |

Anta at Dirty Page Table (DPT) og transaksjonstabellen (TT) i sjekkpunktloggposten med LSN 237 (End_ckpt) er tomme.

## D2018 Problem 9a (5 %)

Hvordan ser DPT og TT ut etter at analysen i Recovery er ferdig? DPT har feltene PageId og RecoveryLSN. TT har feltene TransactionID, LastLSN og TransactionStatus.

**Maks poeng:** 5

---

## D2018 Problem 9b (5 %)

Hva skjer under undofasen av recovery? Hvilke transaksjoner rulles tilbake og hvilke nye loggposter lages?

**Maks poeng:** 5

---

## D2018_K Problem 9a: Transaksjoner: Recovery - ARIES (5 %)

Hvilken informasjon finnes i sjekkpunktloggposter i ARIES og hva brukes informasjonen til?

**Skriv ditt svar her**

**Maks poeng:** 5

---

## D2018_K Problem 9b: Transaksjoner: Recovery - ARIES (5 %)

I hvilke situasjoner må datablokker (pages) skrives i ARIES?

**Skriv ditt svar her**

**Maks poeng:** 5

---

*Shared setup for D2019 Problems 21–22:*

Anta ARIES-recovery.

Etter en krasj fant vi følgende loggposter:

| LSN | PrevLSN | TransId | Type             | PageId |
| --- | ------- | ------- | ---------------- | ------ |
| 10  | 0       | T1      | update           | A      |
| 11  | 0       | T2      | update           | B      |
| 12  | 10      | T1      | commit           |        |
| 13  |         |         | begin_checkpoint |        |
| 14  |         |         | end_checkpoint   |        |
| 15  | 0       | T3      | update           | B      |
| 16  | 11      | T2      | update           | C      |
| 17  | 16      | T2      | commit           |        |

Følgende transaksjonstabell ble funnet i loggpost med LSN 14:

| TransId | LastLSN | Status |
| ------- | ------- | ------ |
| T1      | 12      | commit |
| T2      | 11      | active |

Følgende Dirty Page Table (DPT) ble funnet i loggpost med LSN 14:

| PageId | RecLSN |
| ------ | ------ |
| A      | 10     |
| B      | 11     |

## D2019 Problem 21: ARIES analyse (5 %)

Vis hvordan DPT og transaksjonstabellen ser ut etter at analysen er ferdig.

**Maks poeng:** 5

---

## D2019 Problem 22: ARIES redo (5 %)

For hver update-loggpost i loggen forklar om det blir gjort redo eller ikke. Forklar også hvorfor / hvorfor ikke det blir gjort redo når de forskjellige blokkene (PageId) har følgende PageLSN:

| PageId | PageLSN |
| ------ | ------- |
| A      | 7       |
| B      | 15      |
| C      | 8       |

**Maks poeng:** 5

---

## D2019_K Problem 14 (5 %)

Hvorfor trenger vi recovery i databasesystemer?

Skriv ditt svar her...

**Maks poeng:** 5

---

## D2019_K Problem 17 (5 %)

Forklar hvorfor det ved recovery i ARIES er slik at REDO-recovery må starte ved eldste RecoveryLSN i Dirty Page Table som ble funnet i siste sjekkpunkt i loggen.

Skriv ditt svar her...

**Maks poeng:** 5

---

*Shared setup for D2020 Problems 16–17:*

Vi har følgende logg som er funnet under recovery etter et krasj (vi bruker ARIES):

```text
(104, T3, 103, Commit)
(105, StartCkpt)
(106, EndCkpt)
(107, T4, NIL, Update, Page A, befImage, aftImage)
(108, T4, 107, Update, Page B, befImage, aftImage)
(109, T5, NIL, Update, Page C, befImage, aftImage)
(110, T5, 109, Update, Page A, befImage, aftImage)
(111, T4, 108, Commit)
```

Anta at DPT og Transaksjonstabellen er tomme i sjekkpunktloggposten med LSN 106 (EndCkpt).

Loggpostene for update har formatet (LSN, Transaction, PrevLSN, Operation, Page, befImage, aftImage). Hvis det er den første loggede operasjonen for en transaksjon, vil PrevLSN være NIL. For Commit og Abort er formatet (LSN, Transaction, PrevLSN, Operation).

## D2020 Problem 16 (5 %)

Skriv opp innholdet av Dirty Page Table (DPT) og Transaksjonstabellen etter at analysen har kjørt seg ferdig. Du skal ikke tegne disse, bare skriv de som tekst.

**Maks poeng:** 5

---

## D2020 Problem 17 (5 %)

Anta ARIES-recovery er gjort for loggen i oppgave 16.

Skriv opp PageLSN for datablokkene A, B, C etter redo-recovery.

Skriv også opp PageLSN for datablokkene A, B, C etter undo-recovery.

Husk å begrunne og å svare på begge spørsmål.

**Maks poeng:** 5

---

## D2021 Problem 7: Recovery (ARIES) (6 %)

Følgjande logg blei funne etter eit krasj med ARIES-type logging og recovery:

| LSN | PrevLSN | TransId | Type       | PageId |
| --- | ------- | ------- | ---------- | ------ |
| 101 |         |         | begin_ckpt |        |
| 102 | null    | T2      | Update     | B      |
| 103 |         |         | end_ckpt   |        |
| 104 | 99      | T1      | Update     | B      |
| 105 | 104     | T1      | Commit     |        |
| 106 | 102     | T2      | Update     | C      |
| 107 | null    | T3      | Update     | A      |
| 108 | 107     | T3      | Update     | C      |
| 109 | 106     | T2      | Commit     |        |

Føresett end_ckpt med LSN 103 har ein Dirty Page Table (DPT) som inneheld (B, 102). Kva for element høyrer med i DPT når analysen er fullført?

**Vel eitt eller fleire alternativ:**

- [ ] (Commit ,109)
- [ ] (B, 104)
- [ ] (C, 108)
- [ ] (C, 106)
- [ ] (A, 107)
- [ ] (B, 102)
- [ ] (Commit, 105)

**Maks poeng:** 6

---

## D2021 Problem 13: Miscellaneous (6 %)

Kva for utsegn er sanne?

**Vel eitt eller fleire alternativ:**

- [ ] Write-Ahead Logging sørger for at data må skrivast før loggen skrivast.
- [ ] Force / No-Steal gjør at ein ikkje treng logging
- [ ] READ COMMITTED gjør at alle samtstundesproblem blir borte.
- [ ] SERIALIZABLE gjør at transaksjonar ikkje merker noe til såkalte "fantomar".
- [ ] SQL dictionary / Catalog brukast for å sjekke reserverte ord i SQL queries.
- [ ] Optimalisatoren velgjer mellom forskjellige utføringsplanar for eit query basert på ein kostnadsmodell.

**Maks poeng:** 6

---

## D2021 Problem 14: Miscellaneous (3 %)

Følgjande logg blei funne etter eit krasj med ARIES-type logging og recovery:

| LSN | PrevLSN | TransId | Type       | PageId |
| --- | ------- | ------- | ---------- | ------ |
| 99  | null    | T1      | Update     | A      |
| 100 | 99      | T1      | Update     | B      |
| 101 | 100     | T1      | Update     | C      |
| 102 | null    | T2      | Update     | B      |
| 103 |         |         | begin_ckpt |        |
| 104 |         |         | end_ckpt   |        |
| 105 | 101     | T1      | Commit     |        |
| 106 | 102     | T2      | Update     | B      |
| 107 | null    | T3      | Update     | A      |
| 108 | 107     | T3      | Update     | D      |
| 109 | 106     | T2      | Commit     |        |

Føresett end_ckpt med LSN 104 har ein Dirty Page Table (DPT) som inneheld (B, 102), (A, 99) og (C,101). Ved kva for loggpost (LSN) må REDO-scannet starte?

**Vel eitt alternativ:**

- [ ] 100
- [ ] 108
- [ ] 109
- [ ] 105
- [ ] 106
- [ ] 99
- [ ] 107
- [ ] 101

**Maks poeng:** 3

---

## D2022 Problem 3: Misc (6 %)

Hva er riktig for ARIES?

**Velg ett eller flere alternativer**

- [ ] write-ahead logging
- [ ] force, no-steal
- [ ] force, steal
- [ ] no-force, no-steal
- [ ] no-force, steal
- [ ] no logging

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2022 Problem 5: Misc (6 %)

Hvilke alternativ er sanne?

**Velg ett eller flere alternativer**

- [ ] DPT forteller hvor UNDO kan starte
- [ ] REDO starter ved eldste "levende" loggpost, dvs. eldste loggpost blant tapere.
- [ ] Transaksjonstabellen forteller hvem som er vinnere og tapere av transaksjonene etter analysen
- [ ] DPT forteller hvor REDO kan starte
- [ ] UNDO slutter ved eldste "levende" loggpost, dvs. eldste loggpost blant tapere.
- [ ] PageLSN blir alltid oppdatert for alle loggposter ved REDO

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2022 Problem 10: ARIES (4 %)

| LSN | PrevLSN | TransID | Type     | PageID |
| --- | ------- | ------- | -------- | ------ |
| 101 |         |         | End_ckpt |        |
| 102 | Null    | T1      | Update   | A      |
| 103 | Null    | T2      | Update   | B      |
| 104 | 102     | T1      | Commit   |        |
| 105 | 103     | T2      | Update   | B      |
| 106 | 105     | T2      | Update   | C      |
| 107 | Null    | T3      | Update   | C      |
| 108 | 106     | T2      | Update   | A      |

Anta loggen over etter et krasj med ARIES. Etter analysen har DPT følgende innhold: (A, 98), (B, 103), (C, 106) og datablokkene har følgende PageLSN (A, 98), (B, 97), (C, 107). Hvilke loggposter blir det gjort REDO for?

**Velg ett eller flere alternativer**

- [ ] LSN=108
- [ ] LSN=105
- [ ] LSN=102
- [ ] LSN=107
- [ ] LSN=106
- [ ] LSN=103

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 4

---

*Shared setup for D2023 Problems 17–18:*

Vi har en logg som ser ut som følger etter en krasj.

| LSN | PrevLSN | TransactionID | Operation  | PageID |
|-----|---------|---------------|------------|--------|
| 101 | 0       | T1            | Update     | A      |
| 102 | 101     | T1            | Update     | B      |
| 103 |         |               | Ckpt_start |        |
| 104 |         |               | Ckpt_end   |        |
| 105 | 0       | T2            | Update     | A      |
| 106 | 105     | T2            | Commit     |        |
| 107 | 102     | T1            | Update     | B      |
| 108 | 0       | T3            | Update     | C      |

## D2023 Problem 17: Recovery REDO (7 %)

Og en DPT som ser ut som følger i loggpost 104 (Ckpt_end):

```
(Page B, RecLSN=102)
```

Blokkene har følgende verdier for PageLSN:

- A har PageLSN = 101
- B har PageLSN = 102
- C har PageLSN = 98

Hvilke loggposter blir det gjort REDO på (LSN er oppgitt i alternativene)?

**Velg ett alternativ:**

- [ ] 108
- [ ] 105, 107, 108
- [ ] 107, 108
- [ ] 101, 102, 105, 107, 108
- [ ] 102, 105, 107, 108
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 7

---

## D2023 Problem 18: Recovery UNDO (6 %)

Vi har en logg som ser ut som følger etter en krasj. Hvilke loggposter vil genereres under undo?

| LSN | PrevLSN | TransactionID | Operation  | PageID |
|-----|---------|---------------|------------|--------|
| 101 | 0       | T1            | Update     | A      |
| 102 | 101     | T1            | Update     | B      |
| 103 |         |               | Ckpt_start |        |
| 104 |         |               | Ckpt_end   |        |
| 105 | 0       | T2            | Update     | A      |
| 106 | 105     | T2            | Commit     |        |
| 107 | 102     | T1            | Update     | B      |
| 108 | 0       | T3            | Update     | C      |

Formatet på loggpostene under er `(LSN, PrevLSN, TransactionID, Operation, PageID)`.

**Velg ett alternativ:**

- [ ] (109, 108, T3, CLR, C), (110, 109, T3, Abort, ), (111, 107, T1, CLR, B), (112, 111, T1, CLR, B), (113, 112, T1, CLR, A), (114, 113, T1, Abort, )
- [ ] Ingen loggposter genereres
- [ ] (109, 106, T2, CLR, A), (110, 109, T2, Abort, )
- [ ] (109, 108, T3, CLR, C), (110, 109, T3, Abort, )
- [ ] (109, 107, T1, CLR, A), (110, 109, T1, CLR, B), (111, 110, CLR, A), (112, 111, T1, Abort, )
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 6

---

## D2023_K Problem 11: ARIES (10 %)

Anta at vi bruker ARIES-recovery og la A, B, og C være dataelementer. Etter en krasj ble følgende logg funnet med en loggpost i hver rad av tabellen:

| LSN | Last_lsn | Transaction | OpType     | Page_id | Other_info |
| --- | -------- | ----------- | ---------- | ------- | ---------- |
| 101 | 0        | T1          | Update     | A       | …          |
| 102 | 0        | T2          | Update     | B       | …          |
| 103 | 101      | T1          | Commit     |         | …          |
| 104 |          |             | Begin_ckpt |         |            |
| 105 |          |             | End_ckpt   |         |            |
| 106 | 0        | T3          | Update     | A       | …          |
| 107 | 102      | T2          | Update     | C       | …          |
| 108 | 107      | T2          | Commit     |         | …          |

Anta T1, T2 og T3 er alle transaksjonene som finnes og at transaksjonstabellen som finnes i loggpost 105 ser slik ut:

| Transaction | Last_lsn | Status      |
| ----------- | -------- | ----------- |
| T1          | 103      | Commit      |
| T2          | 102      | In progress |

Dirty Page Table som finnes i loggpost 105 ser slik ut:

| Page_id | Rec_lsn |
| ------- | ------- |
| A       | 101     |
| B       | 102     |

Hvordan ser transaksjonstabellen og Dirty Page Table ut etter analysefasen av recovery?

**Skriv ditt svar her**

**Maks poeng:** 10

---

## D2023_K Problem 12: ARIES (10 %)

Anta at vi bruker ARIES-recovery og la A og C være dataelementer. Etter en krasj ble følgende logg funnet med en loggpost i hver rad av tabellen:

| LSN | Last_lsn | Transaction | OpType     | Page_id | Other_info |
| --- | -------- | ----------- | ---------- | ------- | ---------- |
| 103 | 101      | T1          | Commit     |         | …          |
| 104 |          |             | Begin_ckpt |         |            |
| 105 |          |             | End_ckpt   |         |            |
| 106 | 0        | T3          | Update     | A       | …          |
| 107 | 0        | T2          | Update     | C       | …          |
| 108 | 107      | T2          | Commit     |         | …          |

Loggposten 105 inneholder en tom DPT.

Under redofasen trenger datablokk A redo av loggpost 106, mens datablokk C trenger ikke redo. Hvilke verdier for PageLSNene kan datablokk A og C ha i det redofasen starter?

**Skriv ditt svar her**

**Maks poeng:** 10

---

*Shared setup for D2024 Problems 5–7:*

| LSN | PrevLSN | TransactionID | Operation  | PageID |
| --- | ------- | ------------- | ---------- | ------ |
| 101 | 99      | T1            | Update     | A      |
| 102 | 0       | T2            | Update     | B      |
| 103 | 101     | T1            | Update     | B      |
| 104 | 102     | T2            | Update     | C      |
| 105 | 103     | T1            | Update     | D      |
| 106 |         |               | Ckpt start |        |
| 107 |         |               | Ckpt end   |        |
| 108 | 105     | T1            | Commit     |        |
| 109 | 104     | T2            | Update     | E      |
| 110 | 0       | T3            | Update     | F      |
| 111 | 109     | T2            | Commit     |        |

## D2024 Problem 5: ARIES Recovery ( 4 %)

Følgende logg ble funnet etter et krasj. Vi bruker ARIES recovery. I sjekkpunktloggposten med LSN=107 ble følgende transaksjonstabell funnet **(T1, LastLSN=105, state=Active)**, **(T2, LastLSN=104, state=Active)** og følgende DPT (Dirty Page Table) ble funnet: **(PageId=B, recLSN=102)**, **(PageId=C, recLSN=104)**. Hvilke elementer er med i DPT etter at analysen er ferdig?

**Velg ett eller flere alternativer**

- [ ] (C, recLSN=104)
- [ ] (B, recLSN=103)
- [ ] (E, recLSN=109)
- [ ] (B, recLSN=102)
- [ ] (F, recLSN=110)
- [ ] (A, recLSN=101)
- [ ] (D, recLSN=105)
- [ ] None of the other alternatives are correct.

**Maks poeng:** 4

---

## D2024 Problem 6: ARIES Recovery (4 %)

Følgende logg ble funnet etter et krasj. Vi bruker ARIES recovery. I sjekkpunktloggposten med LSN=107 ble følgende transaksjonstabell funnet **(T1, LastLSN=105, state=Active)**, **(T2, LastLSN=104, state=Active)** og følgende DPT (Dirty Page Table) ble funnet: **(PageId=B, recLSN=102)**, **(PageId=C, recLSN=104)**. Hvilke loggposter genereres under undo-fasen av recovery? CLR betyr Compensating Log Record.

**Velg ett eller flere alternativer**

- [ ] (112, PrevLSN=105, T1, CLR of 105, PageID=D)
- [ ] (113, PrevLSN=112, T2, Abort)
- [ ] (113, PrevLSN=112, T3, Abort)
- [ ] None of the other alternatives are correct
- [ ] (112, PrevLSN=109, T2, CLR of 109, PageID=E)
- [ ] (112, PrevLSN=110, T3, CLR of 110, PageID=F)

**Maks poeng:** 4

---

## D2024 Problem 7: ARIES Recovery (6 %)

Følgende logg ble funnet etter en krasj. Vi bruker ARIES recovery. I sjekkpunktloggposten med LSN=107 ble følgende transaksjonstabell funnet **(T1, LastLSN=105, state=Active)**, **(T2, LastLSN=104, state=Active)** og følgende DPT (Dirty Page Table) ble funnet: **(PageId=B, recLSN=102)**, **(PageId=C, recLSN=104)**. Hvilke datablokker (pages) kan vi med sikkerhet si ble skrevet ut til disken før krasjet i dette tilfellet?

**Velg ett eller flere alternativer**

- [ ] E
- [ ] F
- [ ] None of the other alternatives are correct
- [ ] B
- [ ] C
- [ ] A
- [ ] D

**Maks poeng:** 6

---

*Shared setup for D2025 Problems 7–8:*

| LSN | PrevLSN | TransactionID | Operation  | PageID |
| --- | ------- | ------------- | ---------- | ------ |
| 101 | 99      | T1            | Update     | A      |
| 102 | 0       | T2            | Update     | A      |
| 103 | 101     | T1            | Update     | B      |
| 104 | 102     | T2            | Update     | B      |
| 105 | 103     | T1            | Update     | C      |
| 106 |         |               | Ckpt start |        |
| 107 |         |               | Ckpt end   |        |
| 108 | 105     | T1            | Commit     |        |
| 109 | 104     | T2            | Update     | D      |
| 110 | 0       | T3            | Update     | E      |
| 111 | 109     | T2            | Commit     |        |

## D2025 Problem 7: ARIES (8 %)

Følgende logg ble funnet etter et krasj. Vi bruker ARIES recovery. I sjekkpunktloggposten med LSN=107 ble følgende transaksjonstabell funnet **(T1, LastLSN=105, state=Active)**, **(T2, LastLSN=104, state=Active)** og følgende DPT (Dirty Page Table) ble funnet: **(PageId=A, recLSN=102)**, **(PageId=B, recLSN=103)**. Hvilke elementer er med i DPT etter at analysen er ferdig?

**Velg ett eller flere alternativer:**

- [ ] (A, recLSN=102)
- [ ] (B, recLSN=104)
- [ ] (B, recLSN=103)
- [ ] (C, recLSN=105)
- [ ] (E, recLSN=110)
- [ ] (A, recLSN=101)
- [ ] (D, recLSN=109)
- [ ] (Commit, recLSN=111)
- [ ] Ingen av de andre alternativene er korrekte

**Maks poeng:** 8

---

## D2025 Problem 8: ARIES (8 %)

Følgende logg ble funnet etter et krasj. Vi bruker ARIES recovery. I sjekkpunktloggposten med LSN=107 ble følgende transaksjonstabell funnet **(T1, LastLSN=105, state=Active)**, **(T2, LastLSN=104, state=Active)** og følgende DPT (Dirty Page Table) ble funnet: **(PageId=A, recLSN=102)**, **(PageID=C, recLSN=105)**. I tillegg vet vi at ved kjøring av loggpost med LSN=105, ble plassen til PageID=B "stjålet" fra bufferet. Ut i fra dette og loggen over, hvilke datablokker (Pages) kan vi med sikkerhet si ble skrevet ut før krasjen?

**Velg ett eller flere alternativer:**

- [ ] A
- [ ] Ingen av de andre alternativene er riktige
- [ ] D
- [ ] E
- [ ] B
- [ ] C

**Maks poeng:** 8

---

## D2024_K Problem 7: ARIES (5 %)

Anta ARIES-recovery og la B, C og D være dataelementer og T1, T2 og T3 være transaksjoner. Loggpostene i loggen under har loggposter på formatet:
[LSN,Operation,Transaction,DataItem]

```text
[101,end_ckpt]
[102,update,T3,B]
[103,update,T3,C]
[104,update,T2,B]
[105,update,T1,D]
[106, commit, T3]
[107,update,T2,D]
[108, commit, T1]
```

Anta A, B, C, D er datasider det skal gjøres recovery på. DPT som finnes i loggposten med LSN=101 er tom.
Blokkene (dataelementene) har følgende PageLSN på disken:
(B,pageLSN=104),
(C,pageLSN=103),
(D,pageLSN=105)
For hver update-loggpost i denne loggen forklar hvorfor (eller hvorfor ikke) det blir gjort redo under recovery.

**Skriv ditt svar her**

**Maks poeng:** 5

---

## D2024_K Problem 8: ARIES (5 %)

Forklar hvorfor redo må gjøres før undo når det er krasjrecovery i ARIES. Bruk gjerne eksempelet i forrige oppgave til å forklare.

**Skriv ditt svar her**

**Maks poeng:** 5
