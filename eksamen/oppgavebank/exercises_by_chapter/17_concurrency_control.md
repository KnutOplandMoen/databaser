# Chapter 17 — Concurrency control (2PL + MVCC / SI)

**About:** Read/write locks; basic / conservative / strict / rigorous 2PL; deadlock handling; snapshot isolation as alternative to read locks (writers still lock until commit).

**Exercise types seen on exams:**
- Given a sequence `r/w/c/a` of basic operations, annotate the schedule with rigorous-2PL lock/unlock and produce the actual commit order (detect deadlock if it occurs).
- Given a partially populated lock table (has-locks / wants-locks lists), reconstruct the operation sequence that produced it.
- Pick which 2PL flavor cannot deadlock (conservative); pick the correct claim about strict vs. rigorous.
- Snapshot-isolation execution: compute final value of an item under two concurrent transactions where one reads-modifies-writes.
- True/false on SI vs. serializable, write-skew, lost-update under SI.

**Total exercises:** 17 — sourced from D2018, D2018_K, D2019, D2020, D2021, D2022, D2023, D2023_K, D2024, D2024_K, D2025.

---

## D2018 Problem 8 (5 %)

Anta følgende historie som det skal settes låser for:

```text
S3: r2(X); w2(X); r1(X); r2(Y); w1(Y); c1; r2(Z); w2(Z); c2;
```

Vi antar tofaselåsing (2PL) av typen rigorous. Operasjonene kommer inn i databasen i den rekkefølgen som er angitt, men pga. låsene kan historien skje i en annen rekkefølge. Innfør både lese- og skrivelåser. Hvis en transaksjon må vente på en lås, kan en annen transaksjon senere i historien likevel prøve å fortsette:

Vis hvordan historien utføres når du innfører read_lock, write_lock og unlock som operasjoner i historien.

Skriv/tegn utførelsen på et ark.

**Maks poeng:** 5

---

## D2018_K Problem 8b: Transaksjoner (5 %)

Vi har en historie:

```text
H1: r1(A); r1(B); w2(A); w2(B); w3(B); w1(B); c1; c2; c3;
```

Vi innfører tofaselåsing (rigorous 2PL). Skriv om historien slik at den bruker 2PL.

Innfør operasjonene `wl(X)` - `write_lock(X)`, `rl(X)` - `read_lock(X)` og `unlock(X)`.

**Skriv ditt svar her**

**Maks poeng:** 5

---

## D2019 Problem 19: Tofaselåsing (5 %)

Vi har følgende sekvens av operasjoner som kommer inn til databasen. Vis hvordan denne sekvensen blir utført gitt at vi bruker tofaselåsing av typen rigorous og vranglåsoppdagelse (deadlock detection).

```text
r1(X); r2(X); w1(X); r3(Z); r2(Z); w2(Y); c1; c2; w3(Z); c3;
```

**Maks poeng:** 5


---

## D2019 Problem 20: Tofaselåsing (5 %)

Vi har følgende sekvens av operasjoner som kommer inn til databasen. Vis hvordan denne sekvensen blir utført gitt at vi bruker tofaselåsing av typen rigorous og vranglåsoppdagelse (deadlock detection).

```text
r1(X); r2(Y); r3(Z); w1(Y); w2(Z); w3(X); c1; c2; c3;
```

**Maks poeng:** 5

---

## D2020 Problem 15 (5 %)

Vi har en historie som vi prøver å få utført ved at transaksjonene setter lese- og skrivelåser. Vi innfører tofaselåsing (2PL) av typen rigorous for denne historien.

`r1(X);r2(X);w1(X);c1;r2(Y);r3(Z);w3(Z);c3;w2(Y);c2;`

I hvilken rekkefølge committer de tre transaksjonene T1, T2 og T3 når vi forutsetter rigorous 2PL?

Du skal ikke tegne historien, bare skriv rekkefølgen av transaksjonenes commit.

**Maks poeng:** 5

---

## D2021 Problem 3: Miscellaneous (3 %)

Kva for ein påstand er riktig?

**Vel eitt alternativ:**

- [ ] Ei historie kan umogeleg havne i vranglås med “basic” tofaselåsing.
- [ ] Ei historie kan umogeleg havne i vranglås med “konservativ” tofaselåsing.
- [ ] Ei historie kan umogeleg havne i vranglås med “strict” tofaselåsing.
- [ ] Ei historie kan umogeleg havne i vranglås med “rigorous” tofaselåsing.

**Maks poeng:** 3

---

## D2021 Problem 11: 2PL Execution (5 %)

Databasesystemet får inn følgjande sekvens av operasjonar. Vi innfører tofaselåsing (rigorous). I kva for rekkefølgje committer transaksjonane?

`r2(A); r1(A); r3(A); w2(B); r1(B); w1(C); r2(C); c3; c2; c1;`

Viss fleire transaksjoner blir vekt opp etter ein låsventing, blir dei vekt opp i den rekkefølgjen dei la seg til å vente, dvs. ein kø.

**Vel eitt alternativ:**

- [ ] T2; T1; T3;
- [ ] Vranglås mellom T1 og T2.
- [ ] T2; T3; T1;
- [ ] T1; T3; T2;
- [ ] T3; T2; T1;
- [ ] T3; T1; T2;
- [ ] T1; T2; T3;

**Maks poeng:** 5

---

## D2022 Problem 4: Misc (6 %)

Hvilke alternativ er sanne?

**Velg ett eller flere alternativer**

- [ ] Snapshot isloation lar transakjoner lese dataelement som samtidig oppdateres av andre transaksjoner
- [ ] 2PL impliserer serialiserbarhet
- [ ] Snapshot isolation lar to forskjellige transaksjoner skrive til samme dataalement samtidig
- [ ] Hvis du har konfliktserialiserbarhet, har du alltid serialiserbarhet.
- [ ] Hvis du har serialiserbarhet, har du alltid konfliktserialserbarhet
- [ ] Serialiserbarhet krever at vi har 2PL

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2022 Problem 6: 2PL-utføring (5 %)

Databasesystemet får inn følgende sekvens av operasjoner. Vi innfører tofaselåsing (rigorous). I hvilken rekkefølge committer transaksjonene?

Viss flere transaksjoner blir vekt opp etter en låsventing, blir de vekt opp i den rekkefølgen de la seg til å vente, dvs. en kø.

```text
r1(B); r3(B); w1(A); w2(A); w3(A); c1; c2; c3;
```

**Velg ett alternativ:**

- [ ] T3; T1; T2;
- [ ] T1; T2; T3;
- [ ] T3; T2; T1,
- [ ] T1; T3; T2;
- [ ] T2; T3; T1;
- [ ] T2; T1; T3;
- [ ] Vranglås mellom T2 og T3

**Maks poeng:** 5

---

## D2023 Problem 15: Locking 2PL (7 %)

Vi har følgende låser (i figuren) etter en sekvens av operasjoner mot databasen:

```
                Has locks                 Object              Wants locks

   ┌────┐       ┌──────┐ ┌──────┐         ┌───┐
   │ T1 │──────▶│ T1|R │▶│ T2|R │────────▶│ X │
   └────┘       └──┬───┘ └──▲───┘         └───┘
                   │        │                │
                   ▼        │                │
                ┌──────┐    │                └───────────────────────┐
   ┌────┐       │ T1|W │    │         ┌───┐        ┌──────┐ ┌──────┐ │
   │ T2 │──────▶└──────┘────┘────────▶│ Y │───────▶│ T3|R │▶│ T2|R │◀┘
   └────┘                             └───┘        └──▲───┘ └──────┘
                                                       │
   ┌────┐                                              │
   │ T3 │──────────────────────────────────────────────┘
   └────┘
```

Hvilken sekvens av operasjoner vil gi denne tilstanden til låsesystemet (tofaselåsing – rigorous)?

«T1 | R» betyr leselås fra T1 og «T1 | W» betyr skrivelås fra T1.

**Velg ett alternativ:**

- [ ] w1(X); r2(X); w1(Y); r3(Y); r2(Y);
- [ ] r1(X); r2(X); w1(Y); r3(Y); r2(Y);
- [ ] r1(X); r3(X); w1(Y); r3(Y); r2(Y);
- [ ] Ingen av de andre alternativene stemmer.
- [ ] r1(X); r2(X); w1(Y); r2(Y); w3(Y);

**Maks poeng:** 7

---

## D2023 Problem 16: Locking 2PL (7 %)

Vi skal sette tofaselåser (2PL) ved hjelp av metoden rigorous. I hvilken rekkefølge committer de tre transaksjonene T1, T2 og T3?

Følgende sekvens av operasjoner kommer inn til databasen:

```
r1(X); r2(X); w1(X); r3(Y); c1; w2(X); w2(Y); c2; r3(Z); c3;
```

**Velg ett alternativ:**

- [ ] T3; T2; T1;
- [ ] T3; T1; T2;
- [ ] T1; T2; T3;
- [ ] T3; Vi får vranglås mellom T1 og T2.
- [ ] T2; T3; T1;
- [ ] T2; T1; T3;
- [ ] T1; T3; T2;
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 7

---

## D2023_K Problem 6: SNAPSHOT ISOLATION (6 %)

Hvilke påstander er riktige?

**Velg ett eller flere alternativer**

- [ ] SNAPSHOT ISOLATION tillater at to skrivetransaksjoner skriver samme dataelement samtidig
- [ ] SNAPSHOT ISOLATION fører til at lesetransaksjoner ofte må abortere
- [ ] SNAPSHOT ISOLATION tillater mer samtidighet mellom transaksjoner enn SERIALIZABLE
- [ ] SNAPSHOT ISOLATION tillater at to transaksjoner leser samme dataelement
- [ ] Ingen av de andre alternativene er riktige
- [ ] SNAPSHOT ISOLATION er den metoden som gir mest isolasjon mellom transaksjoner
- [ ] SNAPSHOT ISOLATION lar transaksjoner lese data som er låst av skrivetransaksjoner

**Maks poeng:** 6

---

## D2024 Problem 3: 2PL - lock setting (5 %)

Vi har følgende historie av operasjoner som står i kø for å utføres av databasesystemet. Her benyttes tofaselåsing (2PL) av typen rigorous. I hvilken rekkefølge committes transaksjonene?

```text
r1(A); w2(B); r3(A); w1(A); r2(C); c1; c2; c3;
```

**Velg ett alternativ:**

- [ ] T1; T2; T3;
- [ ] T1; T3; T2;
- [ ] None of the other alternatives are correct.
- [ ] T2; T1; T3;
- [ ] T3; T1; T2;
- [ ] T2; T3; T1;
- [ ] A deadlock appears.
- [ ] T3; T2; T1;

**Maks poeng:** 5

---

## D2024 Problem 4: SNAPSHOT ISOLATION (5 %)

```text
A = 5
B = 5

T1: r1(A);                                      r1(B); D = A+B; w1(D); c1;
T2:           r2(A); A=A+1; w2(A); r2(B); B = B+1; w2(B); c2;
```

Vi har to transaksjoner (T1 og T2) som deler data i databasen og bruker SNAPSHOT ISOLATION. Hvilken verdi vil D ha i databasen når transaksjonene er ferdig committet? Transaksjonene utføres fra venstre mot høyre i den vedlagte figuren. A og B har begge verdien 5 før T1 og T2 starter.

**Velg ett alternativ:**

- [ ] 11
- [ ] 10
- [ ] 12
- [ ] None of the other alternatives are correct.

**Maks poeng:** 5

---

## D2025 Problem 9: Lock setting (7 %)

```text
Has locks                         ELEMENT                         Wants locks

T3 ── T3 | W ───────────────────► X ◄── T2 | R ── T1 | R
       │                              ▲
       │                              │
       └── T3 | R ── T2 | R ───────► Y

T2 ───────────────── T2 | R

T1 ─────────────────────────────────────────────── T1 | R
```

Vi har følgende låser (i figuren) etter en sekvens av operasjoner mot databasen. Hvilken sekvens av operasjoner vil gi denne tilstanden til låsesystemet (tofaselåsing – rigorous)? «T1 | R» betyr leselås fra T1 og «T3 | W» betyr skrivelås fra T3. "Has locks" nærmest elementet er satt først. Blå streker kjeder låser fra samme transaksjon. Svarte streker kjeder låser på samme element.

**Velg ett alternativ:**

- [ ] `r1(X); r2(X); w1(Y); r2(Y); w3(Y);`
- [ ] Ingen av de andre alternativene er korrekte
- [ ] `r1(X); r3(X); w1(Y); r3(Y); r2(Y);`
- [ ] `w3(X); r2(Y); r3(Y); r2(X); r1(X);`
- [ ] `w1(X); r2(X); w1(Y); r3(Y); r2(Y);`

**Maks poeng:** 7

---

## D2025 Problem 10: Lock setting (7 %)

Vi skal sette tofaselåser (2PL) ved hjelp av metoden rigorous. I hvilken rekkefølge committer de tre transaksjonene T1, T2 og T3? Følgende sekvens av operasjoner kommer inn til databasen:

```text
r1(X); r2(X); w1(X); r3(Y); c1; w2(Y); c2; r3(Z); c3;
```

**Velg ett alternativ:**

- [ ] T3; T1; T2;
- [ ] T3; T2; T1;
- [ ] T2; T1; T3;
- [ ] Vi får vranglås melom T1 og T2.
- [ ] T1; T3; T2;
- [ ] T1; T2; T3;
- [ ] Ingen av de andre alternativene stemmer
- [ ] T2; T3; T1;

**Maks poeng:** 7

---

## D2024_K Problem 6: Lock setting 2PL (7 %)

Vi antar tofaselåsing av typen rigorous. Den følgende sekvensen av operasjoner mot databasen skaper en vranglås. Tegn opp låsedatastrukturen med de tre transaksjonene og de 2 dataelementene, som viser hvilke låser som holdes og hvilke som ønskes i dette tilfellet hvor vranglåsen har oppstått.

```text
H2: r1(A); w2(B); w2(A); w3(B); w1(B); C1; C2; C3;
```

Tegn på ark.

**Skriv ditt svar her**

**Maks poeng:** 7
