TDT4145: Kont av midtsemester 2024
1/14
 Frontpage
Institutt for datateknologi og informatikk
Eksamensoppgave i TDT4145 Datamodellering og databasesystemer
Eksamensdato: 13. august 2024
Eksamenstid (fra-til): 09:00 - 11:00
Hjelpemiddelkode/Tillatte hjelpemidler:
D: Ingen trykte eller håndskrevne hjelpemidler tillatt. Bestemt, enkel kalkulator tillatt.
Faglig kontakt under eksamen:
Roger Midtstraum, Tlf. 995 72 420
Faglig kontakt møter i eksamenslokalet:
Ja, fra 9 - 11.
ANNEN INFORMASJON:
Skaff deg overblikk over oppgavesettet før du begynner på besvarelsen din.
Les oppgavene nøye, gjør dine egne antagelser og presiser i besvarelsen hvilke forutsetninger du
har lagt til grunn i tolkning/avgrensing av oppgaven. Faglig kontaktperson skal kun kontaktes
dersom det er direkte feil eller mangler i oppgavesettet. Henvend deg til en eksamensvakt hvis du
ønsker å kontakte faglærer. Noter gjerne spørsmålet ditt på forhånd.
Kommentaroppgave: Dersom det er helt nødvendig å gi en melding til sensor har vi lagt til en
"kommentaroppgave" (teller selvsagt ikke) til slutt der du kan forklare det du trenger. Vær så snill
ikke å bruke denne oppgave til å legge inn generelle kommentarer på eksamen, det gjør du mye
bedre i e-post til faglærer.
Håndtegninger: I oppgave 1 er det lagt opp til å besvare på ark. Andre oppgaver skal besvares
direkte i Inspera. Nederst i oppgaven finner du en sjusifret kode. Fyll inn denne koden øverst til
venstre på arkene du ønsker å levere. Det anbefales å gjøre dette underveis i eksamen. Dersom
du behøver tilgang til kodene etter at eksamenstiden har utløpt, må du klikke «Vis besvarelse».
Vekting av oppgavene: Vektingen av hver oppgave er angitt i overskriften til oppgaven.
Varslinger: Hvis det oppstår behov for å gi beskjeder til kandidatene underveis i eksamen (f.eks.
ved feil i oppgavesettet), vil dette bli gjort via varslinger i Inspera. Et varsel vil dukke opp som en
dialogboks på skjermen. Du kan finne igjen varselet ved å klikke på bjella øverst til høyre.
Trekk fra/avbrutt eksamen: Blir du syk under eksamen, eller av andre grunner ønsker å levere
blankt/avbryte eksamen, gå til “hamburgermenyen” i øvre høyre hjørne og velg «Lever blankt».
Dette kan ikke angres selv om prøven fremdeles er åpen.
Tilgang til besvarelse: Etter eksamen finner du besvarelsen din i arkivet i Inspera. Merk at det
kan ta én virkedag før eventuelle håndtegninger vil være tilgjengelige i arkivet.
TDT4145: Kont av midtsemester 2024
2/14
1 Problem 1: Relational Algebra (5 %)
Bruk denne databasen om arrangører av olympiske leker (primærnøkler er understreket):
ol(id, aar, arrbyID, type)
-- arrbyID er fremmednøkkel mot arrby-tabellen, kan ikke ha NULL-verdi
-- type kan ha verdien "sommerOL" eller verdien "vinterOL"
arrby(byID, navn, landkode)
-- landkode er fremmednøkkel mot land-tabellen, kan ikke ha NULL-verdi
land(landkode, navn, vdelkode)
-- vdelkode er fremmednøkkel mot verdensdel-tabellen, kan ikke ha NULL-verdi
verdensdel(vdelkode, navn)
Lag en relasjonsalgebra-spørring som finner id, aar og type for alle olympiske leker som har blitt
arrangert i Paris i Frankrike. Du kan anta at Frankrike har landkode "FR" og at det finnes bare en
by som heter Paris i Frankrike.
Vi foretrekker svar i graf-format som du tegner på eget ark.
Skriv ditt svar her
Format 
 Σ 
Words: 0
TDT4145: Kont av midtsemester 2024
3/14
Maks poeng: 5
TDT4145: Kont av midtsemester 2024
4/14
2 Problem 2: SQL (10 %)
Bruk denne databasen om arrangører av olympiske leker (primærnøkler er understreket):
ol(id, aar, arrbyID, type)
-- arrbyID er fremmednøkkel mot arrby-tabellen, kan ikke ha NULL-verdi
-- type kan ha verdien "sommer-OL" eller verdien "vinter-OL"
arrby(byID, navn, landkode)
-- landkode er fremmednøkkel mot land-tabellen, kan ikke ha NULL-verdi
land(landkode, navn, vdelkode)
-- vdelkode er fremmednøkkel mot verdensdel-tabellen, kan ikke ha NULL-verdi
verdensdel(vdelkode, navn)
Lag en SQL-spørring som finner byID, navn og aar for alle byer som har arrangert vinter-OL.
Resultat-tabellen skal være sortert på aar i stigende orden.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 10
TDT4145: Kont av midtsemester 2024
5/14
3 Problem 3: SQL (10 %)
Bruk denne databasen om arrangører av olympiske leker (primærnøkler er understreket):
ol(id, aar, arrbyID, type)
-- arrbyID er fremmednøkkel mot arrby-tabellen, kan ikke ha NULL-verdi
-- type kan ha verdien "sommerOL" eller verdien "vinterOL"
arrby(byID, navn, landkode)
-- landkode er fremmednøkkel mot land-tabellen, kan ikke ha NULL-verdi
land(landkode, navn, vdelkode)
-- vdelkode er fremmednøkkel mot verdensdel-tabellen, kan ikke ha NULL-verdi
verdensdel(vdelkode, navn)
Lag en SQL-spørring som finner landkode og navn på alle land som har arrangert sommer-OL,
men ikke vinter-OL.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 10
TDT4145: Kont av midtsemester 2024
6/14
4 Problem 4: SQL (10 %)
Bruk denne databasen om arrangører av olympiske leker (primærnøkler er understreket):
ol(id, aar, arrbyID, type)
-- arrbyID er fremmednøkkel mot arrby-tabellen, kan ikke ha NULL-verdi
-- type kan ha verdien "sommerOL" eller verdien "vinterOL"
arrby(byID, navn, landkode)
-- landkode er fremmednøkkel mot land-tabellen, kan ikke ha NULL-verdi
land(landkode, navn, vdelkode)
-- vdelkode er fremmednøkkel mot verdensdel-tabellen, kan ikke ha NULL-verdi
verdensdel(vdelkode, navn)
Lag en SQL-spørring som for hver verdensdel som har arrangert OL, finner antall OL (skiller ikke
mellom sommer-OL og vinter-OL). Resultat-tabellen skal bestå av vdelkode, navn på
verdensdelen og antall OL.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 10
TDT4145: Kont av midtsemester 2024
7/14
5 Problem 5: Normalization (5 %)
Bruk tabellen (primærnøkkel er understreket):
arrby(byID, navn, landkode), som beskrevet i oppgave 1-4.
Vil den funksjonelle avhengigheten byID -> navn gjelde? Du må begrunne svaret.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 5
TDT4145: Kont av midtsemester 2024
8/14
6 Problem 6: Normalization (5 %)
Bruk tabellen (primærnøkkel er understreket):
arrby(byID, navn, landkode), som brukt i oppgave 1-4.
Hvilke forutsetninger må man gjøre (om miniverdenen) for at den funksjonelle avhengigheten
landkode -> navn skal gjelde? Du må begrunne svaret ditt.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 5
TDT4145: Kont av midtsemester 2024
9/14
7 Problem 7: Normalization (10 %)
Bruk tabellen (primærnøkkel er understreket):
eksamen(emneID, studentNr, dato, poeng, karakter)
Vi har disse funksjonelle avhengighetene:
emneID, studentNr -> dato, poeng, karakter
poeng -> karakter
Forutsett at eksamen-tabellen er på første normalform (1NF). Bestem den høyeste normalformen
som er oppfyllt av eksamen-tabellen. Du må begrunne svaret.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 10
TDT4145: Kont av midtsemester 2024
10/14
8 Problem 8: Normalization (15 %)
Bruk tabellen (primærnøkkel er understreket):
person(pnr, navn, alder, klasse, klubbID, klubbNavn)
Vi vet at:
person-tabellen er på første normalform (1NF)
pnr er primærnøkkel
alder -> klasse
klubbID -> klubbNavn
Dekomponer person-tabellen, slik at alle deltabeller er på Boyce-Codd normalform (BCNF), og
dekomponeringen har attributtbevaring, bevaring av funksjonelle avhengigheter og tapsløst-joinegenskapen. Du må begrunne at svaret ditt er riktig.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 15
TDT4145: Kont av midtsemester 2024
11/14
9 Problem 9: Data Models (10 %)
Bruk denne ER-modellen:
Hvilke påstander stemmer om denne modellen?
Velg ett eller flere alternativer
En lærebok kan være pensum i flere emner
Det kan finnes emner uten faglærer
Alle emner må ha pensum
Ulike faglærere kan bruke forskjellige lærebøker i samme emne
En faglærer kan bruke samme lærebok i flere emner
Ingen av de andre alternativene er riktige
Maks poeng: 10
TDT4145: Kont av midtsemester 2024
12/14
10 Problem 10: Data Models 20 %)
Bruk denne datamodellen:
Oversett EER-modellen til en mest mulig ekvivalent relasjonsdatabase-modell. Gjør rede for
eventuelle antakelser. Diskuter alternative løsninger hvis det finnes slike, og forklar hvorfor du
valgte bort disse.
Skriv ditt svar her
Format 
 Σ 
TDT4145: Kont av midtsemester 2024
13/14
Words: 0
Maks poeng: 20
TDT4145: Kont av midtsemester 2024
14/14
11 Comments (0 %)
Denne "oppgaven" er en mulighet for å informere om omstendigheter som du tenker er helt
nødvendige å kommunisere til sensor, for at din besvarelse skal bli riktig vurdert. Dette kan for
eksempel gjelde antakelser som det var tvingende nødvendig å gjøre.
Du skal ikke bruke dette feltet til å gi generelle kommentarer til eksamen, det kan gjøres i Piazza
eller i e-post til faglærer.
Skriv ditt svar her
Format 
 Σ 
Words: 0
Maks poeng: 0