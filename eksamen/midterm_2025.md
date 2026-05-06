INFO: Pensum er noe endret i 2026 -derav er alle eksamener fra 2025 og eldre noe utdatert, men der man ser at oppgavene er relevante kan de brukes som inspirasjon


TDT4145 Midtsemestereksamen 2025
1/23
 Frontpage
Eksamensoppgave i TDT4145 Datamodellering og databasesystemer
Dato: 25. februar 2025
Tid: 14:00-16:00
Faglig kontakt:
Roger Midtstraum, 99572420
Svein Erik Bratsberg, 99539963
Møter i eksamenslokalet:
Ja, 14-16
Hjelpemiddelkode/Tillatte hjelpemidler:
D: Ingen trykte eller håndskrevne hjelpemidler tillatt. Bestemt, enkel kalkulator tillatt.
ANNEN INFORMASJON:
Les oppgavene nøye
Faglig kontaktperson skal kun kontaktes dersom det er direkte feil eller mangler i
oppgavesettet. Henvend deg til en eksamensvakt hvis du mistenker feil og mangler. Noter
spørsmålet ditt på forhånd.
FAGSPESIFIKK INFORMASJON
Ingen håndtegninger:
Denne eksamenen tillater ikke bruk av håndtegninger. Har du likevel fått utdelt skanne-ark, er dette
en feil. Arkene vil ikke bli akseptert for innlevering, og de vil derfor heller ikke sendes til
sensur.
Vekting av oppgavene:
Det er 20 oppgaver som teller 5 % hver.
Kommentaroppgave:
Dersom det er helt nødvendig å gi en melding til sensor har vi lagt til en "kommentaroppgave"
(teller selvsagt ikke) til slutt der du kan forklare det du trenger. Dette kan for eksempel gjelde
antakelser som det var tvingende nødvendig å gjøre. Vær så snill ikke å bruke denne oppgaven til
å legge inn generelle kommentarer på eksamen, det gjør du mye bedre i e-post til faglærer.
Poenggiving:
På hver oppgave vil det bli gitt poeng for riktige svar og trukket poeng for gale svar. Du vil ikke få
mindre enn 0 poeng på en oppgave.
Varslinger:
Eventuelle beskjeder under eksamen (f.eks. ved feil i oppgavesettet), sendes ut via varslinger i
Inspera. Et varsel vil dukke opp som en dialogboks på skjermen. Du kan finne igjen varselet ved å
klikke på bjella øverst til høyre.
TDT4145 Midtsemestereksamen 2025
2/23
Trekk fra/avbrutt eksamen:
Dersom du ønsker å levere blankt/avbryte eksamen, gå til “hamburgermenyen” i øvre høyre
hjørne og velg «Lever blankt». Dette kan ikke angres selv om prøven fremdeles er åpen.
Tilgang til besvarelse:
Etter eksamen finner du besvarelsen din under tidligere prøver i Inspera.
TDT4145 Midtsemestereksamen 2025
3/23
1 Task 1: SQL (5 %)
Vi har denne relasjonsdatabasen (primærnøkler er understreket):
Book(ID, Title, PublYear)
Author(ID, Name, BirthYear, Nationality)
Genre(ID, Title, Description)
WrittenBy(BookID, AuthorID)
-- BookID is a foreign key referencing the Book table
-- AuthorID is a foreign key referencing the Author table
BookGenre(BookID, GenreID)
-- BookID is a foreign key referencing the Book table
-- GenreID is a foreign key referencing the Genre table
Vi gjør spørringen:
select Title, Name, PublYear
from Book inner join WrittenBy on (Book.ID = BookID)
inner join Author on (Author.ID = AuthorID)
where Nationality = 'Danish'
Velg de påstandene som stemmer om denne spørringen.
Velg ett eller flere alternativer
A book title (value) can occur (no: forekomme) in several rows in the result table
None of the other alternatives are correct
All registered values for PublYear are included at least once in the result table.
The result table will be sorted on book title
Books without an author will be part of the result table, having NULL value for the Name
attribute
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
4/23
2 Task 2: Relational Algebra (5 %)
Vi har denne relasjonsdatabasen (primærnøkler er understreket):
Book(ID, Title, PublYear)
Author(ID, Name, BirthYear, Nationality)
Genre(ID, Title, Description)
WrittenBy(BookID, AuthorID)
-- BookID is a foreign key referencing the Book table
-- AuthorID is a foreign key referencing the Author table
BookGenre(BookID, GenreID)
-- BookID is a foreign key referencing the Book table
-- GenreID is a foreign key referencing the Genre table
Vi har SQL spørringen:
select distinct ID, Title
from Book
where ID in (select BookID from WrittenBy)
Hvilke relasjonsalgebra-spørringer vil alltid gi samme resultat som SQL-spørringen?
TDT4145 Midtsemestereksamen 2025
5/23
Velg ett eller flere alternativer
C
E
A
B
None of the other alternatives are correct
D
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
6/23
3 Task 3: Data Models (5 %)
Bruk datamodellen:
Det er 10 entiteter i B.
Hva er da det minste antallet entiteter som kan finnes i A?
Mitt svar: .
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
7/23
4 Task 4: Data Models (5 %)
Bruk datamodellen:
Det er 10 entiteter i A, 20 entiteter i B og 30 entiteter i C.
Hva er det maksimale antallet relasjoner som kan finnes i R?
Mitt svar: .
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
8/23
5 Task 5: Normalization (5 %)
Vi har R(A, B, C, D) og F = { B -> AD; C -> B }.
Hvilke alternativ er kandidatnøkler (eng: candidate keys) i R?
Velg ett eller flere alternativer
None of the other alternatives are candidate keys
ABCD
B
BC
C
Maks poeng: 5
6 Task 6: Normalization (5 %)
Vi har R(A, B, C, D) og F = { B -> AD; C -> B }. Vi ønsker å splitte opp R i deltabeller.
Hvilke alternativ har tapsløst-join egenskapen (eng: lossless join property)?
Velg ett eller flere alternativer
R1(A,B,C) og R2(B,D)
R1(A,B,D) og R2(C)
R1(A,B,D) og R2(B,C)
R1(A,B), R2(B,D) og R3(C,B)
None of the other alternatives have the lossless join property
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
9/23
7 Task 7: Data Models (5 %)
Vi har ER-modellen:
Når vi oversetter denne til relasjonsdatabase får vi tabellene (primærnøkler er understreket):
Person(PersonID, Name)
Qualification(QualificationTitle, PersonID), der PersonID er en fremmednøkkel som refererer til
Person-tabellen.
Anta at flere personer kan ha en QualificationTitle, for eksempel "Engineer". Hva vil være
primærnøkkel i Qualification-tabellen?
Velg ett eller flere alternativer
(QualificationTitle, PersonID)
PersonID
None of the other alternatives are correct
QualificationTitle
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
10/23
8 Task 8: SQL (5 %)
Vi har denne relasjonsdatabasen (primærnøkler er understreket):
Book(ID, Title, PublYear)
Author(ID, Name, BirthYear, Nationality)
Genre(ID, Title, Description)
WrittenBy(BookID, AuthorID)
-- BookID is a foreign key referencing the Book table
-- AuthorID is a foreign key referencing the Author table
BookGenre(BookID, GenreID)
-- BookID is a foreign key referencing the Book table
-- GenreID is a foreign key referencing the Genre table
Vi gjør spørringen:
select Genre.ID, Genre.Title, count(Book.Title)
from Book inner join BookGenre on (Book.ID = BookGenre.BookID)
inner join Genre on (Genre.ID = BookGenre.GenreID)
group by Genre.ID, Genre.Title
Velg de alternativene som stemmer for denne spørringen som finner Genre.ID, Genre.Title og
<alternativ>.
Velg ett eller flere alternativer
Number of book titles
Number of genre IDs and genre titles
Number of book titles per genre
None of the other alternatives are correct
Number of unique book titles per genre
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
11/23
9 Task 9: Normalization (5 %)
Vi har en tabell, R, der det finnes en triviell funksjonell avhengighet (eng: trivial functional
dependency), X -> Y.
Hva stemmer om denne trivielle funksjonelle avhengigheten?
Velg ett eller flere alternativer
Y is a subset of X
None of the other alternatives are correct
Every possible instance (no: forekomst) of R will satisfy this constraint
X is a subset of Y
The attributes in X plus the attributes in Y are all attributes in R (X union Y = R)
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
12/23
10 Task 10: SQL (5 %)
Vi har denne relasjonsdatabasen (primærnøkler er understreket):
Book(ID, Title, PublYear)
Author(ID, Name, BirthYear, Nationality)
Genre(ID, Title, Description)
WrittenBy(BookID, AuthorID)
-- BookID is a foreign key referencing the Book table
-- AuthorID is a foreign key referencing the Author table
BookGenre(BookID, GenreID)
-- BookID is a foreign key referencing the Book table
-- GenreID is a foreign key referencing the Genre table
Vi ønsker å finne alle boktitler med utgivelsesår, for bøker skrevet av forfattere som heter Knut
Hamsun. Vi bruker denne SQL-spørringen:
Vi har fire forslag på innhold i R og S
TDT4145 Midtsemestereksamen 2025
13/23
Velg de alternativene som vil lage en spørring som oppfyller intensjonen.
Velg ett eller flere alternativer
B
D
None of the other alternatives are correct
A
C
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
14/23
11 Task 11: Relational Algebra (5 %)
Vi har denne relasjonsdatabasen (primærnøkler er understreket):
Book(ID, Title, PublYear)
Author(ID, Name, BirthYear, Nationality)
Genre(ID, Title, Description)
WrittenBy(BookID, AuthorID)
-- BookID is a foreign key referencing the Book table
-- AuthorID is a foreign key referencing the Author table
BookGenre(BookID, GenreID)
-- BookID is a foreign key referencing the Book table
-- GenreID is a foreign key referencing the Genre table
Vi ønsker å finne ID og tittel for bøker som ikke har registrert noen sjanger (eng: genre). Velg de
alternativene som vil finne dette.
Hint: BookID IS NULL sjekker om BookID har NULL-verdien. Minusoperatoren virker slik at
operandtabellen til høyre (som kommer fra BookGenre) trekkes fra operandtabellen til venstre
TDT4145 Midtsemestereksamen 2025
15/23
(som kommer fra Book).
Velg ett eller flere alternativer
None of the other alternatives are correct
D
B
A
C
Maks poeng: 5
12 Task 12: Normalization (5 %)
Vi har R(A, B, C, D) og F = { AB->>CD }. Anta at første normalform (1NF) er oppfylt.
Velg den høyeste normalformen som oppfylles av R.
Velg ett alternativ:
Second normal form (2NF)
Boyce-Codd normal form (BCNF)
First normal form (1NF)
Fourth normal form (4NF)
Third normal form (3NF)
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
16/23
13 Task 13: Relational Algebra (5 %)
Vi har følgende tabeller med innhold:
Vi utfører følgende relasjonsalgebra-spørring:
Hvor mange rader vil det være i resultat-tabellen?
Mitt svar: .
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
17/23
14 Task 14: SQL (5 %)
Vi har følgende tabeller med innhold:
Vi utfører denne SQL-spørringen:
select R.A, sum(S.B), sum(S.C), sum(T.D)
from R natural join S natural join T
group by R.A
having (sum(S.B) > 0) and (sum(S.C) > 0) and (sum(T.D) > 0)
order by sum(S.B) DESC, sum(S.C) DESC, sum(T.D) DESC
Hvor mange rader vil det være i resultat-tabellen?
Mitt svar: .
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
18/23
15 Task 15: Normalization (5 %)
Vi har R(A, B, C, D, E) og F = { BC->D; DE->AB }. En gyldig tabellforekomst av R har følgende
fem rader:
Hvilke verdier kan X og Y ha?
Velg ett eller flere alternativer
X can have any value except 1 and 3
Y can have any value except 1, 2, 3 and 4.
Y can have any value except 3
None of the other alternatives are correct
X must be 3
Y can have any value except 2 and 3
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
19/23
16 Task 16: Data Models (5 %)
Vi har denne datamodellen der vi har utelatt attributter og relasjonsklasser:
Hvilke påstander er riktige for denne modellen?
Velg ett eller flere alternativer
None of the other alternatives are correct
All entities in A or B is also in S
An entity in S is also in A or B but can not be in both A and B at the same time
An entity in S can also be in A or B but it is not mandatory (no: obligatorisk) to be in any of
them
An entity in A can have more attributes than an entity in S
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
20/23
17 Task 17: Relational Databases (5 %)
Velg de alternativene som stemmer om fremmednøkler (eng: foreign keys).
Velg ett eller flere alternativer
None of the other alternatives are correct
A foreign key will always be an alternative key for the table where it is defined
A table can have several foreign keys referencing the same (target) table
A foreign key can reference a row in the same table as it is defined
A foreign key which consist of two or more attributes can have NULL values for a proper
subset of the attributes as long as the remaining attributes do not have NULL value
Maks poeng: 5
18 18: Keys (5 %)
Velg de påstandene som stemmer om nøkler.
Velg ett eller flere alternativer
The candidate keys (in a table) will always have the same number of attributes
A candidate key can contain another candidate key
None of the other alternatives are correct
All superkeys (no: supernøkler) contain at least one candidate key (no: kandidatnøkkel)
All supekeys in a table will have the same closure (no: tillukning)
There will always be several superkeys in a table
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
21/23
19 Task 19: Data Models (5 %)
Vi har denne datamodellen:
Forekomsten (eng: the instance) av relasjonsklassen R består av { (1,1,1,2), (2,2,2,2), (3,2,3,3),
(4,4,3,3) } der (i,j,k,l) er et 4-tuppel som representerer en relasjon der i refererer til en A-entitet, j
refererer til en B-entitet, k refererer til en C-entitet og l refererer til en D-entitet.
Gitt restriksjonene som er spesifisert i ER-modellen (diagrammet). Hvilke av disse tupplene
(relasjonene) kan legges til som nytt (femte) element i forekomsten av R? For hvert av
alternativene skal du altså vurdere om relasjonen i alternativet kan legges til i forekomsten av R
som oppgitt over.
Velg ett eller flere alternativer
(2,3,2,3)
(1,3,5,2)
None of the other alternatives can be added to the instance
(1,2,2,2)
(2,4,1,4)
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
22/23
20 Task 20: Data Models (5 %)
Bruk denne datamodellen:
Velg de påstandene som stemmer for denne modellen.
Velg ett eller flere alternativer
All readers must have read at least one book
A book can have several titles
Readers have unique names (no two readers with same name)
A reader must have read the books he/she gives a rating
None of the other alternatives are correct
A reader can have several ratings of the same book
Maks poeng: 5
TDT4145 Midtsemestereksamen 2025
23/23
21 Task 21: Comments (0 %)
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