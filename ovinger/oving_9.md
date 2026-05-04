TDT4145 Datamodellering og databasesystemer
Lagring og indekser
a) Statisk hashing. Anta poster med nøklene gitt i følgende rekkefølge: 4521, 1104, 1631, 2347,
4300, 1121, 0932, 7845, 6712, 4321, 3412, 1742, 1111. Anta videre at en blokk har plass til
tre poster og at det er 4 blokker i den statiske hashfila, og det er brukt separat, lenket
overløp. Bruk hashfunksjonen h(K) = K MOD 4. Vis hashfila etter at alle postene er satt inn.
Hva er gjennomsnittlig antall blokker aksessert ved direkte søk etter nøklene i fila?
b) Extendible hashing: Sett inn de samme nøklene som i oppgave a), men bruk extendible
hashing. Start med 4 blokker. Anta det er plass til 3 nøkler per blokk. Bruk hashfunksjonen
h(K) = K MOD 8.
c) B+-trær: Sett inn de samme nøklene som i oppgave a) i den samme rekkefølgen. Anta det er
plass til tre nøkler i hver blokk, også på indeksnivå. På indeksnivå er det plass til 4
blokkpekere, men fremdeles tre nøkler. Vis B+-treet hver gang du skal til å splitte ei blokk.
d) Se på følgende SQL-spørsmål:
SELECT a FROM tabell WHERE id = 6712;
Id er nøklene som er gitt i a) og a er et attributt i samme tabell.
Hvor mange blokker aksesseres for de forskjellige indeksene (aksessveiene) som er gitt i a) til
c)? Anta indeksen har tilstanden etter siste innsetting (1111). Anta katalogen i extendible
hashing ligger i minnet og ikke gir blokkaksess.
e) Se på følgende SQL-spørsmål:
SELECT a FROM tabell WHERE id > 6000;
Hvor mange blokker aksesseres ved de forskjellige indeksene (statisk hashing, extendible
hashing og B+-trær)?
f) Vi har et unclustered B+-tre med plass til 255 pekere (BlockIDs) i hver blokk. På løvnivå har vi
plass til 255 poster med pekere (RecordIDs) til poster i en heapfil. Hvor mange nøkler kan vi
maskimalt ha på løvnivå når vi har tre nivåer i B+-treet?
Svein Erik Bratsberg, 22/2-2024