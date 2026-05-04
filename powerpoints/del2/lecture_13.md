Algoritmer for queryprosessering og
optimalisering (seksj. 12, 13 og 14 i
notatet)
s
Svein Erik Bratsberg, IDI/NTNU
2
Fra Query til resultat
Fra Algebra til utføringsplan
4
Teknikker for å utføre
relasjonsalgebraoperasjoner
• Indeksering: Bruk WHERE-uttrykk til å trekke ut små
mengder poster (seleksjon, join)
• Iterasjon: Ofte er det raskest å scanne hele tabeller
• Partisjonering: Sortering og hashing av input gir
operasjoner på mindre datamengder
• NTNU er kjent som pionerer på hashbaserte metoder
(partisjonering). Kjell Bratbergsengen, VLDB 1984.
5
Statistikk om data • For hver tabell – # rader – # blokker • For hver indeks – # nøkkelverdier – # blokker – Histogrammer • For hvert B+-tre – Trehøyde – LowKey – HighKey – # blokker
6
Aksessvei
• Access path / search method (E & N)
• Optimalisatoren velger den billigste aksessveien
• Måles i antall blokker som aksesseres (+ CPU-bruk)
• 1. Filscan (tabellscan)
• 2. Indeks
– Indeksscan
– Rangescan
– Indeks lookup
7
Forskjellige utføringsplaner
Utføringstre – left deep plans
9
Bruk explain i MySQL
• MySQL leser tabellene i den gitte rekkefølgen
• ALL: Full table scan
mysql> explain select * from reg natural join loper;
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-----------------------------------
---------+
| id | select_type | table | partitions | type | possible_keys | key | key_len | ref | rows | filtered | Extra
|
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-----------------------------------
---------+
| 1 | SIMPLE | loper | NULL | ALL | PRIMARY | NULL | NULL | NULL | 3 | 100.00 | NULL
|
| 1 | SIMPLE | reg | NULL | ALL | NULL | NULL | NULL | NULL | 10 | 10.00 | Using where; Using join buffer
(hash join) |
+----+-------------+-------+------------+------+---------------+------+---------+------+------+----------+-----------------------------------
---------+
2 rows in set, 1 warning (0.01 sec)
10
Flettesortering
• Merge-sort: Sortering av store datamengder
• 2 faser
11
Flettesortering (2)
• 1. Partisjonering
– Sorterer deler (partisjoner) som får plass i RAM
• Antall deler (partisjoner): nR
• Antall blokker av data: b
• Tilgjengelige buffer: nB
• 2. Fletting
– Flett sammen sorterte delfiler i et antall pass
– Flettegrad dM – antall delfiler som kan flettes i hvert pass
– Flettepass – antall pass som filene må flettes i
• Regner ut total I/O – antall blokker som leses/skrives
12
Metoder for enkle seleksjoner (18.3.1)
• Lineært fil/tabellscan
• Bruk B+-tre eller hashindeks (clustered index)
• Bruk sekundærindeks (unclustered index)
13
Metoder for utføring av join
• J1: Nested-loop join
– For hver blokk i den ene tabellen
• Scan hele den andre tabellen og se etter match
• J2: Single-loop join (index nested loop)
– Loop gjennom den ene tabellen og bruk en indeks for å slå opp i
den andre
• J3: Sort-merge join:
– Hvis begge tabellene er sorterte på joinattributtene, kan vi bare
flette de
– Hvis ikke, kan de sorteres først, og så flettes
• J4: Partition-hash join
– Partisjoner tabellene ved hashing på joinattributtene
– Får mange små partisjoner som kan joines parvis i RAM