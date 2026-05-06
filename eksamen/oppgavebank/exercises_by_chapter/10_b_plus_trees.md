# Chapter 10 — B+-trees

**About:** Balanced ordered tree with all data at leaves; sideways pointers; split copies key up at leaf and moves key up internally; fill factor 2/3.

**Exercise types seen on exams:**
- Insert a sequence of keys into an empty B+-tree of given fan-out; draw the tree after each split (or just the final state).
- Given a final tree, pick which of several candidate insertion sequences produced it.
- Sizing: given block size, record size, key/RID/BlockId widths, record count, fill factor 2/3, compute leaf-block count.
- Sizing: same setup, compute level-1 block count and total number of levels.
- Given keys 1…N, classify which leaf-block letter (a–e) each key ends up in.

**Total exercises:** 14 — sourced from D2018, D2018_K, D2019_K, D2020, D2021, D2022, D2023, D2023_K, D2024, D2024_K, D2025.

---

## D2018 Problem 5 (10 %)

Sett inn følgende nøkler i et B+-tre i den gitte rekkefølgen: 4, 28, 3, 17, 18, 5, 27, 13, 16, 15

Anta at det er plass til tre nøkler i hver blokk, og at det er plass til tre nøkler og fire pekere i hver blokk med nivå > 0. Vis tilstanden til B+-treet hver gang du skal til å splitte en blokk. Vis også tilstanden til B+-treet til slutt.

Denne oppgaven må løses på ark.

**Maks poeng:** 10

---

## D2018_K Problem 6a: Lagring, indeksering og queries (4 %)

Vi har en database som lagrer bomringpasseringer i en tabell:

```text
Passering(passId, passDateTime, regNo, turnpikeNo, cost)
```

Hver post (record) i tabellen er 120 byte lang og hver blokk er 8 KB (8192 bytes). Vi har registrert 1 000 000 passeringer i databasen.

Vi ønsker å lagre tabellen i et clustered B+-tree med passId (8 byte) som søkenøkkel. Hvor mange blokker er det på hvert nivå i B+-treet? Beskriv eventuelle antagelser du tar.

**Skriv ditt svar her**

**Maks poeng:** 4

---

## D2019_K Problem 12 (10 %)

Du skal sette inn følgende nøkler i den gitte rekkefølgen i et B+-tre:

```text
7, 4, 13, 12, 11, 5, 6, 1, 2, 16, 17.
```

Hver blokk i B+-treet har plass til 4 nøkler og inntil 5 pekere når nivået er større enn 0.

Vis tilstanden til B+-treet hver gang du skal til å splitte en blokk, og vis tilstanden til B+-treet til slutt når alle nøkler er satt inn.

Denne oppgaven må besvares på papir.

**Maks poeng:** 10

---

## D2020 Problem 12 (8 %)

Vi skal sette inn nøkler i et B+-tre med plass til tre nøkler i hver blokk. Treet under skal inneholde nøkler på løvnivå (level=0). De er satt inn i den rekkefølgen de står i under. For hver blokk på løvnivå, dvs. (a)-(e), skriv hvilke nøkler som skal inn der. Du skal ikke tegne, bare skriv det som tekst: f.eks. (a): nøkkel 1, nøkkel 2, ... (b): (nøkkel), ...

Følgende nøkler er satt inn:

3, 6, 15, 23, 28, 34, 4, 8, 17 og 25.

**Figur: B+-tre**

- Rotblokken er merket `root` og inneholder nøkkelen `15` i første felt.
- Venstre internblokk inneholder nøkkelen `6` i første felt.
- Høyre internblokk inneholder nøklene `23` og `28` i de to første feltene.
- Løvnivået består av fem tomme blokker med tre nøkkelfelt hver, merket `(a)`, `(b)`, `(c)`, `(d)` og `(e)`, lenket fra venstre mot høyre og høyre mot venstre.
- Venstre internblokk peker til løvblokkene `(a)` og `(b)`.
- Høyre internblokk peker til løvblokkene `(c)`, `(d)` og `(e)`.

**Maks poeng:** 8

---

## D2021 Problem 6: B+ tree (10 %)

**Figur:** B+-treet har rotblokk med nøkkelen `7`. Venstre internblokk har nøkkelen `4`. Høgre internblokk har nøklane `13` og `17`. Løvnivået frå venstre mot høgre er:

```text
[2 | 3 | _] <-> [4 | 5 | 5] <-> [7 | 8 | 11] <-> [13 | _ | _] <-> [17 | 18 | _]
```

Følgjande sekvensar av innsettingar er tilgjengeleg. Kva for ein av disse gir B+-treet illustrert i oppgåva? Det er plass til tre postar i kvar blokk, og kvar blokksplitt flytter over ein post til den nye blokka til høgre.

**Vel eitt alternativ:**

- [ ] 2, 3, 4, 5, 6, 7, 8, 11, 13, 17, 18
- [ ] 11, 13, 2, 3, 17, 18, 4, 5, 8, 7, 6
- [ ] 2, 4, 7, 3, 5 17, 13, 11, 18, 6, 8
- [ ] 7, 8, 6, 4, 5, 17, 18, 2, 3, 11, 13

**Maks poeng:** 10

---

## D2022 Problem 1: B+-tre (10 %)

```text
                         root
                          |
                        [9 | |]
                       /       \
                  [5 | |]     [12 | 19 |]
                 /     \       /     |      \
[1 | 3 |] <-> [5 | 8 |] <-> [9 | 11 |] <-> [12 | 17 |] <-> [19 | 23 | 27]
```

Følgende sekvenser av innsettinger er tilgjengelige. Hvilken av disse gir B+-treet illustrert i oppgaven? Det er plass til tre poster i hver blokk, og hver blokksplitt flytter over en post til den nye blokka til høyre.

**Velg ett alternativ:**

- [ ] 17, 19, 8, 9, 1, 3, 12, 5, 11, 23, 27
- [ ] 1, 3, 5, 8, 9, 11, 12, 17, 19, 23, 27
- [ ] 5, 12, 17, 1, 3, 19, 23, 27, 8, 9, 11

**Maks poeng:** 10

---

## D2023 Problem 8: Clustered B+-tre (6 %)

Vi har poster som er 120 byte store.

Vi har en tabell med 8 000 poster. Hvor mange blokker har vi på level=0 i et clustered B+-tre når blokkene er 4096 bytes store og vi antar det ikke lagres noe annet i blokkene enn poster? Anta fyllingsgrad er 2/3, dvs. blokkene vil ikke være mer enn 2/3 fulle og at vi lagrer kun hele poster i blokkene.

**Velg ett alternativ:**

- [ ] 235
- [ ] 364
- [ ] 1130
- [ ] 728
- [ ] 240
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 6

---

## D2023_K Problem 2: B+-tre (15 %)

Tegn opp B+-treet som finnes etter innsetting av følgende sekvens av nøkler:

```text
2, 3, 5, 1, 7, 6, 4, 13, 17, 9
```

Hver blokk har plass til 3 nøkler og hver blokk på nivå > 0 har plass til 4 pekere og 3 nøkler.

Vis tilstanden til B+-treet hver gang du skal til å splitte en blokk, og vis treet til slutt

Denne oppgaven skal leveres på ark.

**Skriv ditt svar her**

**Maks poeng:** 15

---

## D2024 Problem 1: B+-trees (10 %)

```text
                         root
                          |
                         [7| | ]
                        /       \
                  [4| | ]       [10|11| ]
                 /    \         /    |    \
          [1|2|3]  [4|5| ]  [7|8|9] [10| | ] [11| | ]
```

Hvilken sekvens av innsettinger er det som genererer det følgende B+-treet?
Anta det er plass til tre nøkler i hver blokk, og inntil 4 pekere til blokker på nivået under. Når du splitter på løvnivå flytter du en post over i den nye blokka. Når du splitter på nivå > 0, flytter du en post over til den nye blokka, og du flytter en post opp i nivået over.

**Velg ett alternativ:**

- [ ] 1, 2, 5, 4, 3, 11, 9, 10, 7, 8
- [ ] 1, 4, 7, 2, 5, 8, 3, 11, 10, 9
- [ ] 1, 3, 7, 8, 5, 4, 2, 10, 11, 9
- [ ] None of the other alternatives are correct

**Maks poeng:** 10

---

## D2025 Problem 1: B+-trees (5 %)

Vi har et clustered B+-tre hvor vi setter inn 20200 studentposter av størrelse 120 byte. Nøkkelen i posten er studNr og er 4 byte stor. En RecordID er 12 byte og en BlockId er 8 byte. En blokk er 4096 (4K) byte. Hvor mange blokker finnes på løvnivå (level=0) i B+-treet etter at alle postene er satt inn? Anta blokkene har 2/3 fyllgrad.

**Velg ett alternativ:**

- [ ] 571
- [ ] 919
- [ ] Ingen av de andre alternative er riktige
- [ ] 5000
- [ ] 22
- [ ] 595

**Maks poeng:** 5

---

## D2025 Problem 2: B+-tree (5 %)

Vi har et clustered B+-tre hvor vi setter inn 20200 studentposter av størrelse 120 byte. Nøkkelen i posten er studNr og er 4 byte stor. En RecordID er 12 byte og en BlockId er 8 byte. En blokk er 4096 (4K) byte. Hvor mange blokker finnes på level=1 i B+-treet etter at alle postene er satt inn? Anta blokkene har 2/3 fyllgrad.

**Velg ett alternativ:**

- [ ] 3
- [ ] 2
- [ ] 5
- [ ] 4
- [ ] 1
- [ ] Ingen av de andre alternativene er riktige

**Maks poeng:** 5

---

## D2024_K Problem 1: B+-tree (10 %)

Vi har et B+-tre med datablokker av størrelse 4096 byte (4KB). I dette treet setter vi inn fem poster med nøkler i følgende rekkefølge: 123, 97, 128, 45, 27. Hver post har størrelse 1000 byte.
Vis hele treet med nøklene i riktig sorteringsrekkefølge etter at alle posten er satt inn. Ta med alle pekere som skal være med.

Tegn på ark.

**Skriv ditt svar her**

**Maks poeng:** 10

---

## D2024_K Problem 3a: Access paths / query processing (16 % total)

Vi har en tabell med studentposter, **Student (studnr, navn, epost, studieprogram)**, som er 100 byte store. Nøkkelen **studnr** er 4 byte stor. Postene er lagret i et clustered B+-tre med blokker som er 4096 byte store. En BlockId er 8 byte. Tabellen inneholder 40 000 poster.
I tillegg til dette har vi et unclustered B+-tre på **epost** for denne tabellen. Epostattributtet er 25 byte stort. Epost er et unikt attributt. Blokkene i dette B+-treet er også 4096 byte (4KB) store. Anta at blokker i B+-trær har fyllgrad på 2/3.

a) Hvor mange blokker får vi på løvnivå (level=0) i det clustered B+-treet?

**Skriv ditt svar her**

**Maks poeng:** 16 (totalt for Problem 3)

---

## D2024_K Problem 3b: Access paths / query processing (16 % total)

Vi har en tabell med studentposter, **Student (studnr, navn, epost, studieprogram)**, som er 100 byte store. Nøkkelen **studnr** er 4 byte stor. Postene er lagret i et clustered B+-tre med blokker som er 4096 byte store. En BlockId er 8 byte. Tabellen inneholder 40 000 poster.
I tillegg til dette har vi et unclustered B+-tre på **epost** for denne tabellen. Epostattributtet er 25 byte stort. Epost er et unikt attributt. Blokkene i dette B+-treet er også 4096 byte (4KB) store. Anta at blokker i B+-trær har fyllgrad på 2/3.

b) Hvor mange blokker får vi på løvnivå (level=0)  i det unclustered B+-treet?

**Skriv ditt svar her**

**Maks poeng:** 16 (totalt for Problem 3)
