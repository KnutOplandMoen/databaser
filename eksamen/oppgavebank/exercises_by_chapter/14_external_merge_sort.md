# Chapter 14 — External merge sort

**About:** Initial sort phase (`n_R = ⌈b / n_B⌉` runs), then merge phase with degree `d_M = min(n_B − 1, n_R)` and `⌈log_{d_M}(n_R)⌉` passes; total I/O = read+write per pass.

**Exercise types seen on exams:**
- Given block count `b` and buffer `n_B`, compute number of initial runs, merge degree, number of passes, and total I/O.

**Total exercises:** 1 — sourced from D2023.

---

## D2023 Problem 11: Sorting (7 %)

Vi har en usortert fil bestående av 512 blokker med poster og et buffer ned plass til 5 blokker. Hvor mange blokker leses og skrives til sammen når postene skal sorteres ved hjelp av flettesortering? En lesing og en skriving av en blokk blir til sammen 2.

**Velg ett alternativ:**

- [ ] 2048
- [ ] 5120
- [ ] 2560
- [ ] Ingen av de andre alternativene stemmer
- [ ] 10240
- [ ] 1024

**Maks poeng:** 7
