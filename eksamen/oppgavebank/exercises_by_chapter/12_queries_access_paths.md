# Chapter 12 — Queries and storage structures (access paths)

**About:** Block-cost reasoning for a single SELECT against one of {heap, clustered B+, heap + unclustered B+, clustered hash}, under "optimal access path".

**Exercise types seen on exams:**
- Given a clustered B+-tree on a primary key, count blocks for `WHERE pk = c` (typically just tree height).
- Given heap + unclustered B+-tree on a non-key, count blocks for `WHERE attr = c` — including the RID dereferences.
- Range query (`WHERE attr > c`, `attr BETWEEN`) — when does scanning the heap beat following the unclustered index?
- ORDER BY / GROUP BY — does the index avoid a sort?
- `SELECT *` and `SELECT DISTINCT attr` cost.
- Suggest an additional index to speed up a slow query.
- Pick best storage configuration for a stated mixed workload (clustered vs. unclustered B+).
- True/false claims about clustered-B+-tree access costs.

**Total exercises:** 25 — sourced from D2018, D2018_K, D2019, D2020, D2021, D2022, D2023, D2023_K, D2024, D2024_K, D2025.

---

*Shared setup for D2018 Problem 6:*

Anta følgende tabell er lagret i et Clustered B+-tre med den sammensatte nøkkelen (exno, studno) som søkenøkkel:

```text
Exercise(exno, studno, datedelivered, approval_status)
```

Det er 1000 blokker på løvnivå (nivå=0) i B+-treet og det er tre nivå med blokker i treet.

---

## D2018 Problem 6a (2.5 %)

Hvor mange blokker aksesseres ved utføring av det følgende query. Begrunn svaret ditt.

```sql
SELECT datedelivered, approval_status
FROM Exercise
WHERE exno=2 AND studno=123456;
```

**Maks poeng:** 2.5

---

## D2018 Problem 6b (2.5 %)

Hvor mange blokker aksesseres ved utføring av det følgende query. Begrunn svaret ditt.

```sql
SELECT *
FROM Exercise
WHERE studno=123456 AND approval_status="Disapproved";
```

**Maks poeng:** 2.5

---

## D2018 Problem 6c (2.5 %)

Hvor mange blokker aksesseres ved utføring av det følgende query. Begrunn svaret ditt.

```sql
SELECT exno, studno, approval_status
FROM Exercise
ORDER BY exno ASC, studno ASC;
```

**Maks poeng:** 2.5

---

## D2018 Problem 6d (2.5 %)

Hvor mange blokker aksesseres ved utføring av det følgende query. Begrunn svaret ditt.

```sql
SELECT exno, count(*)
FROM Exercise
WHERE approval_status="Approved"
GROUP BY exno;
```

**Maks poeng:** 2.5

---

*Shared setup for D2018_K Problems 6b and 6c:*

Vi har en database som lagrer bomringpasseringer i en tabell:

```text
Passering(passId, passDateTime, regNo, turnpikeNo, cost)
```

Hver post (record) i tabellen er 120 byte lang og hver blokk er 8 KB (8192 bytes). Vi har registrert 1 000 000 passeringer i databasen.

---

## D2018_K Problem 6b: Lagring, indeksering og queries (3 %)

Vi ønsker å utføre følgende query:

```sql
SELECT passDateTime
FROM Passering
WHERE regNo = 'XY12345';
```

Hvor mange blokker aksesseres for å utføre dette queriet? Begrunn svaret ditt. Anta B+-treet ditt fra forrige oppgave.

**Skriv ditt svar her**

**Maks poeng:** 3

---

## D2018_K Problem 6c: Lagring, indeksering og queries (3 %)

Gitt følgende query:

```sql
SELECT passDateTime
FROM Passering
WHERE regNo = 'XY12345';
```

Hvis du ville at queriet skulle gå raskere, hvilken indeks ville du ha lagd og hvilket attributt ville du ha indeksert? Begrunn svaret ditt.

**Skriv ditt svar her**

**Maks poeng:** 3

---

*Shared setup for D2019 Problems 14–17:*

Vi har en tabell

```sql
Student (pno, studno, lastname, firstname, email)
```

Tabellen er lagret som heapfil. Vi har en statisk hashindeks på pno. I tillegg har vi et unclustered B+-tree på lastname. Hver post i hashindeksen er på formatet (pno, RecordID) og hver post på løvnivå i B+-treet er på formatet (lastname, RecordID, RecordID, ...), dvs. et variabelt antall RecordID per lastname.

Antall studenter i tabellen er 50 000. Heapfilen inneholder 1000 blokker. B+-treet inneholder 500 blokker på løvnivå, og har 3 nivåer. Hashindeksen inneholder 300 blokker med 60 overløpsblokker og gjennomsnittlig antall blokker per aksess av indeksen er 1.2.

---

## D2019 Problem 14: Access paths (2.5 %)

Gi et overslag på hvor mange blokker som aksesseres ved følgende SQL-setning. Gi en begrunnelse for ditt svar.

```sql
SELECT * FROM Student;
```

**Maks poeng:** 2.5

---

## D2019 Problem 15: Access paths (2.5 %)

Gi et overslag på hvor mange blokker som aksesseres ved følgende SQL-setning. Gi en begrunnelse for ditt svar.

```sql
SELECT * FROM Student WHERE pno=12121212345;
```

**Maks poeng:** 2.5

---

## D2019 Problem 16: Access paths (2.5 %)

Gi et overslag på hvor mange blokker som aksesseres ved følgende SQL-setning. Gi en begrunnelse for ditt svar.

```sql
SELECT * FROM Student WHERE lastname='Hansen';
```

**Maks poeng:** 2.5

---

## D2019 Problem 17: Access paths (2.5 %)

Gi et overslag på hvor mange blokker som aksesseres ved følgende SQL-setning. Gi en begrunnelse for ditt svar.

```sql
SELECT DISTINCT lastname FROM Student;
```

**Maks poeng:** 2.5

---

## D2020 Problem 13 (10 %)

Vi har en tabell Student (studnr, pnr, fornavn, etternavn, studieprogram, epost)

Tabellen lagres i en heapfil med 2000 blokker. Det er 20 studentposter i hver blokk.

For å tvinge gjennom at studnr er primærnøkkel, brukes et B+-tre med studnr som søkenøkkel og RecordId som peker til posten i heapfila. B+-treet har 3 nivåer og 1000 blokker på løvnivå.

Vi har også et annet B+-tre med søkenøkkel etternavn. Dette B+-treet har også 3 nivåer, men 1500 blokker på løvnivå.

Hvor mange blokker aksesseres ved de følgende queryene. Husk å begrunne hvert svar.

a) `SELECT * FROM Student WHERE studnr = 123456;`

b) `SELECT * FROM Student WHERE fornavn='Jon';`

c) `SELECT * FROM Student WHERE etternavn='Hansen';`

d) `SELECT DISTINCT etternavn FROM Student ORDER BY etternavn;`

Husk å svare på alle 4 delspørsmålene.

**Maks poeng:** 10

---

## D2021 Problem 8: Access methods (3 %)

Føresett vi har ein tabell Birdwatcher(bwid, name, address, age, ...) med 10000 radar. Attributtet bwid er primærnøkkel for tabellen. Tabellen er lagra i eit clustered B+-tre med bwid som søkjenøkkel, der løvnodane (level=0) i B+-treet er 750 blokker. Det er tre nivå med blokker i B+-treet. Kor mange blokkaksessar får vi med SQL-setningen `"SELECT * FROM Birdwatcher where bwid=2001;"`?

**Vel eitt alternativ:**

- [ ] 10 000
- [ ] 750
- [ ] 1,5
- [ ] 3

**Maks poeng:** 3

---

## D2021 Problem 9: Access methods (3 %)

Føresett vi har ein tabell Birdwatcher(bwid, ...) med 10000 rader. Attributtet bwid er primærnøkkel for tabellen. Tabellen er lagra i ein clustered, statisk hash-struktur med bwid som søkjenøkkel, der alle radane får plass i 500 blokker. Gjennomsnittleg aksesserast 1.25 blokker per søk på bwid. Kor mange blokkaksessar får vi med SQL-setningen `"SELECT * FROM Birdwatcher;"`?

**Vel eitt alternativ:**

- [ ] 500
- [ ] 12 500
- [ ] 625
- [ ] 10 000

**Maks poeng:** 3

---

## D2022 Problem 9: Misc (6 %)

Vi har en tabell Ansatt(aid, navn, epost) som er lagret i et clustered B+-tre hvor primærnøkkel i tabellen og søkenøkkel i B+-treet er aid. B+-treet har 2000 blokker på løvnivå og har høyde 3.

Hvilke alternativ er sanne?

**Velg ett eller flere alternativer**

- [ ] `"SELECT navn FROM Ansatt WHERE aid=1001"` gir 3 blokker som aksesseres.
- [ ] `"SELECT aid FROM Ansatt ORDER BY aid ASC"` gir 2002 blokker som aksesseres.
- [ ] `"SELECT epost FROM Ansatt WHERE epost>'johan@company.com'"` gir 1002 blokker som aksesseres.
- [ ] `"SELECT epost FROM Ansatt WHERE aid=1001"` gir 2002 blokker som aksesseres.
- [ ] `"SELECT navn, epost FROM Ansatt WHERE navn='Hans Hansen' AND epost='hans@company.com'"` gir 4 blokker som aksesseres.
- [ ] `"INSERT INTO Ansatt VALUES (1002, 'Jon Jonsen', 'jon@company.com')"` gir typisk 3 blokker som aksesseres og ei som skrives.

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

*Shared figure for D2023 Problems 12–14:*

```
                            root
                          ┌───────┐
                          │ 6 │13 │   (c)
                          └─┬─┴─┬─┴───┐
                ┌───────────┘   │     │
                ▼               ▼     ▼
            ┌───┬───┐       ┌───┬───┬───┐       ┌────┬────┐
            │ 2 │ 3 │ ◀───▶ │ 6 │ 7 │11 │ ◀───▶ │ 13 │ 18 │
            └───┴───┘       └───┴───┴───┘       └────┴────┘
              (a)               (d)                 (b)
```

Tabellen heter `Tab` og søkenøkkelen heter `mykey`. Den er lagret i et clustered B+-tre som vist i figuren.

---

## D2023 Problem 12: Access paths (2 %)

Hvilke sekvens av blokker aksesseres ved følgende query?

```sql
SELECT mykey FROM Tab WHERE mykey=7;
```

**Velg ett alternativ:**

- [ ] c, b, d
- [ ] c, a, d
- [ ] Ingen av de andre alternativene stemmer
- [ ] c, d
- [ ] c, b
- [ ] a, d

**Maks poeng:** 2

---

## D2023 Problem 13: Access paths (2 %)

Hvilken sekvens av blokker aksesseres ved følgende query?

```sql
SELECT mykey FROM Tab WHERE mykey<7;
```

**Velg ett alternativ:**

- [ ] a, d
- [ ] c, a, d
- [ ] c, d, a
- [ ] Ingen av de andre alternativene stemmer
- [ ] a, d, b
- [ ] c, b, d, a

**Maks poeng:** 2

---

## D2023 Problem 14: Access paths (2 %)

Hvilken sekvens av blokker aksesseres ved følgende query?

```sql
SELECT mykey FROM Tab ORDER BY mykey ASC;.
```

**Velg ett alternativ:**

- [ ] b, d, a
- [ ] c, d, a, b
- [ ] a, d, b
- [ ] Ingen av de andre alternativene stemmer
- [ ] c, b, d, a
- [ ] c, a, d, b

**Maks poeng:** 2

---

## D2023_K Problem 3: Aksessmetoder (3 %)

Anta vi har en tabell Birdwatcher(bwid, name, address, age, …) med 8000 rader. Attributtet bwid er primærnøkkel for tabellen. Tabellen er lagret i et clustered B+-tre med bwid som søkenøkkel, der løvnodene (level=0) i B+-treet har 550 blokker. Det er tre nivåer med blokker i B+-treet. Hvor mange blokkaksesser får vi med SQL-setningen “SELECT name, age FROM Birdwatcher where bwid=2001;”?

**Velg ett alternativ:**

- [ ] 550
- [ ] 1
- [ ] 3
- [ ] 8000

**Maks poeng:** 3

---

## D2023_K Problem 5: Aksessmetoder (3 %)

Anta vi har en tabell Birdwatcher(bwid, …) med 8000 rader. Attributtet bwid er primærnøkkel for tabellen. Tabellen er lagret i en clustered, statisk hash-struktur med bwid som søkenøkkel, der alle fugletitterne får plass i 450 blokker. Gjennomsnittlig aksesseres 1.25 blokker per søk på bwid. Hvor mange blokkaksesser får vi med SQL-setningen “SELECT * FROM Birdwatcher;”?

**Velg ett alternativ:**

- [ ] 562
- [ ] 10000
- [ ] 8000
- [ ] 450

**Maks poeng:** 3

---

## D2024 Problem 8: Clustered vs unclustered B+-tree (15 %)

Vi har en tabell Product (prId, pName, producer, model) med 10000 rader (poster), hvor prId er 8 byte, pName er 40 byte, producer er 40 byte og model er 32 byte. Dvs. en post i tabellen er 120 byte. Hver blokk i systemet er 4096 byte. Vi antar at en B+-tre-blokk fylles 2/3, mens en Heapfil-blokk fylles med så mange poster det er plass til uten å dele opp poster. En BlockId er 8 byte og en RecordID er 12 byte i dette systemet.

Vi har to typer queries som utføres mot denne tabellen.

```sql
(1) SELECT * FROM Product WHERE prId=<productId>
(2) SELECT * FROM Product WHER pName=<product-name>
```

70 % av queryene er av type (1) og 30 % av queryene er av type (2). Vi antar at både prId og pName er unike attributter. Vi tar ikke hensyn til kostnaden ved innsetting av poster i denne oppgaven.

Hvilket lagringsalternativ gir gjennomsnittlig lavest antall aksesser av blokker med disse to queryene?

**Velg ett alternativ:**

- [ ] Clustered B+-tree on search key prId.
- [ ] Unclustered B+-tree on search key pName and heap file for the table.
- [ ] Clustered B+-tree on search key pName
- [ ] Unclustered B+-tree on search key prId and heap file for the table.

**Maks poeng:** 15

---

*Shared setup for D2025 Problems 3–5:*

Vi har et clustered B+-tre hvor vi lagrer ansattposter, hvor hver post er 120 byte stor. En ansatt er identifisert med AnsattId som er 4 byte stor. Blokkene vi bruker er 4096 (4K) byte store. Det er 1000 blokker på løvnivå (level=0) i ansatt-B+-treet, og det er 3 nivåer i B+-treet. I tillegg til dette B+-treet er det et unclustered B+-tre på EtterNavn til de ansatte. Her er det 500 blokker på løvnivå (level=0) og det er 3 nivåer av blokker.

---

## D2025 Problem 3: Access paths (5 %)

Vi har queriet:

```sql
SELECT EtterNavn FROM Ansatt WHERE AnsattId = 12001;
```

Hvor mange blokker aksesseres ved optimal utføring av dette queriet?

**Velg ett alternativ:**

- [ ] 1002
- [ ] Ingen av de andre alternativene er riktige
- [ ] 5
- [ ] 4
- [ ] 3
- [ ] 502
- [ ] 2

**Maks poeng:** 5

---

## D2025 Problem 4: Access paths (5 %)

Vi har queriet:

```sql
SELECT ForNavn From Ansatt WHERE EtterNavn = 'Johannessen'
```

Hvor mange blokker aksesseres ved optimal utføring av dette queriet?

Du kan anta at det finnes kun en med etternavn 'Johannessen' i B+-treet.

**Velg ett alternativ:**

- [ ] Ingen av de andre alternativene er riktige.
- [ ] 502
- [ ] 1002
- [ ] 3
- [ ] 4
- [ ] 6

**Maks poeng:** 5

---

## D2025 Problem 5: Access Paths (5 %)

Vi har queriet:

```sql
SELECT EtterNavn From Ansatt ORDER BY EtterNavn DESC;
```

Hvor mange blokker aksesseres ved optimal utføring av dette queriet?

**Velg ett alternativ:**

- [ ] 6
- [ ] Ingen av de andre alternativene er riktige
- [ ] 1503
- [ ] 502
- [ ] 3
- [ ] 1002

**Maks poeng:** 5

---

## D2024_K Problem 3c: Access paths / query processing (16 % total)

Vi har en tabell med studentposter, **Student (studnr, navn, epost, studieprogram)**, som er 100 byte store. Nøkkelen **studnr** er 4 byte stor. Postene er lagret i et clustered B+-tre med blokker som er 4096 byte store. En BlockId er 8 byte. Tabellen inneholder 40 000 poster.
I tillegg til dette har vi et unclustered B+-tre på **epost** for denne tabellen. Epostattributtet er 25 byte stort. Epost er et unikt attributt. Blokkene i dette B+-treet er også 4096 byte (4KB) store. Anta at blokker i B+-trær har fyllgrad på 2/3.

c) Vi søker etter en student med studnr 123456. Hvor mange blokker aksesseres totalt?

**Skriv ditt svar her**

**Maks poeng:** 16 (totalt for Problem 3)

---

## D2024_K Problem 3d: Access paths / query processing (16 % total)

Vi har en tabell med studentposter, **Student (studnr, navn, epost, studieprogram)**, som er 100 byte store. Nøkkelen **studnr** er 4 byte stor. Postene er lagret i et clustered B+-tre med blokker som er 4096 byte store. En BlockId er 8 byte. Tabellen inneholder 40 000 poster.
I tillegg til dette har vi et unclustered B+-tre på **epost** for denne tabellen. Epostattributtet er 25 byte stort. Epost er et unikt attributt. Blokkene i dette B+-treet er også 4096 byte (4KB) store. Anta at blokker i B+-trær har fyllgrad på 2/3.

d) Vi søker etter en student for å finne hans studieprogram. Vi søker med epost= 'hansnils@stud.ntnu.no'. Hvor mange blokker aksesseres totalt med dette queriet? Vi antar at epostadressen det søkes etter, finnes.

**Skriv ditt svar her**

**Maks poeng:** 16 (totalt for Problem 3)
