1
Institutt for datateknologi og informatikk
TDT4145 - Datamodellering og databasesystemer
Øving 4
Læringsmål for denne øvingen er å:
- Forstå extendible hashing.
- Lære seg å konstruere og forstå hvordan data lagres i B+-trær.
- Kunne analysere kostnad ved databasespørringer med ulike indeksstrukturer.
- Forstå hvordan transaksjoner tilrettelegger for samtidighet og robusthet mot feil for et
databasesystem.
- Kunne analysere transaksjonshistorier hva gjelder recovery-egenskaper og serialiserbarhet,
og forstå hvordan tofaselåsing fungerer på en historie.
- Bli kjent med noen av grunnprinsippene bak krasjrecovery med Aries.
Oppgave 1: Extendible hashing
Sett inn følgende nøkler i en extendible hashstuktur.
6, 4, 11, 13, 12, 7, 8, 3, 2, 19, 18.
Når du starter, er global dybde = 2 og lokal dybde er også 2 for alle fire blokker. Alle blokker
er i utgangspunktet tomme. Det er plass til 3 nøkler i hver blokk. Velg en fornuftig
hashfunksjon.
Vis strukturen før hver «directory doubling» og det endelige resultatet.
Oppgave 2: Konstruksjon av B+-tre
Anta at vi har et tomt B+-tre med plass til 3 poster per blokk. I tillegg har hver blokk som ikke
er på løvnivå plass til 4 pekere (blokkidentifikatorer). Sett inn nøkler i følgende rekkefølge:
10, 16, 23, 5, 11, 18, 15, 3, 25, 19, 20.
Vis tilstanden til B+-treet hver gang du skal til å splitte ei blokk og det endelige resultatet.
2
Oppgave 3: Lagring og queries med clustered B+-tre
Gitt en database som lagrer informasjon om personer:
Person(PersonID, FirstName, LastName, Birthyear, DepartmentNo)
Vi har informasjon om 10 000 personer, der hver person vil ha en post på 250 byte. Postene
er lagret i blokker på 2 KB (2048 byte), anta at vi derfor har plass til 8 poster per blokk.
Tabellen er lagret i et clustered B+-tre med PersonID som søkenøkkel.
a) Vis at treet får 2000 blokker på løvnivå (nivå 0) hvis vi antar ⅔ fyllgrad.
b) Anta at PersonID er 4 byte og en blokkidentifikator 4 byte. Vis at treet får 12 blokker
på nivå 1 og kun 1 blokk på nivå 2 (rot) hvis vi antar ⅔ fyllgrad.
c) Gi et estimat på hvor mange blokker som aksesseres ved følgende SQL-setninger.
Skriv en kort forklaring for hvert svar og skriv eventuelle antagelser du finner det
nødvendig å gjøre.
1. SELECT * FROM Person where PersonID = 195454;
2. SELECT * FROM Person;
3. SELECT * FROM Person ORDER BY PersonID ASC;
4. SELECT FirstName, LastName FROM Person WHERE PersonID < 100000;
Anta at 5% av personene tilfredsstiller betingelsen.
Oppgave 4: Queries med heap og unclustered B+-tre
Anta samme database som i oppgave 3 som lagrer informasjon om personer:
Person(PersonID, FirstName, LastName, Birthyear, DepartmentNo)
Denne gangen er selve personpostene lagret i en heapfil på 1250 blokker. I tillegg har vi et
unclustered B+-tre med LastName som søkenøkkel. På løvnivå her får vi pekere til i
personpostene i heapfilen. Anta at B+-treet har 300 blokker på løvnivå og med 3 nivåer.
Gi et estimat på hvor mange blokker som aksesseres ved følgende SQL-setninger. Skriv en
kort forklaring for hvert svar og skriv eventuelle antagelser du finner det nødvendig å gjøre.
1. SELECT * From Person;
2. SELECT * From Person WHERE PersonID = 195800;
3. SELECT PersonID WHERE LastName = “Søkerud”;
4. SELECT DISTINCT LastName FROM Person;
3
5. INSERT INTO Person(195230, ‘Per’, ‘Persen’, 1971, 185); Du trenger ikke ta hensyn
til at PersonID er en primærnøkkel her. Den blir tatt hånd om av en unclustered hash.
Oppgave 5: Nested-loop-join
Gitt at vi har en tabell Student(Studentnr, Navn, Fødselsår, InstituttID) som skal joines med
Eksamensregistrering(Studentnr, Eksamennr, Dato, Status). Student er lagret med 47 000
poster i 800 blokker og Eksamensregistrering er lagret med 500 000 poster i 12 800 blokker.
Vi ønsker å bruke nested-loop-join, det vil si at vi for hver blokk i den ene tabellen skanner
hele den andre tabellen og ser etter når Studentnr er like.
Hvis vi har 34 blokker tilgjengelig i buffer, hvor mange blokker leses totalt i løpet av joinen?
Oppgave 6: Transaksjoner
a) Nevn to årsaker til hvorfor vi ønsker å ha transaksjoner i utgangspunktet.
b) Forklar kort ACID-egenskapene til transaksjoner.
c) Avgjør recovery-egenskapene (strict, ACA, recoverable, unrecoverable) til følgende
historier:
H1: w1(Y); r2(X); w1(X); w3(Y); r2(Y); c1; c3; c2
H2: r2(X); w2(Y); r1(X); w3(X); c2; r1(Y); r3(Y); w1(X); c3; c1
H3: r2(X); w2(X); r3(X); w1(Y); c1; w3(Y); c3; c2
d) Når er to operasjoner i en historie i konflikt?
e) Undersøk om følgende historie, H4, er konfliktserialiserbar ved å tegne
presedensgrafen til historien.
H4: r1(Y); w3(X); r3(Y); w2(X); r1(X); c1; c2; c3
f) Hva vil det si at vi har en vranglås mellom to eller flere transaksjoner?
g) Vi ønsker å skrive om H4 slik at den gjør bruk av låser. Vis hvordan historien ser ut
med rigorous tofaselåsing. Innfør operasjonene rl1(A), wl1(A) og ul1(A) - det vil si
read_lock1(A), write_lock1(A) og unlock1(A). Husk at leselåser kan deles av flere,
mens skrivelåser er ekslusive. Hvis et element er utilgjengelig når en transaksjon
prøver å låse det, kan man uttrykke låseforsøket med trylock1(A).
4
Oppgave 7: Recovery etter krasj med ARIES
a) Tenk deg at strømmen har gått midt under noen viktige databaseoperasjoner på
dataelementene A og B. Vi er i analysefasen i ARIES og skal finne
vinnertransaksjonene som skal være permanente og senere få REDO, og
tapertransaksjoner som senere skal aborteres (UNDO). Vi starter systemet på nytt og
får opp følgende logg:
LSN Prev_LSN Transaction Operation Page_ID ...
167 End_ckpt
168 0 T1 Update A
169 0 T2 Update B
170 169 T2 Commit
171 168 T1 Update A
172 0 T3 Update B
173 171 T1 Commit
174 172 T3 Update A
Hvilke transaksjoner her er vinnere og tapere? Begrunn svaret.
b) Før vi kan gjennomføre UNDO og REDO må vi lage en transaksjonstabell og en Dirty
Page Table (DPT). Anta at både transaksjonstabellen og DPT er helt tomme i
sjekkpunktet funnet i loggposten med LSN 167. Hvordan ser transaksjonstabellen og
DPT ut etter at analysefasen er ferdig?
(Tips: Transaksjonstabellen skal inneholde transaksjonene med tilstand og
Last_LSN, dvs. nummeret til den nyeste loggposten for transaksjonen. DPT skal
inneholde Page_ID og Recovery_LSN, dvs. nummeret til den eldste loggposten som
først gjorde pagen skitten.)