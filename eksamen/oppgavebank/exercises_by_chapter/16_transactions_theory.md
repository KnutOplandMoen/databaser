# Chapter 16 — Transactions and theory (recoverability + serializability)

**About:** Schedules, conflict pairs, recoverable ⊃ ACA ⊃ strict hierarchy, conflict serializability via precedence-graph cycle test.

**Exercise types seen on exams:**
- Given a list of histories (with `r/w/c/a`), classify each as unrecoverable / recoverable / ACA / strict (pick the *strongest* property).
- Given a set of histories, pick the conflict-serializable ones (build the precedence graph, look for cycles).

**Total exercises:** 16 — sourced from D2018, D2019_K, D2021, D2022, D2023_K, D2024, D2024_K, D2025.

---

## D2018 Problem 7 (5 %)

Avgjør recoveryegenskapene (ikke gjenopprettbar, gjenopprettbar, ACA og strikt) ved de følgende historiene:

```text
S1: r2(Z); w2(X); w2(Y); c2; w1(X); r1(X); c1; r3(X); r3(Z); r3(Y); c3;
S2: r1(X); r2(X); w2(X); w2(Y); c2; w1(X); r3(Z); w1(Y); c1; r3(Y); r3(X); c3;
S3: r2(X); w2(X); r1(X); r2(Y); w1(Y); c1; r2(Z); w2(Z); c2;
```

Begrunn svarene dine.

**Maks poeng:** 5

---

## D2019_K Problem 16 (5 %)

Hvilken recoveryegenskaper (unrecoverable, recoverable, ACA and strict) har de følgende historiene? Begrunn svarene ditt.

```text
H1: w1(X); r2(X); w1(Y); w2(Y); c1; c2;
H2: w1(X); r2(Y); w1(Y); c1; r2(X); c2;
H3: w1(X); w2(X); w1(Y); w2(Y); c1; C2;
```

Skriv ditt svar her...

**Maks poeng:** 5

---

## D2021 Problem 1: Miscellaneous (3 %)

Kva er recovery-eigenskapen til følgjande historie: `r1(A); w2(A); w1(A); r3(A); c1; c2; c3;`

**Vel eitt alternativ:**

- [ ] Unrecoverable (ikkje gjenopprettbar)
- [ ] ACA (unngå galopperande abort)
- [ ] Recoverable (gjenopprettbar)
- [ ] Strict

**Maks poeng:** 3

---

## D2021 Problem 2: Miscellaneous (3 %)

Kva er recovery-eigenskapen til følgjande historie: `w1(A); w1(B); w2(A); c1; r2(B); r3(B); c2; c3;`

**Vel eitt alternativ:**

- [ ] Recoverable (gjenopprettbar)
- [ ] Strict
- [ ] ACA (unngå galopperande abort)
- [ ] Unrecoverable (ikkje gjenopprettbar)

**Maks poeng:** 3

---

## D2021 Problem 4: Miscellaneous (3 %)

Kva er recovery-eigenskapen til følgjande historie: `w1(A); r2(A); w1(B); w2(B); c1; c2;`

**Vel eitt alternativ:**

- [ ] ACA (unngå galopperande abort)
- [ ] Strict
- [ ] Unrecoverable (ikkje gjenopprettbar)
- [ ] Recoverable (gjenopprettbar)

**Maks poeng:** 3

---

## D2021 Problem 15: Serializability (6 %)

Kva for historier er konfliktserialiserbare?

**Vel eitt eller fleire alternativ:**

- [ ] `r3(X); w1(X); r2(Z); w2(X); r3(Z); w3(Z); r1(X);`
- [ ] `r1(X); w1(X); r2(Y); w3(Y); r3(X); w3(Z): w2(X);`
- [ ] `r2(X); r1(X); w2(X); r3(X); r2(Z); w3(Z); r1(Y);`
- [ ] `w2(X); w3(Y); r3(Y); r1(X); r2(X); r1(Y); w1(Y);`
- [ ] `r1(X); r1(Y); w1(X); w2(Y); w3(Y); w1(X); r2(Y);`
- [ ] `r1(X); w1(X); r2(Y); w2(Y); r3(X); w3(Z); r2(Z);`

**Maks poeng:** 6

---

## D2022 Problem 7: Konfliktserialbarhet (6 %)

Hvilke historier er konfliktserialiserbare? Det kan være flere.

**Velg ett eller flere alternativer**

- [ ] `w3(A); r2(A); r1(B); w1(B); w3(C); w2(C);`
- [ ] `w1(X); r2(X); r1(Y); w3(X); w2(X); w1(Y);`
- [ ] `r1(A); w2(B); r2(A); w3(A); r3(Z) w1(A);`
- [ ] `r3(Z); w2(Y); r1(Z); w1(Y); w2(Z); w2(X);`
- [ ] `r1(Y); w2(Y); r1(X); w3(X); r3(Y); r1(Z);`
- [ ] `w2(Y); r3(Y); r1(Z); w2(Z); w3(Z); w2(X);`

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2022 Problem 8: Gjenopprettbarhet (6 %)

Hvilke historier er gjenopprettbare?

**Velg ett eller flere alternativer**

- [ ] `w2(X); r1(X); r3(X); w2(Y); r3(Y); w1(X); c1; c2; c3;`
- [ ] `w3(Z); r1(X); r1(Z); w2(Y); r3(Y); w3(Y); c1; c2; c3;`
- [ ] `r1(X); r2(X); w1(Y); r2(Y); r3(Y); w3(Y); c1; c2; c3;`
- [ ] `r2(X); w1(X); w2(Y); r1(Y); r3(Y); c1; r3(X); c2; c3;`
- [ ] `w1(X); w1(Y); r2(Y); w3(Y); w1(Z); c1; c2; c3;`
- [ ] `r1(Z); r2(Z); w1(Y); r3(Y); w3(Y): c1; w3(Z); c2; c3;`

I denne oppgaven får du poeng for hvert riktige svar og trekk for hvert feil svar. Minimum 0 poeng på hele oppgaven.

**Maks poeng:** 6

---

## D2023_K Problem 7: Gjenopprettbarhet (3 %)

Hva er recovery-egenskapen til følgende historie: w1(A); r2(A); w1(B); w2(B); c1; c2;

**Velg ett alternativ:**

- [ ] Strict
- [ ] Gjenopprettbar (recoverable)
- [ ] ACA
- [ ] Ikke gjenopprettbar (non-recoverable)

**Maks poeng:** 3

---

## D2023_K Problem 8: Gjenopprettbarhet (3 %)

Hva er recovery-egenskapen til følgende historie: w1(A); w1(B); w2(A); c1; r2(B); r3(B); c2; c3;

**Velg ett alternativ:**

- [ ] ACA
- [ ] Gjenopprettbar (recoverable)
- [ ] Ikke gjenopprettbar (non-recoverable)
- [ ] Strict

**Maks poeng:** 3

---

## D2023_K Problem 9: Gjenopprettbarhet (3 %)

Hva er recovery-egenskapen til følgende historie: r1(A); w2(A); w1(A); r3(A); c1; c2; c3;

**Velg ett alternativ:**

- [ ] Strict
- [ ] Ikke gjenopprettbar (non-recoverable)
- [ ] ACA
- [ ] Gjenopprettbar (recoverable)

**Maks poeng:** 3

---

## D2023_K Problem 10: Konfliktserialiserbarhet ( 6 %)

Hvilke historier (schedules) er konfliktserialiserbare?

**Velg ett eller flere alternativer**

- [ ] `w3(A); r1(A); w1(B); r2(B); w2(C); r3(C);`
- [ ] `r1(A); w1(B); r2(B); r3(A); r2(A); w2(B);`
- [ ] `r1(A); r2(A); w1(B); w2(B); r1(B);`
- [ ] `r1(A); r2(A); r1(B); r3(C); w1(A); w2(C);`
- [ ] Ingen av de andre alternativene er konfliktserialiserbare
- [ ] `r2(C); r1(C); w2(C); r3(B); r2(B); w2(B);`
- [ ] `r3(C); r1(C); w3(C); r2(B); r3(B); w1(C);`

**Maks poeng:** 6

---

## D2024 Problem 9: Conflict serializability (6 %)

Hvilke av de følgende historiene (schedules) er konfliktserialiserbare?

**Velg ett eller flere alternativer**

- [ ] No other alternatives are correct.
- [ ] `r1(X); r2(Z); r3(X); r1(Z); r2(Y); r3(Y); w1(X); w2(Z); w3(Y); w2(Y)`
- [ ] `r1(X); r2(Y); w1(X); w2(Y); r3(X); r1(X); w3(Y);`
- [ ] `r1(X); w2(Z); r1(Z); r3(Z); r3(Y); w2(X); w3(Y); r2(Y); w1(Z); w2(Y) ;`
- [ ] `r1(X); r2(Z); r1(Z); r3(X); r3(Y); w1(X); w3(Y); r2(Y); w2(Z); w2(Y) ;`

**Maks poeng:** 6

---

## D2025 Problem 6: Conflict serializability (6 %)

Hvilke av de følgende historiene er konliktserialiserbare?

**Velg ett eller flere alternativer:**

- [ ] `r1(B); w3(A); r3(B); w2(A); r1(A);`
- [ ] `w2(A); r2(B); w1(A); w1(B); r2(B); w2(B); r3(C);`
- [ ] Ingen av de andre alternativene er korrekte
- [ ] `r1(A); r2(A); w1(A); w2(A); r3(B); w3(B);`
- [ ] `r2(A); r1(B); w2(A); r3(A); w1(B); w3(A); r2(B); w2(B);`
- [ ] `r2(A); w1(B); w2(A); r3(A); w2(B); w3(A); r1(B); w2(B);`

**Maks poeng:** 6

---

## D2024_K Problem 4: Recovery properties (3 %)

Gitt følgende historier:

```text
H1: w2(A);w1(B);w1(A);r2(B);c1;c2;
H2: w1(A);w1(B);w2(A);c1;r2(B);c2;
H3: w1(A);c1;w2(B);w2(A); r2(B);c2;
```

Klassifiser disse historiene med sine mest spesifikke recoveryegenskaper.

**Skriv ditt svar her**

**Maks poeng:** 3

---

## D2024_K Problem 5: Conflict serializability (4 %)

Hvilke av de følgende historiene er konfliktserialiserbare?

**Velg ett eller flere alternativer**

- [ ] `r1(X); r2(Z); r1(Z); r3(X); r3(Y); w1(X); w3(Y); r2(Y); w2(Z); w2(Y);`
- [ ] `r1(X); w2(Z); r1(Z); r3(Z); r3(Y); w2(X); w3(Y); r2(Y); w1(Z); w2(Y);`
- [ ] `r2(A);r1(B);w2(A);r2(B); r3(A);w1(B);w3(A);w2(B);`
- [ ] `r1(Y); w3(X); r3(Y); w2(X); r1(X); r2(Z);`

**Maks poeng:** 4
