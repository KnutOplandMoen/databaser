Q1.1 Relational Operators (5%)
Hvilken av de følgende er ikke en basis/fundamental operator i relasjonsalgebraen?

Velg ett alternativ:


Set intersection.

Set union.

No other alternative is correct.

Selection.

Projection.
 

Oppgave2
Oppgave 2Q1.2 Keys (5%)
Den minimale mengden av en supernøkkel (superkey) kalles for:

Velg ett alternativ:


Minimal subkey.

No other alternative is correct.

Candidate key.

Primary key.

Discriminator.
 

Oppgave3
Oppgave 3Q1.3 Join Types (5%)
Velg alle utsagn fra det følgende som er sanne (true).

Velg ett eller flere alternativer


The order in which inner joins are written does not affect the result of a query.

A full outer join always results in tuples that contain null values.

The size of the result of a left outer join is always equal to the size of the left relation.

Every natural join operation can be replaced by a combination of the cross product and the selection operator.

The result size of a full outer join is always smaller than that of the cross product.
 

Oppgave4
Oppgave 4Q1.4 RA Result (5%)
Følgende tabeller er gitt:

employee
name	salary	manager
Alice	40000	John
Trevor	38000	John
Bob	35000	Trevor
Jim	35000	Trevor
Dorothy	36000	Trevor
person
f_name	salary	city
Siobhan	40000	Trondheim
Marine	35000	Zurich
Yiyu	35000	Athens
 

Hvor mangle tupler vil det følgende algebrauttrykket returnere?


 

Skriv svaret ditt her: 1 .

Oppgave5
Oppgave 5Q1.5 SQL Query Result 1 (5%)
Den følgende tabellen er gitt:

employee
name	salary	manager
John	50000	NULL
Alice	40000	John
Trevor	38000	John
Bob	35000	Trevor
Jim	35000	Trevor
Dorothy	36000	Trevor
Samuel	36000	Alice
 

Hva er resultatet av det følgende SQL-query?

SELECT count(*)
FROM employee AS a, employee AS b
WHERE a.salary < 40000

 

Skriv svaret ditt her:  35 .

Oppgave6
Oppgave 6Q1.6 SQL Query Result 2 (5%)
Den følgende tabellen er gitt:

employee
name	salary	manager
John	50000	NULL
Alice	40000	John
Trevor	38000	John
Bob	35000	Trevor
Jim	35000	Trevor
Dorothy	36000	Trevor
Samuel	36000	Alice
 

Hva er resultatet av det følgende SQL-query?

SELECT b.salary
FROM employee AS a JOIN employee AS b ON (a.manager = b.name)
WHERE a.salary < 36000
ORDER BY b.salary
LIMIT 1

Skriv svaret ditt her: 38000 .

Oppgave7
Oppgave 7Q1.7 SQL and Relational Algebra (5%)
Det følgende skjema er gitt:


hvor serves.bar_id refererer bar.bar_id og serves.drink_id refererer drink.drink_id. Hvilken av de følgende relasjonslagebra-uttrykkene er ekvivalent med det følgende SQL-query?

SELECT bar.name, drink.name
FROM bar, serves, drink
WHERE bar.bar_id = serves.bar_id
AND drink.drink_id = serves.drink_id

AND price > 20

 

Velg ett alternativ:






 

Oppgave8
Oppgave 8Q1.8 Terminology (5%)
Hvilken term matcher best den følgende beskrivelsen?

"A relation that is not part of the conceptual model but is made visible to a user as a 'virtual relation'"

Velg ett alternativ:


Domain.

No other alternative is correct.

Decomposition.

View.

Assertion.
 

Oppgave9
Oppgave 9Q1.9 SQL Query Processing (5%)
Når et SQL-query (uten nøstede subqueries) prosesseres, hvilken av de følgende uttrykkene utføres til slutt?

Velg ett alternativ:


WHERE.

SELECT.

GROUP BY.

FROM.

HAVING.
 

Oppgave10
Oppgave 10Q1.10 Transactions (5%)
ACID er en mengde egenskaper som gjør at databasetransaksjoner utføres pålitelig selv under feil eller samtidig (concurrent) aksess. Disse egenskapene er Atomicity, Consistency, Isolation(Isolation, Indexing, Integrity, Irreversibility) , og Durability.

Oppgave11
Oppgave 11Q1.11 Foreign keys (5%)
Se på tabellen T som har blitt skapt med den følgende SQL-koden:

CREATE TABLE T (
    tid varchar(20),
    attr integer,
    PRIMARY KEY (tid)
)

Du prøver så å skape en ny tabell ved å kjøre den følgende SQL-koden:

CREATE TABLE RT (
    tid varchar(20),
    attr varchar(20),
    PRIMARY KEY (tid),
    FOREIGN KEY (attr) REFERENCES T
)

Hvilken av de følgende setningene er sann (true)?

 

Velg ett alternativ:


The query fails because no attribute was given in the foreign key definition.

The query is executed successfully; RT.attr of table RT references T.attr.

No other alternative is correct.

The query fails because T.attr and RT.attr have different domains.

The query is executed successfully; RT.attr references T.tid.
 

Oppgave12
Oppgave 12Q1.12 ER to Relations (5%)
Se på følgende ER-diagram:

Bakgrunnsbilde

Hva er minimum antall relasjoner (tabeller) som trengs for å mappe dette ER-diagrammet til relasjonsmodellen?  

Velg ett alternativ:


No other alternative is correct.

The ER diagram cannot be mapped to relations.

2.

3.

1.
Oppgave13
Oppgave 13Q1.13 Constraints in ER (5%)
Se på følgende ER-diagram:

Bakgrunnsbilde

Basert på dette diagrammet, velg alle utsagn fra de følgende som er sanne (true).

Velg ett eller flere alternativer


A person can review multiple movies; a movie can be reviewed by multiple people.

Each movie must have at least 1 review.

A person cannot submit two separate reviews for the same movie.

Each movie can be reviewed by at most one person.

No two reviews can have the same review text.
 

Oppgave14
Oppgave 14Q1.14 Normal Forms (5%)
Alle relasjoner som er på BCNF, er også på:

Velg ett alternativ:


Second normal form.

First, second, and third normal form.

First normal form.

None of the other alternatives.

Third normal form.
 

Oppgave15
Oppgave 15Q2.1 - SQL DDL (10%)
Vi har oppgitt det følgende relasjonsskjemaet:



 

Skriv SQL-koden som lager tabellen 'question' slik at:

quiz_id og quest_num er av typen integer.
quest_max_points er av numeric-typen med maksimalt 2 siffer (digits) og ingen desimaler.
quest_text er av typen varchar(100) . 
De underlinjede attributtene er primarnøkler (primary  keys).
quiz_id er en fremmednøkkel  (foreign key) som refererer attributtet med samme navn i tabellen 'quiz'.
quest_text- og quest_max_points-attributtene kan ikke være NULL.
Verdien til max_points-attributtet skal være innen [0,20].
 

Skriv ditt svar her


 

Oppgave16
Oppgave 16Q2.2 SQL Query 1 (5%)
Vi har oppgitt det følgende relasjonsskjemaet:



 

Skriv et SQL-query som finner alle quiz hvor summen av maksimum poeng av alle spørsmålene (questions) overskrider quiz_max_points til det samme quizet. Skriv ut quiz_id for alle slike  quizer.

Skriv ditt svar her


 

Oppgave17
Oppgave 17Q2.3 SQL Query 2 (5%)
Vi har oppgitt det følgende relasjonsskjemaet:



 

Skriv et SQL-query som beregner den totale  poengsummen per quiz oppnådd av studenten med sid=12345, for quiz hvor tittelen inneholder ordet 'databases'. Skiv ut quiz_id og den totale  poengsummen oppnådd for dette quizet. 

Skriv ditt svar her


 

Oppgave18
Oppgave 18Q2.4 SQL Query 3 (5%)
Vi har oppgitt det følgende relasjonsskjemaet:



 

Skriv et SQL-query som skriver ut for quiz med quiz_id=4325  alle quest_text for spørsmål (questions) som har blitt svart for av minst en student. Ikke bruk aggregeringsfunksjoner i svaret ditt.

Skriv ditt svar her


 

Oppgave19
Oppgave 19Q2.5 SQL Query 4 (5%)
Vi har oppgitt det følgende relasjonsskjemaet:



 

Vi har også oppgitt det følgende  SQL-queryet:

SELECT first_name, last_name
FROM student
WHERE sid IN (
    SELECT sid
    FROM answer
    WHERE quiz_id = 4326
    AND question_num = 7
    AND points_gained > 10
)

Skriv et ekvivalent SQL-query til det over uten å bruke nøstede (nested) queries.

Skriv ditt svar her
