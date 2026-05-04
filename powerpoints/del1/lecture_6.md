January 27, 2026
Lecture 6: SQL Part 4/4
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Announcement Regarding Midterm
• Part 1: questions that have predefined or short answers (60-75%)
• Multiple choice questions
• Multiple response questions
• Numerical/Text entry questions
• True/False
• Inline choice
• Part 2: questions that require writing relations or SQL (25-40%)
• Description of an ER that you need to translate into a relational schema
• A relational schema that you need to alter
• Description of a query you need to write in SQL
– You may be asked to rewrite an SQL query, e.g., use joins instead of a nested query
– You may be asked to write an SQL query equivalent to an RA expression
3
How to Prepare
• Slides are NOT THE course material
– It is not enough to study from the slides
– The slides have been created to support the lecture, so they do not
contain details about most of the presented topics
• The book chapters indicated at the beginning of each lecture
cover all the course material
– Note that not everything in the book has been covered in the lectures -
such things are not in the course material
• Training and book exercises can help you practice
– Especially when it comes to query writing
4
Outline
• Authorization
• Advanced data types
• Functions and procedures
• Triggers
• Recursive queries
The content of this lecture corresponds to
Sections 4.5, 4.7, and 5.2 - 5.4 of the course textbook
5
Authorization
• We may assign a user several forms of authorizations on parts of
the database
– READ: allows reading, but not modification of data
– INSERT: allows insertion of new data, but not modification of existing data
– UPDATE: allows modification, but not deletion of data
– DELETE: allows deletion of data
• Each of these types of authorizations is called a privilege
– We may authorize the user ALL, NONE, or a combination of these types of
privileges on specified parts of a database, such as a relation or a view
6
Authorization
• Forms of authorization to modify the database schema
– INDEX: allows creation and deletion of indices
– RESOURCES: allows creation of new relations
– ALTERATION: allows the addition or deletion of attributes in a relation
– DROP: allows deletion of relations
7
Authorization Specification in SQL
• The GRANT statement is used to confer authorization
– <user list> is:
• a user-id
• public, which allows all valid users the privilege granted
• a role
• Granting a privilege on a view does not imply granting any
privileges on the underlying relations
• The grantor of the privilege must already hold the privilege on the
specified item (or be the database administrator)
GRANT <privilege list> ON <relation or view> TO <user list>
8
Privileges in SQL
• SELECT
– allows read access to the relation, or the ability to query using the view
• INSERT
– the ability to insert tuples
• UPDATE
– the ability to update using the SQL update statement
• DELETE
– the ability to delete tuples.
• ALL PRIVILEGES
– used as a short form for all the allowable privileges
9
Roles
• A role is a way to distinguish among various users as far as what
these users can access/update in the database
• To create a role, we use:
• Once a role is created, we can assign “users” to the role using:
• Once a role is created, we can assign “users” to the role using:
CREATE A ROLE <name>
GRANT <role> TO <user list>
CREATE ROLE instructor;
GRANT instructor TO theodoc;
10
Authorization on Views
• Example
CREATE VIEW hist_instructor AS
SELECT *
FROM instructor
WHERE dept_name= 'History'
GRANT SELECT ON hist_instructor TO hist_staff
11
Authorization on Views
• Example
– Suppose that a geo_staff member issues
• What if
– hist_staff does not have permissions on instructor?
– The creator of the view did not have some permissions on instructor?
SELECT *
FROM hist_instructor
12
Built-in Data Types
• DATE: Dates, containing a (4 digit) year, month and date
– Example: date '2005-7-27'
• TIME: Time of day, in hours, minutes and seconds.
– Example: time '09:00:30' time '09:00:30.75'
• TIMESTAMP: date plus time of day
– Example: timestamp '2005-7-27 09:00:30.75'
• INTERVAL: period of time
– Example: interval '1' day
– Subtracting a date/time/timestamp value from another gives an interval value
– Interval values can be added to date/time/timestamp values
13
Large-Object Types
• Used to store large objects (photos, videos, CAD files, etc.)
• BLOB: binary large object
– Object is a large collection of uninterpreted binary data (whose
interpretation is left to an application outside of the database system)
• CLOB: character large object
– Object is a large collection of character data
• When a query returns a large object, a pointer is returned rather
than the large object itself
14
Custom Domains
• CREATE DOMAIN construct in SQL creates user-defined domain
types
• Types and domains are similar, but…
– …domains can have constraints, e.g., NOT NULL, specified on them
• Example
CREATE DOMAIN <domain_name> <type> <constraints>
CREATE domain degree_level varchar(10)
CONSTRAINT degree_level_test
CHECK (VALUE IN ('Bachelors', 'Masters', 'Doctorate'))
15
User-Defined Types
• CREATE TYPE construct in SQL creates user-defined type
• Example
CREATE TYPE <type_name> AS <type> <options>
CREATE TYPE Dollars AS numeric (12,2) FINAL
CREATE TABLE department (
 dept_name varchar (20),
 building varchar (15),
 budget Dollars
);
16
Functions and Procedures
• Functions and procedures allow “business logic” to be stored in
the database and executed from SQL statements
• These can be defined either by the procedural component of
SQL or by an external programming language
• The syntax we present here is defined by the SQL standard
– Most databases implement nonstandard versions of this syntax
17
Functions
• Example
– Define a function that, given the name of a department, returns the
number of instructors in that department
CREATE FUNCTION dept_count (dept_name varchar(20))
RETURNS integer
BEGIN
 DECLARE d_count integer;
 SELECT count (*) into d_count
 FROM instructor
 WHERE instructor.dept_name = dept_name
 RETURN d_count;
END
18
Functions
• Example
– Define a function that, given the name of a department, returns the
number of instructors in that department
– Having declared the function, we can now call it
SELECT dept_name, budget
FROM department
WHERE dept_count (dept_name) > 12
19
Table Functions
• The SQL standard supports functions that can return tables as
results; such functions are called table functions
• Example
– Return all instructors in a given department
20
Table Functions
• Example table function
CREATE function instructor_of (dept_name char(20))
RETURN table (
 ID varchar(5),
 name varchar(20),
 dept_name varchar(20),
 salary numeric(8,2)
)
RETURN table (
 SELECT ID, name, dept_name, salary
 FROM instructor
 WHERE instructor.dept_name = instructor_of.dept_name
)
21
Table Functions
• The SQL standard supports functions that can return tables as
results; such functions are called table functions
• Example
– Return all instructors in a given department
SELECT *
FROM TABLE (instructor_of ('Music'))
22
Procedures
• SQL also supports procedures
– The dept count function could instead be written as a procedure
CREATE PROCEDURE dept_count_proc(
 IN dept_name varchar(20),
 OUT d_count integer
)
BEGIN
 SELECT count(*) INTO d_count
 FROM instructor
 WHERE instructor.dept name = dept_count_proc.dept_name
END
23
Procedures
• SQL also supports procedures
– The keyword IN indicates parameters that are expected to have values
assigned to them
– The keyword OUT indicates parameters whose values are set in the
procedure in order to return results
24
Functions vs Procedures
• Differences according to the SQL standard
– Specific implementations may include additional or fewer ones
Functions Procedures
Return
Values
Must return exactly one value (or table) using a
RETURN statement
Cannot return a value via RETURN; data output is
done only through IN, OUT, INOUT parameters
Parameter
Modes Can only have IN parameters May have IN, OUT, and INOUT parameters
Usage
Context Designed to be used inside SQL expressions Cannot be used in SQL expressions; must be
invoked using: CALL proc_name(...)
Data
Modification
SQL Standard discourages functions that
modify the database Intended for routines that modify the database
Transaction
control
Typically forbidden from containing transaction
control Allowed to include transaction control
*Slide compiled with the assistance of MS Copilot
25
Language Constructs
• WHILE statement
• Notation:
WHILE <boolean expression> DO
 <sequence of statements>;
END WHILE
26
Language Constructs
• REPEAT statement
• Notation:
REPEAT
 <sequence of statements>;
UNTIL <boolean expression>
END REPEAT
27
Language Constructs
• FOR statement permits iteration over all the results of a query
• Notation:
FOR r AS
 <SQL query>;
DO
 <sequence of statements>;
END FOR
28
Language Constructs
• IF statement
• Notation:
IF <boolean expression> THEN
 <sequence of statements>
ELSEIF <boolean expression> THEN
 <sequence of statements>
ELSE
 <sequence of statements>
END IF
29
Language Constructs
• SQL also supports the signaling of exception conditions and the
declaration of handlers that can handle the exception
• Notation:
DECLARE exception_name CONDITION
DECLARE EXIT HANDLER FOR exception_name
BEGIN
 <sequence of statements>
END
30
Triggers
• A trigger is a statement that the system executes automatically
as a side effect of a database modification
• To design a trigger mechanism, we must:
– Specify the conditions under which the trigger is to be executed
– Specify the actions to be taken when the trigger executes
31
Triggers
• Example
CREATE TRIGGER credits_earned AFTER UPDATE OF takes ON (grade)
REFERENCING NEW ROW AS nrow REFERENCING OLD ROW AS orow
FOR EACH ROW
 WHEN nrow.grade <> 'F' AND nrow.grade IS NOT NULL
 AND (orow.grade = 'F' or orow.grade IS NULL)
 BEGIN ATOMIC
 UPDATE student
 SET tot_cred= tot_cred +
 (SELECT credits FROM course
 WHERE course.course_id = nrow.course_id)
 WHERE student.id = nrow.id
 END
32
Recursion
• The SQL standard includes a recursive query facility
• Notation
WITH [RECURSIVE] ⟨rectable⟩(A1, A2, … , An)
AS (
 ⟨SFW-Statement⟩1-- initialization
 UNION ALL
 ⟨SFW-Statement⟩2 -- recursive step
)
SELECT [DISTINCT] ⟨att-list⟩, ⟨aggregations⟩
FROM ⟨rectable⟩
[WHERE …] [GROUP BY …] [HAVING …] [ORDER BY …]
33
Recursion
• Conditions
– ⟨SFW-Statement⟩2 must not contain a DISTINCT clause
– Must use UNION [ALL]
– ⟨SFW-Statement⟩2 will be a join query involving rectable
– Recursion stops when no new rows are found
• User’s responsibility!
34
Recursion
• Example
– Find which courses are a prerequisite, whether
directly or indirectly, for a specific course
WITH RECURSIVE rec_prereq(course_id, prereq_id) as (
 SELECT course_id, prereq_id
 FROM prereq
 UNION
 SELECT rec_prereq.course_id, prereq.prereq_id,
 FROM rec_prereq, prereq
 WHERE rec_prereq.prereq_id = prereq.course_id
)
SELECT * FROM rec_prereq
35
Recursion
• Example
– Find all flight itineraries between cities that include
at most 2 connections
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
36
Recursion
• Example
– Find all flight itineraries between cities that include
up to three connections
• Option 1
– Write separate queries
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
37
Recursion
• Example
SELECT source, dest
FROM flights 0
SELECT f1.source, f2. dest
FROM flights AS f1
 JOIN flights AS f2 ON f1. dest = f2.source
1
SELECT f1.source, f3. dest
FROM flights AS f1
 JOIN flights AS F2 ON f1. dest = f2.source
 JOIN flights AS F3 ON f2. dest = f3.source
2
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
38
Recursion
• Example
SELECT source, dest, 0
FROM flights
UNION ALL
SELECT f1.source, f2. dest, 1
FROM flights AS f1
 JOIN flights AS f2 ON f1. dest = f2.source
UNION ALL
SELECT f1.source, f3. dest, 2
FROM flights AS f1
 JOIN flights AS F2 ON f1. dest = f2.source
 JOIN flights AS F3 ON f2. dest = f3.source
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
39
Recursion
• Example
– Find all flight itineraries between cities that include
up to three connections
• Option 1
– Write separate queries
– Works for small numbers
– The query can become very long
– The query text is practically generated by the
user based on input parameters (e.g., connections)
– Can we automate the process and make sure the
query works for an arbitrary number of connections?
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
40
Recursion
• Example
– Find all flight itineraries between cities that include
up to three connections
• Option 2
– Use recursion
flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
41
Recursion
• Example flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
WITH RECURSIVE conns(source,dest) AS (
 SELECT source, dest
 FROM flights
 UNION ALL
 SELECT conns.source, flights.dest
 FROM conns
 JOIN flights ON conns.dest = flights.source
)
SELECT * FROM conns
Incomplete
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
42
Recursion
• Example flights
source dest
LHR FRA
FRA BER
BER VIE
ZRH VIE
VIE ZRH
ZRH BCN
BCN CDG
ZHR FRA
BSL AMS
AMS PDX
ZRH MXP
MXP FCO
LHR EDI
AMS EDI
WITH RECURSIVE conns(source,dest,chg) AS (
 SELECT source, dest, 0
 FROM flights
 UNION ALL
 SELECT conns.source, flights.dest, conns.chg + 1
 FROM conns
 JOIN flights ON conns.dest = flights.source
 WHERE conns.chg < 3
)
SELECT * FROM conns
* The example has been adapted from the slides for the course "Datenbanksysteme" at UniKonstanz
END OF LECTURE 6