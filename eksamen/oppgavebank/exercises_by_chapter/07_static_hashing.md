# Chapter 7 — Static hashing

**About:** `h(K) = K mod N` over fixed `N` blocks, with overflow handling (open / separate / multiple hashing).

**Exercise types seen on exams:**
- Given a hash file with overflow chains, compute the average number of block accesses for a successful lookup.

**Total exercises:** 2 — sourced from D2021, D2023_K.

---

## D2021 Problem 10: Access methods (3 %)

Føresett vi har følgjande nøklar som skal settast inn i ein statisk hash-struktur:

10, 11, 12, 13, 14, 15, 16, 17 og 18.

Hash-strukturen er tom fra før og har 4 blokker der kvar blokk kan innehalde to postar. Vi bruker separat lenka overløp viss ei blokk blir full. Bruk hashfunksjonen `h(k) = k mod 4` til å setje inn nøklane i rekkefølgjen gitt over. Kor mange blokkaksessar får vi gjennomsnittleg her på aksess med ein tilfeldig nøkkel over? Rund av svaret til to desimalar.

**Vel eitt alternativ:**

- [ ] 1.33
- [ ] 1.11
- [ ] 1.22
- [ ] 1.01

**Maks poeng:** 3

---

## D2023_K Problem 4: Aksessmetoder (3%)

Anta vi har følgende nøkler som skal settes inn i en statisk hash-struktur:

```text
16, 17 , 10, 11, 12, 13, 14, 15 og 18.
```

Hash-strukturen er tom fra før og har 4 blokker, der hver blokk kan inneholde to nøkler. Vi bruker separat lenket overløp hvis en blokk blir full. Bruk hashfunksjonen h(k) = k mod 4 til å sette inn nøklene i rekkefølgen gitt over.

Hvor mange blokkaksesser får vi gjennomsnittlig her på aksess med en tilfeldig nøkkel over? Rund av svaret til to desimaler.

**Velg ett alternativ:**

- [ ] 1.22
- [ ] 1.33
- [ ] 1.11
- [ ] 1.00

**Maks poeng:** 3
