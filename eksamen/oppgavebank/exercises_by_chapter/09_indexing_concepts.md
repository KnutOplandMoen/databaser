# Chapter 9 — Indexing concepts

**About:** Clustered vs. unclustered, primary vs. secondary; uniqueness as an index property; menu of storage alternatives (clustered B+ / heap+B+ / heap / LSM / column / clustered hash).

**Exercise types seen on exams:**
- Choose / explain how to enforce uniqueness on multiple attributes via indexes.

**Total exercises:** 1 — sourced from D2019.

---

## D2019 Problem 18: Unikhet og indekser (5 %)

Vi har en tabell

```sql
Student (pno, studno, lastname, firstname, email)
```

Tabellen er lagret som heapfil. Vi har en statisk hashindeks på pno. I tillegg har vi et unclustered B+-tree på lastname. Hver post i hashindeksen er på formatet (pno, RecordID) og hver post på løvnivå i B+-treet er på formatet (lastname, RecordID, RecordID, ...), dvs. et variabelt antall RecordID per lastname.

Antall studenter i tabellen er 50 000. Heapfilen inneholder 1000 blokker. B+-treet inneholder 500 blokker på løvnivå, og har 3 nivåer. Hashindeksen inneholder 300 blokker med 60 overløpsblokker og gjennomsnittlig antall blokker per aksess av indeksen er 1.2.

Vi har et ønske om at både studno og email skal være unike attributter. Hvordan vil du sørge for at det blir effektivt overholdt av databasen?

**Maks poeng:** 5
