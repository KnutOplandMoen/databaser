TDT4145 Datamodellering og databasesystemer
Queryprosessering
a) Antall blokker er 1 TB (filstørrelse)/ 32 KB (blokkstørrelse) = 33 554 432 når man antar at alle
enheter (Terra, Giga, Mega, Kilo) er 1024.
Antall blokker i minne samtidig: nB = 1 GB / 32 KB = 32768
Antall delfiler: nR = 1TB/1GB = 1024.
Hvor mange pass får vi: Vi kan bruke definisjonen fra Elmasri&Navathe hvor vi bruker dM =
min(nR, (nB - 1)). Avrundet oppover(log1024 (1024)) = 1. Vi får da antall I/Oer 2*33554432 (les
og skriv hver blokk under sortering) +1*2*33554432(les og skriv hver blokk under fletting,
men kun ett pass) = 4*33554432 =134217728 .
b) Her får vi i gjennomsnitt 1000 I/Oer da posten kan finnes et vilkårlig sted i heapfila. Ei heapfil er
en samling med blokker hvor postene ikke er sortert på noen måte. I gjennomsnitt vil posten
befinne seg halvvegs ut i fila. Derfor kun 1000. Da har vi antatt at AnsattID er unik og nøkkel til
posten.
c) Her må vi regne ut høyden på B+-treet. Vi får ca. 3000 blokker på løvnivå (nivå 0) i B+-treet,
fordi B+-treet trenger 50% mer plass enn heapfila (B+-treets blokker har gjennomsnittlig 67%
fyllgrad). Vi har da 67 poster per blokk på nivå 0. Vi trenger 3000 pekere (og indeksposter) på
nivå 1 fordi det er 3000 blokker på nivå 0. Vi får plass til ca. 335 poster per blokk på nivå 1 fordi
det er plass til 5 ganger så mange poster per blokk her enn på løvnivå., dermed må vi ha 9
blokker på nivå 1, og ei blokk på nivå 2, dvs. rotblokk. Rotblokka har 9 poster. Dermed får vi tre
blokkaksesser for direktesøket på ansattId. De aller fleste B+-trær har 3 eller 4 nivåer
d) Her får vi 2000 I/Oer da alle blokkene i heapfila må leses. Poster i heapfila er ikke sortert på
noe felt og da må alle blokkene leses.
e) Her er det et nytt B+-tre med søkenøkkel etternavn. Vi må egentlig på nytt regne ut høyden på
B+-treet, som sannsynligvis ville bli 3 eller 4 slik som alle B+-trær er i praksis. Da får vi en
traversering ned til ‘Hansen’, dvs. 3 blokkaksesser. Så aksesseres ca. 10% av nivå 0-blokkene
"sidevegs", dvs. 299 blokker (hvis vi regner bort den vi leste nedover). Vi får totalt ca. 302
blokker. Med B+-treet organisert med søkenøkkel ansattId, ville vi fått traversering av hele
nederste nivå i B+-treet, dvs. 3 + 2999, dvs. 3002. Generelt kan vi ha 2+3000 eller 3+2999 hvis
vi antar 3 nivåer og at du ikke trenger å lese første løvblokka både på vei nedover og bortover …
f) Hvis vi gjør bruk av indeksen, får vi ca. 20000 poster som kvalifiserer og hver av dem gir en
blokkaksess når blokka hentes fra heapfila. I tillegg må B+-tre-indeksen traverseres. Her vil vi ha
ca. 1200 blokker på nivå 0 (40% av de 3000 blokkene fra c). På nivå 1 får vi 1200 pekere. Hvor
mange poster vi får plass til i hver blokk her krever litt tenking. I c) vil hver post på level>0 være
(AnsattId, BlockId). Her vil en post på level>0 være (EtterNavn, BlockId). Altså kun litt mindre
enn en post på level=0, men større enn i c). Hver blokk på level=0 her har plass til 167 poster
(2,5 ganger mer enn ei nivå-0-blokk fra c). Hvis vi antar plass til 167 poster for hver blokk på
level=1, får vi 8 blokker på nivå 1 og ei blokk på nivå 2. Da har vi to blokker for
nedovertraverseringen og 120 blokker for bortovertraversering. Til sammen har vi inntil 20120
blokkaksesser. Da er det bedre å skanne heapfila som totalt gir 2000 aksesser.
g) Her kan du bruke 10 av blokkene i bufferet til Department og 1 til Employee og 1 til resultat. Da
får vi totalt 10+2000 blokkaksesser på å lese data, dvs. vi har hele Department i buffer og
skanner gjennom Employee med ei og ei blokk om gangen. I tillegg får vi I/O på å skrive ut
resultatblokkene også.
h) For å få til dette må Employee gjennomgås to ganger, da må buffer være liten nok til at
Department må leses i to runder. Dvs. 11 buffer.
i) Veldig lite kan forbedres. Hvis det hadde vært en clustered indeks på dname, kunne vi hentet ut
kun de få blokkene som inneholder ‘Accounting’, og spart oss noen få I/Oer.
Svein Erik Bratsberg, 10/4-2025