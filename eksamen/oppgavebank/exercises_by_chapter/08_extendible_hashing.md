# Chapter 8 — Extendible hashing

**About:** Directory + global/local depth; block split rehashes only its bucket; directory doubles when a full block has local depth = global depth.

**Exercise types seen on exams:**
- Insert a sequence of keys (hash given) into an empty / partial structure; draw global+local depths after each insert.
- Given a partial figure, identify the *first* block that must split and the resulting local depths.
- Given final state, count blocks with a stated local depth.
- Given that global depth went from `g₁` to `g₂`, list possible local depths.
- Pick which of N candidate figures are legal extendible-hash structures.

**Total exercises:** 8 — sourced from D2018_K, D2019, D2019_K, D2020, D2021, D2022, D2023, D2024.

---

## D2018_K Problem 5: Extendible hashing (5 %)

Vi skal sette inn følgende nøkler i en extendible hashing-struktur: 27, 18, 9, 7, 16, 13, 15. Vi har 4 blokker i utgangspunktet hvor både global og lokal dybde er 2. Hver blokk har plass til to nøkler. Se figuren under. Du skal bruke hashfunksjonen:

```text
h(K) = K MOD 8
```

Vis hvordan strukturen ser ut til slutt når du har satt inn alle nøklene. Ta med global og lokal dybde i figuren.

Tegn dette på et ark.

**Maks poeng:** 5

---

## D2019 Problem 13: Extendible hashing (5 %)

Vi har en extendible hashing-datastruktur. Når vi startet hadde den global dybde 2. Akkurat nå har den global dybde 5. Hvilke verdier kan lokal dybde ha i denne extendible hashing-datstrukturen? Forklar svaret ditt.

**Maks poeng:** 5

---

## D2019_K Problem 13 (10 %)

Sett inn følgende nøkler i en extendible hashstuktur.

```text
7, 4, 13, 12, 11, 5, 6, 1, 2, 16, 17.
```

Når du starter er global dybde = 2 og lokal dybde er også 2 for alle blokker. Alle blokker er i utgangspunktet tomme. Det er plass til 3 nøkler i hver blokk.

Vis hvordan hashstrukturen ser ut til slutt.

Denne oppgaven må besvares på papir.

**Maks poeng:** 10

---

## D2020 Problem 11 (5 %)

Vi har en extendible hashingstruktur hvor vi starter med 4 blokker (binært: 00, 01, 10, 11), hvor hver blokk har plass til to nøkler.

Når vi hasher inn de følgende nøklene: 7, 2, 14, 13, 11, 6, 1, 27.

Hvilken blokk er den første som må splittes?

Hva er lokal dybde for de to blokkene (den gamle og den nye) etter splitten?

Husk å svare på begge spørsmålene.

**Maks poeng:** 5

---

## D2021 Problem 5: Extendible hashing (4 %)

**Figur:** Extendible hashing-struktur etter directory doubling. Directory `a` har 8 element merkte `000`, `001`, `010`, `011`, `100`, `101`, `110`, `111`. Desse peikar til fem blokker merkte `b`, `c`, `d`, `e`, `f`:

- `000` og `001` peikar til blokk `b`
- `010` og `101` peikar til blokk `c`
- `011` og `110` peikar til blokk `d`
- `100` peikar til blokk `e`
- `111` peikar til blokk `f`

Føresett ein extendible hashingstruktur startar med 4 blokker og 4 element i directory. Etter ein directory doubling har vi følgjande struktur (uten å vise nøklane). Kva for tal skal det stå der det står **d** (lokal dybde).

**Svarfelt:** `_____`

**Maks poeng:** 4

---

## D2022 Problem 2: Extendible hashing (6 %)

**Figur:**

```text
Alt 1, global depth 3:
000 -> local depth 2: [0, 24]
001 -> local depth 2: [1, 16]
010 -> local depth 2: [26, 10]
011 -> local depth 3: [3, 11]
100 -> local depth 2: [0, 24]
101 -> local depth 2: [26, 10]
110 -> local depth 3: [3, 11]
111 -> local depth 3: [7]

Alt 2, global depth 3:
000 -> local depth 2: [0, 8]
001 -> local depth 2: [1, 17]
010 -> local depth 2: [26, 10]
011 -> local depth 3: [3, 11]
100 -> local depth 2: [0, 8]
101 -> local depth 2: [1, 17]
110 -> local depth 2: [26, 10]
111 -> local depth 3: [7]

Alt 3, global depth 3:
000 -> local depth 2: [0, 8]
001 -> local depth 3: [1, 17]
010 -> local depth 2: [26, 10]
011 -> local depth 2: [3, 11]
100 -> local depth 2: [0, 8]
101 -> local depth 3: [5]
110 -> local depth 2: [26, 10]
111 -> local depth 3: [5]

Alt 4, global depth 2:
000 -> local depth 2: [0, 8]
001 -> local depth 2: [1, 17]
010 -> local depth 2: [33, 10]
011 -> local depth 3: [3, 11]
100 -> local depth 2: [0, 8]
101 -> local depth 2: [1, 17]
110 -> local depth 4: [7]
111 -> local depth 4: [7]
```

Hvilke av figurene er lovlige strukturer i extendible hashing? Det kan være flere riktige svar. Hvis figuren er liten, kan du trykke CTRL-+ i browseren.

**Velg ett eller flere alternativer**

- [ ] Alternativ 3
- [ ] Alternativ 1
- [ ] Alternativ 4
- [ ] Alternativ 2

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2023 Problem 9: Extendible hashing (7 %)

Vi har en extendible hashing-struktur hvor vi starter med 4 blokker og 4 pekere fra directory. Det er plass til 3 nøkler i hver blokk. Hvor mange blokker med lokal dybde = 3 får vi når vi har satt inn følgende sekvens med nøkler:

```
1, 2, 4, 5, 11, 12, 6, 7, 13, 16, 17
```

Du kan bruke hashfunkjsonen `h(K) = K MOD 8`.

**Velg ett alternativ:**

- [ ] 0
- [ ] 1
- [ ] 4
- [ ] 3
- [ ] 2
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 7

---

## D2024 Problem 2: Extendible hashing (5 %)

Vi starter med en extendible hashingstruktur hvor det er 4 pekere til 4 tomme blokker. Dvs. lokal og global dybde er 2. Hver blokk har plass til to nøkler. Så settes de følgende nøklene inn:

```text
1, 2, 5, 4, 3, 11, 9, 10, 7, 8
```

Når alle nøklene er satt inn, hvor mange blokker har lokal dybde = 3?
Bruk hashfunksjonen h(K) = K MOD 8.

**Velg ett alternativ:**

- [ ] 4
- [ ] 1
- [ ] None of the other alternatives are correct
- [ ] 3
- [ ] 0
- [ ] 2

**Maks poeng:** 5
