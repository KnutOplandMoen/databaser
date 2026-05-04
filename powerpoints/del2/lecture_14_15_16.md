Transaksjoner, seksjon 15-18
Svein Erik Bratsberg, IDI/NTNU
Versjon 13.april 2026
2
Innhold • Seksjon 15 og 16 (pensumnotat) – Hvorfor transaksjoner? – Transaksjoner og SQL – Transaksjonsteori • Seksjon 17 – Flerbrukerkontroll (CC) – Korrekthet – Låsing – SNAPSHOT ISOLATION • Seksjon 18 – Logging og recovery – Abortering av transaksjoner – Krasjrecovery
3
Hvorfor transaksjoner?
• Støtter deling og samtidig aksess av data
– Flerbrukerkontroll. READ COMMITTED, SNAPSHOT
ISOLATION, SERIALIZABLE
• Støtter sikker, pålitelig, atomisk aksess til store mengder
data
– Recovery: Rollback og krasjrecovery
4
Databaseoperasjoner
• X – databaseobjekt: post eller blokk
– read(X)
– r(X)
– write(X)
– w(X)
• Tilhørende transaksjon 1
– read1
(X)
– r1
(X)
• Commit1 c1 suksess: avslutting av transaksjon 1
• Abort1 a1 abortering av transaksjon 1
5
Samtidighetsproblemer, eksempel
• To transaksjoner
6
Samtidighetsproblemer (2)
• r1
(A); w1
(A); r2
(A); w2
(A); r2
(B); w2
(B); r1
(B); w1
(B);
7
Samtidighetsproblemer, klasser
• Dirty read
• Dirty write
8
Samtidighetsproblem, klasser (2)
• Example: Dirty write
– w1(buyer=‘Alice’); w2(buyer=‘Bob’); w2(invoice=‘Bob’);
w1(invoice=‘Alice’);
• Unrepeatable read / «read skew»
• Incorrect summery
– En transaksjon beregner en aggregatfunksjon mens en annen
gjør en oppdatering
– Figur 20.3 (c)
9
Incorrect summary
10
Oppgave
• Se på følgende historier:
• H1: r1(A); w1(A); r1(B); w2(A); w2(B); w1(B); c1; c2;
• H2: r1(A); w1(A); r2(A); w2(A); c2; r1(B); a1;
• Hva er problemene for H1 og H2?
– Unrepeatable read
– Dirty read
– Dirty write
11
Hvorfor trenger vi recovery?
• To typer recovery (gjenoppretting)
• En transaksjon ruller tilbake (aborteres)
– Uventet situasjon
– Manglende data
– Brukeren bestemmer det
– Samtidighetskontrollen bestemmer det (CC)
• Systemkrasjrecovery
– Databasesystemet, operativsystemet eller datamaskinen krever
en restart
12
ACID – egenskaper ved en transaksjon
Transaksjon: en gruppering av operasjoner mot databasen
som er
• A – atomiske: enten kjører de fullstendig, eller så kjører
de ikke
• C – consistency: overholder konsistenskrav (primary key,
references, check, osv)
• I – isolation: som er isolert fra hverandre. Merker ikke at
noen kjører samtidig.
• D – durability: er permanente, dvs. mistes ikke etter
commit.
En transaksjon er vanligvis en logisk operasjon eller
oppgave
13
Eksempler på transaksjoner
• En gruppering av operasjoner mot databasen
• Banktransaksjon
• Kjøp av mange varer
• Kjøp en flyreise
• Tegn en polylinje
• Fyll ut et skjema
• Lever en eksamen
• Setter inn poster som har indekselementer som også må
oppdateres
• …..
14
Commit/Abort
• En transaksjon slutter med
• COMMIT: Alt gikk bra og endringene fra transaksjonen
finnes i databasen. Connection.commit();
• ROLLBACK (abort): Transaksjonen rulles tilbake
(aborteres) og ingen endringer fra transaksjonen finnes i
databasen. Connection.rollback();
• Autocommit: Hver SQL-setning er en egen transaksjon.
Kan skrus på. Default av i Python/SQLite3-API. Settes
via isolation_level i connection-objektet.
15
Commit/abort (2)
• SET AUTOCOMMIT=0;
UPDATE Account SET b = b - 1000 WHERE id=123123;
UPDATE Account SET b = b + 1000 WHERE id=234234;
COMMIT;
• Ekt-eksempel RegMålCtrl
INSERT INTO Reg VALUES (1,123123,31,100);
INSERT INTO Reg VALUES (2,123123,32,120);
….
INSERT INTO Reg VALUES (9,123123,175,245);
UPDATE Loper SET status = ‘ok’
WHERE brikkenr=123123;
COMMIT;
16
SQLs isolasjonsnivå
• SET TRANSACTION ISOLATION LEVEL
READ UNCOMMITTED
READ COMMITTED
REPEATBALE READ
SERIALIZABLE (default)
• Mer isolasjon/ «korrekthet» nedover
• Mindre samtidighet nedover
• Egenskaper vi vill unngå:
– Dirty read
– Unrepeatable read
– Unngå fantomer: Hvis T leser en mengde verdier basert på en
søkebetingelse, så vil ikke denne mengden endres av andre før T er
ferdig. Aktuelt ved reskanning (nested loop f.eks)
17
SQLs isolasjonsnivå (2)
18
Quiz 1
• Hvorfor må en transaksjon rulles tilbake?
1. Tabellen er ikke på 1. normalform
2. Samtidighetskontrollen bestemte det
3. Pga. dirty read
4. Brukeren angret seg
• ACID betyr
1. Atomicity, Concurrency, Isolation, Durability
2. Atomicty, Consistency, Isolation, Database
3. Attribute, Consistency, Isolation, Durability
4. Atomicity, Consistency, Isolation, Durability
19
Quiz 2
• Hva er AUTOCOMMIT?
1. Databasen har en konsistent tilstand
2. SQL commiter når loggen er full
3. Hver SQL-setning er en egen transaksjon
4. Du har bestemt deg for bilkjøpet
• Hva er problemet med SERIALIZABLE?
1. Du får mye dirty read
2. Tillater lite samtidighet
3. Svak isolasjon
4. Vanskelig å få til DURABILITY
20
READ COMMITTED
1. Når du leser fra databasen, vil du kun se data som er committed (ingen dirty reads).
2. Når du skriver til databasen, skriver du kun over data som er committed (ingen dirty
writes).
READ COMMITED er default i Oracle, MS SQL Server og PostgresSQL.
To metoder brukes for å støtte dette.
1. Låsing. Transaksjonene setter skriverlåser før de skriver data. Låsene slippes ved
commit. Før de leser et element, så setter transaksjonen leselås, og slipper denne etter
at dataelementet er lest.
2. Snapshot isolation. Mange databaser hindrer dirty reads ved å beholde gamle verdier
for data ved skriving inntil commit av transaksjonen. Read-transaksjoner kan lese den
gamle verdien. Når den nye verdien er committed, kan andre transaksjoner ta den i
bruk. Å ha leselåser vil holde alle writes unna, så det gjør man ikke. Dette kalles også for
multi-version concurrency control.
21
SNAPSHOT ISOLATION
• Snapshot isolation brukes som løsning på “unrepeatable
read” (“read skew”).
• Brukes av PostgreSQL, MySQL/InnoDB, Oracle, SQL
Server, og andre
• Bruker write locks, men reads krever ikke låser
• Lesere blokkerer aldri skrivere, skrivere blokkerer aldri
lesere
• Multiversion concurrency control (MVCC). Lagrer flere
versjoner av oppdaterte rader. En for hver snapshot.
• Mer om dette i TDT4225
22
Transaksjonshistorie
• Historie (schedule)
Liste av aksjoner
read, write, abort, commit
for en mengde transaksjoner
• Fra figur 20.3 a) og b):
Ha
: r1
(X);r2
(X);w1
(X);r1
(Y);w2
(X);w1
(Y);
Hb
: r1
(X);w1
(X);r2
(X);w2
(X);r1
(Y);a1
;
23
Transaksjonshistorie - konflikt
• Konflikt:
To operasjoner fra en historie er i konflikt hvis
• (1) de tilhører forskjellige transaksjoner
• (2) de bruker samme dataelement
• (3) minst en av operasjonene er en write
– Ha
: r1
(X) og w2
(X) er i konflikt
– Ha
: w1
(X) og w2
(X) er i konflikt
– Ha
: r1
(X) og r2
(X) er ikke i konflikt
• To operasjoner er i konflikt hvis endring av rekkefølgen
endrer resultatet på databasen
24
Transaksjoner og gjenopprettbarhet
• Gjenopprettbar historie (recoverable schedule):
Hver transaksjon committer etter at transaksjoner de har
lest fra har committet.
H1
: w2
(A); w1
(B); w1
(A); r2
(B); c1
; c2
;
• Historier som unngår galopperende abort (avoid
cascading abort – ACA):
Når transaksjoner kun kan lese verdier skrevet av
committede transaksjoner.
H1 er ikke ACA.
H2
: w1
(A); w1
(B); w2
(A); c1
; r2
(B); c2
;
25
Historier og gjenopprettbarhet (2)
• Strikt historie:
Når transaksjonene verken kan lese eller skrive ikkecommittede verdier
H3
: w1
(A); r1
(B); w2
(B); c1
; w2
(A); c2
;
• Kan gjøre undo recovery ved before image fra loggen
• Sammenheng:
𝑆𝑡𝑟𝑖𝑘𝑡 ⊂ 𝐴𝐶𝐴 ⊂ 𝐺𝑗𝑒𝑛𝑛𝑜𝑝𝑝𝑟𝑒𝑡𝑡𝑏𝑎𝑟 ⊂ 𝐴𝑙𝑙𝑒 ℎ𝑖𝑠𝑡𝑜𝑟𝑖𝑒𝑟
26
Oppgaver
27
Historier og serialiserbarhet
• Seriell historie
Historie som ikke fletter operasjoner fra forskjellige
transaksjoner. Kjører etter hverandre
• Serialiserbar historie
Historie som har samme effekt på databasen som en
seriell historie (resultatekvivalent)
• Figur 20.5
28
Historier og serialiserbarhet (2)
• Vi ønsker serialiserbare og ikke kreve serielle historier
fordi vi ønsker samtidighet
1. Parallelle tråder
2. Diskaksess – andre tråder kan jobbe så lenge
29
Konfliktserialiserbarhet
• Konflikt mellom to operasjoner
– r1
(A) og w2
(A)
– w1
(A) og r2
(A)
– w1
(A) og w2
(A)
• To historier er konfliktekvivalente hvis de har samme
rekkefølge for operasjoner med konflikt
• En historie er konfliktserialiserbar hvis den er
konfliktekvivalent med en seriell historie
• Konfliktserialiserbarhet impliserer serialiserbarhet, men
ikke nødvendigvis motsatt
• Figur 20.5 c) og d)
30
Konfliktserialiserbarhet
31
Presedensgraf
• Rettet graf
• Noder: transaksjoner i historie H
• Kanter: T1
-> T2
finnes når det finnes en operasjon i T1
som er i konflikt med en operasjon i T2
, og T1s operasjon
skjer før T2s operasjon
• Hvis en presendensgraf ikke har sykler, er historien
konfliktserialiserbar
• H1
: r2
(A); r1
(B); w2
(A); r3
(A); w1
(B); w3
(A); r2
(B); w2
(B);
• H2: r2
(A); r1
(B); w2
(A); r2
(B); r3
(A); w1
(B); w3
(A); w2
(B);
32
Serialiserbarhet ved låsing
• Bruker låser av dataelement (poster eller blokker) for å
garantere konfliktserialiserbarhet
• Låsetyper
– Read_lock (X) (delt lås)
– Write_lock (X) (eksklusiv lås)
• Flere transaksjoner kan ha read_lock (delt lås) på
samme dataelement samtidig.
• Det er også mulig med oppgradering og nedgradering av
låser.
– Read_lock -> Write_lock
– Write_lock -> Read_lock
33
Implementasjon av låser
• Låsetabell i minne
– Postlåser
– Blokklåser
– Tabellåser
– Verdiområdelåser (unngå fantomer)
– Predikatlåser (unngå fantomer)
• Eksempel:
– w2
(B); r1
(A); r2
(A); r1
(B); r3
(B);
34
Låseimplementasjon
• w2
(B); r2
(A); r1
(A); r1
(B); r3
(B);
35
2PL – tofaselåsing (two-phase locking)
• En transaksjon har tofaselåsing hvis alle låseoperasjoner
skjer før alle opplåsingsoperasjoner
T1 T2
Write_lock(X)
Write_lock(X) Read(X)
wait X = X + 1000
wait Write(X)
wait Commit / Unlock(X)
Read(X)
X = X – 100
Write(X)
Commit / Unlock(X)
36
2PL og «incorrect summary»
T1 T2
Write_lock(X) Sum = 0
Read(X) Read_lock(X)
X = X - 100 Wait
Write(X) Wait
Write_lock(Y) Wait
Read(Y) Wait
Y = Y + 100 Wait
Write(Y) Wait
Commit / Unlock (X, Y) Wait
Read(X)
Sum = Sum + X
Read_lock(Y)
Read(Y)
Sum = Sum + Y
Commit/Unlock(X,Y)
37
2PL impliserer serialiserbarhet
38
2PL-modeller
• Tofaselåsing impliserer serialiserbarhet
• Basic 2PL: «Symmetrisk fjell»
• Konservativ 2PL: Låser alt man trenger aller først
• Strict 2PL: Opplåsing av skrivelåser etter commit/abort
• Rigorous 2PL: Opplåsing etter commit/abort
39
Vranglås
• To eller flere transaksjoner venter gjensidig på
hverandres låser
• Kan løses ved forskjellige metoder
– Unngåelse
– Oppdagelse
– Timeout
T1 T2
Read_lock(X) Read_lock(Y)
Write_lock(Y) Write_lock(X)
40
Vranglåsoppdagelse
• Den vanligste løsningen
• Konstruer wait-for-grafen:
– Hver transaksjon er en node
– Hvis Ti venter på en lås holdt av Tj
, får vi en rettet kant Ti
-> Tj
• Vi har vranglås hvis grafen har sykler
• Prøv å abortere en transaksjon og se om sykelen
forsvinner
41
Timeout
• Den enkleste løsningen
• La hver transaksjon ha en timeout.
• Hvis timeouten går, aborter transaksjonen
• Vanskelig å sette timeouten riktig
42
Rigorous 2PL eksempel
• H1
: r1
(A); w2
(A); w2
(B); w3
(B); w1
(B); C1
; C2
; C3
;
• H2
: r1
(A); w2
(B); w2
(A); w3
(B); w1
(B); C1
; C2
; C3
;
• For låsing: Hvis en transaksjon blir blokkert, blir alle operasjoner i
transaksjonen satt på vent, mens de neste operasjonene i historien
blir utført i sekvens.
43
Multiversjons-CC
• CC = Concurrency Control
• Brukes mye i dagens SQL-databaser
• La en leseoperasjon som er i konflikt, lese en gammel
versjon.
• Tradisjonelt basert på tidsstempelordning (timestamp
ordering).
• Men bruker SNAPSHOT ISOLATION i dag
44
SNAPSHOT ISOLATION
• Transaksjon 1 leser gammel versjon av B fordi T1 startet
før T2 comittet.
• Nye transaksjoner, startet etter C2, vil lese de nye
verdiene av A og B.
45
SNAPSHOT ISOLATION (2)
• To måter i praksis
1. Lagrer flere versjoner av poster i databasen og kjører
GC (søppeltømming) når de gamle versjonene ikke
trenges lengre: Microsoft SQL, PostgresSQL, MySQL
InnoDB (consistent reads).
https://dev.mysql.com/doc/refman/8.0/en/innodbconsistent-read.html
2. Lagrer kun siste versjon av posten, men kan konstruere
den forrige versjonen vha. undo: Oracle
46
Recovery
• Databasesystemet støtter sikker, atomisk aksess til store
mengder data
• Transaksjonene er
– A – atomiske: Enten har de kjørt helt, eller overhodet ikke
– C
– I
– D – durability: Er permanente. Etter commit mistes ikke data.
47
Transaksjoner etter krasjrecovery
• Vinnere: T1, T2 og T3 skal være permanente.
• Tapere: T4 og T5. Må aborteres. Hvorfor?
48
Force/steal-klassifisering av Logging &
Recovery-algoritmer
• Utgangspunkt: Hvor fleksibel (uavhengig) er buffer
manager til logging/recovery
– Når kan skitne (dirty) blokker skrives?
– Når må skitne blokker skrives?
• Force: Må en skitten (oppdatert) blokk tvinges til disk
ved commit.
– Tregt: datablokkene kan være spredd over hele disken
• Steal: Kan en transaksjon stjele plassen i bufferet til en
skitten blokk?
– Hvis ikke, må en aktiv transaksjon ha alle skitne blokker i buffer
inntil commit.
49
Force/Steal (2)
No steal Steal
Force Shadowing
(ikke logging)
Undo-logging
No-redo
No-force Redo-logging
No-undo
Undo/redo-logging
Aries
50
Write-ahead logging (WAL)
• Basis for undo/redo-logging
• Hver endring (insert/delete/update) har en loggpost i
loggen.
• Regler:
– Skriv en loggpost som endret en datablokk til disk før du skriver
datablokken (for undoformål)
– Skriv loggen til disk før en transaksjon committer (for redoformål)
«Force log at commit»
51
WAL-konsepter i ARIES
• LSN – loggsekvensnummer. ID for loggpost. Stigende nr.
• PageLSN – LSN til loggpost som sist endret en blokk
Lagret i hver blokk.
• FlushedLSN – LSN til nyeste skrevne loggpost til disk
• Ved skriving av datablokk til disk, sjekk
PageLSN <= FlushedLSN
• Hvis ikke, skriv (flush) logg først.
52
LSN-begreper (log sequence number)
53
Loggpost i ARIES
• PrevLSN: Peker til forrige loggpost i samme transaksjon.
For abortering av transaksjon.
• OpType: Update/insert/delete
• PageId: Hvilken blokk ble endret (BlokkId)
• Offset: Hvor i blokken ble det endret?
• BeforeImage: Verdi før endring
• AfterImage: Verdi etter endring
LSN TransID PrevLSN OpType PageId Offset BeforeImage AfterImage
54
Datastruktur for recovery (ARIES)
• Transaksjonstabell
– Et element per aktiv transaksjon
• TransId
• Tilstand: aktiv, committed, aborting, aborted
• LastLSN: Peker til nyeste loggpost i transaksjonen
– Transaksjonen blir borte når transaksjonen committer
• Dirty page table (DPT)
– Et element per skitten (dirty) blokk i buffer
• PageID
• RecLSN: Peker til eldste loggpost som gjorde blokken skitten
– Elementet blir borte når «disk callback» fra write blir kjørt
55
Sjekkpunkting
• Periodisk lager DBMSet et sjekkpunkt i loggen som skal
minimalisere tiden det tar å gjøre recovery
• Du slipper å skanne hele loggen ved recovery
– Begin checkpoint
• Lag start sjekkpunkt-loggpost
– End checkpoint
• Lag slutte sjekkpunkt-loggpost som inneholder
– Transtabell
– DPT – dirty page table
– Lagre LSN til sjekkpunktloggpost på sikkert sted. Logganker
• I noen systemer er sjekkpunkting koblet til det å skrive skitne
blokker til disk (ikke ARIES)
• Penultimate checkpointing: Skriv data ved sjekkpunkting. Bruk
nest siste sjekkpunkt som startpunkt.
• Fuzzy checkpointing: Tillat samtidige transaksjoner
56
Abortering av transaksjon
• Finn LastLSN fra transaksjonstabellen
• For hver loggpost i transaksjonen (bakover)
– Lag CLR – kompenserende loggpost, som gjør det motsatte av
loggposten (non-CLR)
– Gjør REDO av CLRen
• Fjern transaksjonen fra transaksjonstabellen
• CLRen er grunnlag for låser på radnivå
(mer presise enn låser på blokker)
57
Recovery etter krasj
• Mål:
– Sørge for at vinnertransaksjoner er permanente.
De som har committed før krasj.
– Sørge for at tapertransaksjoner blir borte (aborted).
De som ikke committed før krasj.
• Faser:
1. Analyse: Finn vinnere og tapere. Rekonstruer DPT/TransTab
2. REDO: Redo alle loggposter
3. UNDO: Undo effekten av alle tapertransaksjoner
58
3 faser i Recovery
59
Recovery – eksempel, analyse
60
REDO av loggpost (ARIES)
• Loggposten trenger ikke REDO hvis
1. Den tilhørende blokken ikke er i dirty page table (DPT)
2. Blokken er i DPT, og recLSN er større enn loggpostens LSN
3. Blokkens pageLSN er større enn eller lik loggpostens LSN.
Her må blokken leses inn.
• Ellers redo loggpost:
1. Sett inn / skriv after image inn i blokken.
2. Oppdater blokkens pageLSN til loggpostens LSN
61
Andre recoveryteknikker
• Undo/no-redo: Som ARIES, men kun undo-logging
• No-undo/redo: Som ARIES, men kun redo-logging
• Shadowing: bruker ikke logging, men lager kopier av
data ved oppdatering. Committer transaksjonen ved å
kopiere inn pekere til nye data. Må ha katalog med
pekere til data.
• Skiller mellom update-in-place og shadowing.
62
Quiz 1
• Hva er en teknikk for å sikre Durability?
– Undo logrecord
– PageLSN
– Force
– NO-Force
• Hva er write-ahead logging?
– Loggankeret sikres på disken
– Loggen skrives før data
– Data kopieres til disken for å få loggen liten
– Grupper mange loggposter for stor båndbredde
63
Quiz 2
• Hvorfor har vi Dirty Page Table?
– Vi må vite hvilke blokker som må vaskes
– Spare UNDO
– Spare REDO
– Gjenbruk av pages
• Why shouldn’t we/Luke/Baby-Yoda use the FORCE?
– Loggen blir et hot-spot
– Billigere å skrive logg enn data
– Spar det til Mandalorian season 4
– Cachen blir invalidert