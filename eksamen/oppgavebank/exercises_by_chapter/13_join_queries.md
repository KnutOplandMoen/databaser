# Chapter 13 — JOIN queries (block-NL)

**About:** Block-nested-loop join cost when joining two heap files with a B-block buffer; smaller table goes outer.

**Exercise types seen on exams:**
- Given two relations of stated block counts and a buffer of B blocks, compute total I/O for block-NL.
- Show that swapping outer/inner changes cost; justify the smaller-outer rule.
- Note simple optimization: if a small predicate fixes one side to one row, you only scan the other side.

**Total exercises:** 4 — sourced from D2018_K, D2021, D2022, D2023.

---

## D2018_K Problem 7: Join (5 %)

Vi har to tabeller lagret som heapfiler, Passeringer og Kjøretøy, som skal joines i et query. Passeringer består av 15 000 blokker og Kjøretøy av 300 blokker. Regn ut datavolumet i antall blokker lest ved en nested-loop-join av de to tabellene når det er plass til 32 blokker samtidig i buffer.

**Skriv ditt svar her**

**Maks poeng:** 5

---

## D2021 Problem 12: Join (5 %)

Vi har følgjande to tabellar:

`Employee(ssn, first_name, last_name, bdate, sex, salary, super_ssn, dno)`  
`Department (dname,dnumber,mgr_ssn,mgr_start_date)`

Føresett Department har 1000 postar lagra i 12 diskblokker og Employee har 120 000 postar i 4000 diskblokker.

Gitt det følgjande queryet:

```sql
SELECT e.last_name, e.first_name, d.dname
FROM Department d, Employee e
WHERE e.dno=d.dnumber;
```

Føresett du har plass for 8 diskblokker tilgjengeleg i buffer. Kor mange I/Oar (reads) får du ved å bruke nested-loop-join her for joinen e.dno=d.number?

**Vel eitt alternativ:**

- [ ] 4012
- [ ] 12012
- [ ] 11988
- [ ] 4006
- [ ] 8012

**Maks poeng:** 5

---

## D2022 Problem 11: Join (5%)

To tabeller Klasse og Student skal joines ved en nested loop join. Bufferet har 8 plasser til blokker, tabellen Klasse har 12 blokker og tabellen Student har 1400 blokker. Hvor mange lesinger av blokker skjer ved joinen?

**Velg ett alternativ:**

- [ ] 2824
- [ ] 1520
- [ ] 1512
- [ ] 2812
- [ ] 4524

**Maks poeng:** 5

---

## D2023 Problem 10: Join (7 %)

Vi skal joine to tabeller `Class` og `Student` med nested loop-join.

- `Class` består av 30 blokker.
- `Student` består av 1000 blokker.

Hvor mange blokker leses når vi skal joine disse to tabellene og vi har plass til 7 blokker i buffer?

**Velg ett alternativ:**

- [ ] 3090
- [ ] 4120
- [ ] 1030
- [ ] 6030
- [ ] 2060
- [ ] Ingen av de andre alternativene stemmer

**Maks poeng:** 7
