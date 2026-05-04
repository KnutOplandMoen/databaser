January 15, 2026
Lecture 3: SQL - Part 1/4
Data Modeling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• History of SQL
• SQL data definition language
• SQL query structure
• Some SQL operators
• Aggregate functions
The content of this lecture corresponds to
Chapter 3 (Sections 3.1 - 3.7, 3.9) of the course textbook
3
Recall - History of Database Systems
• Late 1960s and 1970s:
– Hard disks allowed direct access to data
– Network and hierarchical data models in widespread use
– Ted Codd defines the relational data model
• Would win the ACM Turing Award for this work
• IBM Research begins System R prototype
• UC Berkeley (Michael Stonebraker) begins Ingres prototype
– Oracle releases first commercial relational database
– High-performance (for the era) transaction processing
4
History of SQL
• IBM Sequel language was developed as part of the System R
project at the IBM San Jose Research Laboratory
• Renamed Structured Query Language (SQL)
• ANSI and ISO standard SQL
– SQL-86 → SQL-89 → SQL-92 → SQL:1999 (became Y2K compliant!) →
SQL:2003 → SQL:2006 → SQL:2008 → SQL:2011 → SQL:2016 →
SQL:2023
• Commercial systems offer most, if not all, SQL-92 features, plus
varying feature sets from later standards and special proprietary
features
5
SQL Parts
• DML
– Provides the ability to query information from the database and to insert
tuples into, delete tuples from, and modify tuples in the database
• Integrity
– The DDL includes commands for specifying integrity constraints
• View definition
– The DDL includes commands for defining views
6
SQL Parts
• Transaction control
– Includes commands for specifying the beginning and ending of
transactions
• Embedded SQL and dynamic SQL
– Define how SQL statements can be embedded within general-purpose
programming languages
• Authorization
– Includes commands for specifying access rights to relations and views
7
Data Definition Language
• The SQL data-definition language (DDL) allows the specification
of information about relations, including:
– The schema for each relation
– The type of values associated with each attribute
– The Integrity constraints
– The set of indices to be maintained for each relation
– Security and authorization information for each relation
– The physical storage structure of each relation on disk
8
Domain Types in SQL
• Numeric types
– int
• Integer (a finite subset of the integers that is machine-dependent)
– smallint
• Small integer (a machine-dependent subset of the integer domain type)
– numeric(p,d)
• Fixed point number with digits and digits to the right of the decimal point
– real, double precision
• Floating and double-precision floating point numbers, with machine-dependent precision
– float(n)
• Floating point number, with precision of at least digits
p d
n
9
Domain Types in SQL
• Character and text types
– char(n)
• Fixed-length character string, with user-specified length
– varchar(n)
• Variable-length character strings, with user-specified maximum length
n
n
integrity
constraints
domains
relation name
attribute
names
10
CREATE TABLE Construct
• An SQL relation is defined using the CREATE TABLE command
CREATE TABLE rel (
A1 D1,
A2 D2,
...,
An Dn,
(integrity-constraint-1),
...,
(integrity-constraint-K)
)
11
Integrity Constraints
• Types of integrity constraints
– primary key (A1, ..., An )
– foreign key (Am, ..., An ) references rel
– not null
• SQL prevents any update to the database that violates an
integrity constraint
12
CREATE TABLE Construct
• Example
– The CREATE TABLE command creates an empty table with the
requested schema.
instructor
id name dept_name salary
10101 Srinivasan Comp. Sci. 65000
12121 Wu Finance 90000
15151 Mozart Music 40000
22222 Einstein Physics 95000
32343 El Said History 60000
33456 Gold Physics 87000
45565 Katz Comp. Sci. 75000
58583 Califieri History 62000
76543 Singh Finance 80000
76766 Crick Biology 72000
83821 Brandt Comp. Sci. 92000
98345 Kim Elec. Eng. 80000
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department
);
* The commands to create the entire university database and import data can be found HERE
13
Updates to Tables
• INSERT
– Allows the insertion of new rows into an existing table
• Example
– Insert the instructor Einstein with id 22222, who works in the Physics
department and has a salary of 95000
INSERT INTO instructor VALUES ('22222','Einstein','Physics','95000');
INSERT INTO instructor(id,name,dept_name,salary)
VALUES ('22222','Einstein','Physics','95000');
INSERT INTO instructor(id,name)
VALUES ('22222','Einstein');
14
Updates to Tables
• INSERT
– Allows the insertion of new rows into an existing table
• Example
– Are the following queries working?
– Recall: SQL prevents any update that violates an integrity constraint
INSERT INTO instructor VALUES ('222224','Einstein','Physics','95000');
INSERT INTO instructor(id,dept_name,salary)
VALUES ('22222','Physics','95000');
INSERT INTO instructor
VALUES (‘12376','Marius','Topography','85000');
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department
);
15
Updates to Tables
• DELETE
– Allows the removal of tuples from a table
• Example
– Delete all students from the database
DELETE FROM student
16
Updates to Tables
• DROP TABLE
– Drops an entire table, including the data in it
• Example
– Delete the table student from the database
DROP TABLE student
* Restrictions regarding foreign keys may apply
17
Updates to Tables
• ALTER TABLE
– ALTER TABLE r ADD A D
• Where A is the name of the attribute to be added to relation r, and D is the domain of A
• All existing tuples in the relation are assigned NULL as the value for the new attribute
– ALTER TABLE r DROP A
• Where A is the name of an attribute of relation r
• Dropping of attributes not supported by many databases
18
Basic Query Structure
• A typical SQL query has the form
– A1, …, An represent attributes/columns
– r1, …, rm represent relations/tables
– P is a predicate
• The result of an SQL query is a relation/table
SELECT A1, …, An
FROM r1, …, rm
WHERE P
19
The SELECT Clause
• The select clause lists the attributes in the result of a query
– Corresponds to the projection operation of the relational algebra
• Example
– Find the names of all instructors
SELECT name
FROM instructor
name
Srinivasan
Wu
Mozart
Einstein
El Said
Gold
Katz
Califieri
Singh
Crick
Brandt
Kim
20
The SELECT Clause
• SQL names are case-insensitive
– Name NAME name
• SQL allows duplicates in relations as well as in query results
– To force the elimination of duplicates, insert the keyword DISTINCT after
SELECT
– Find the department names of all instructors, and remove duplicates
≡ ≡
SELECT DISTINCT dept_name
FROM instructor
dept_name
Finance
Music
Physics
History
Comp. Sci.
Biology
Elec. Eng.
21
The SELECT Clause
• An asterisk in the select clause denotes “all attributes”
• An attribute can be a literal with no FROM clause
– Results is a table with one column and a single row with value “437”
• An attribute can be a literal with from clause
– Result is a table with one column and N rows, each row with value “A”
SELECT *
FROM instructor
SELECT ‘437’
SELECT ‘A’
FROM instructor
22
The SELECT Clause
• The select clause can contain arithmetic expressions involving
the operation, , , , and , and operating on constants or
attributes of tuples
• Example
– return a relation that is the same as the instructor relation, except that the
value of the attribute salary is divided by 12
+ − * /
SELECT id, name, salary/12
FROM instructor
23
The SELECT Clause
• In contrast to relational algebra, SQL does not remove duplicates
by default. Instead, the keyword DISTINCT must be used
• Example
– Find the names of all departments that employ at least one
instructor who earns more than 85000
SELECT dept_name
FROM instructor
WHERE salary > 85000
dept_name
Finance
Physics
Physics
Comp. Sci.
SELECT DISTINCT dept_name
FROM instructor
WHERE salary > 85000
dept_name
Finance
Physics
Comp. Sci.
instructor
id name dept_name salary
10101 Srinivasan Comp. Sci. 65000
12121 Wu Finance 90000
15151 Mozart Music 40000
22222 Einstein Physics 95000
32343 El Said History 60000
33456 Gold Physics 87000
45565 Katz Comp. Sci. 75000
58583 Califieri History 62000
76543 Singh Finance 80000
76766 Crick Biology 72000
83821 Brandt Comp. Sci. 92000
98345 Kim Elec. Eng. 80000
24
The WHERE Clause
• The WHERE clause specifies conditions that the result must satisfy
– Corresponds to the selection predicate of the relational algebra
• Example
– Find all instructors in Comp. Sci. department
SELECT name
FROM instructor
WHERE dept_name = 'Comp. Sci.'
25
The WHERE Clause
• SQL allows the use of the logical connectives AND, OR, and NOT
• The operands of the logical connectives can be expressions
involving the comparison operators <
,
<=
,
>
,
>=
,
=, and <>
• Comparisons can be applied to the results of arithmetic
expressions
• Example
– Find all instructors in Comp. Sci. dept with salary > 80000
SELCT name
FROM instructor
WHERE dept_name = 'Comp. Sci.’ AND salary > 80000
26
WHERE Clause Predicates
• SQL includes a between comparison operator
• Example
– Find the names of all instructors with a salary between 90,000 and 100,000
• Tuple comparison is also allowed
SELECT name
FROM instructor
WHERE salary BETWEEN 90000 AND 100000
SELECT name, course_id
FROM instructor, teaches
WHERE (instructor.ID, dept_name) = (teaches.ID, 'Biology')
27
String Operations
• SQL includes a string-matching operator for comparisons on
character strings
• The operator LIKE uses patterns that are described using two
special characters
– percent ( )
• The character matches any substring
– underscore ( )
• The character matches any character
%
%
_
_
28
String Operations
• Example
– Find the names of all instructors whose name includes the substring “dar”
SELECT name
FROM instructor
WHERE name LIKE ‘%dar%'
29
String Operations
• Patterns are case sensitive
• Pattern matching examples:
– 'Intro%' matches any string beginning with “Intro”
– '%Comp%' matches any string containing “Comp” as a substring
– '_ _ _' matches any string of exactly three characters
– '_ _ _ %' matches any string of at least three characters
• SQL supports a variety of string operations, such as
– concatenation (using “||”)
– converting from upper to lower case (and vice versa)
– finding string length, extracting substrings, etc.
30
The FROM Clause
• The FROM clause lists the relations involved in the query
– Corresponds to the cross product operation of the relational algebra
• Example
– Find the cross product
– The query generates every possible instructor-teaches pair, with all
attributes from both relations
– For common attributes (e.g., id), the attributes in the resulting table are
renamed using the relation name
instructor × teaches
SELECT *
FROM instructor, teaches
31
The FROM Clause
• The cross product is not very useful directly, but combined with
some WHERE-clause condition
• Example
– Find the names of all instructors who have taught some course, and the id
of the course
SELECT name, course_id
FROM instructor, teaches
WHERE instructor.id = teaches.id
32
The FROM Clause
• Example
– Find the names of all instructors in the Art department who have taught
some course and the id of the course
SELECT name, course_id
FROM instructor, teaches
WHERE instructor.ID = teaches.ID
AND instructor. dept_name = 'Art'
33
The Rename Operation
• SQL allows renaming relations and attributes using the AS clause
– Renaming attributes in the SELECT clause
– Renaming attributes in the FROM clause
SELECT id, name, salary/12 AS msalary
FROM instructor
SELECT DISTINCT T.name
FROM instructor as T, instructor as S
WHERE T.salary > S.salary
AND S.dept_name = 'Comp. Sci.'
34
Ordering the Display of Tuples
• The operator ORDER BY enables the sorting of tuples based on
an attribute
– We may specify DESC for descending order or ASC for ascending order, for
each attribute
– Ascending order is the default
– Can sort on multiple attributes
• Example
– List all instructors in increasing order of their salary
SELECT *
FROM instructor
ORDER BY salary
35
Ordering the Display of Tuples
• Example
– List in alphabetical order the names of all instructors
• Example
– List in the names of all instructors first by department name in
alphabetical order, and then by salary
SELECT DISTINCT name
FROM instructor
ORDER BY name
SELECT DISTINCT name
FROM instructor
ORDER BY dept_name, salary
36
Top-k Queries
• Often, only the first few tuples of a query result are required
• Example
– Find the names of the top two instructors with the highest salies
SELECT name
FROM instructor
ORDER BY salary DESC
name
Einstein
Brandt
Wu
Gold
Singh
Kim
Katz
Crick
Srinivasan
Califieri
El Said
Mozart
Newton
SELECT name
FROM instructor
ORDER BY salary
LIMIT 2
name
Einstein
Brandt
37
Set Operations
• Set operations UNION, INTERSECT, and EXCEPT
• Examples
– Find courses that ran in Fall 2017 or in Spring 2018
– Find courses that ran in Fall 2017 but not in Spring 2018
(SELECT course_id FROM section WHERE semester='Fall' AND year=2017)
EXCEPT
(SELECT course_id FROM section WHERE semester='Spring' AND year=2018)
(SELECT course_id FROM section WHERE semester='Fall' AND year=2017)
UNION
(SELECT course_id FROM section WHERE semester='Spring' AND year=2018)
38
Set Operations
• What about duplicates?
• Example
– Find courses that ran in Fall 2017 or in Spring 2018
SELECT course_id FROM section
WHERE semester='Fall'
AND year=2017
UNION
SELECT course_id FROM section
WHERE semester='Spring'
AND year=2018)
course_id
CS-101
CS-315
CS-319
CS-347
FIN-201
HIS-351
MU-199
PHY-101
39
Set Operations
• ALL ensures that any set operation includes duplicates
• Example
– Find courses that ran in Fall 2017 or in Spring 2018
SELECT course_id FROM section
WHERE semester='Fall'
AND year=2017
UNION ALL
SELECT course_id FROM section
WHERE semester='Spring'
AND year=2018)
course_id
CS-101
CS-347
PHY-101
CS-101
CS-315
CS-319
CS-319
FIN-201
HIS-351
MU-199
course_id
CS-101
CS-315
CS-319
CS-347
FIN-201
HIS-351
MU-199
PHY-101
40
Aggregate Functions
• These functions operate on the multiset of values of a column of
a relation and return a value
– avg: average value
– min: minimum value
– max: maximum value
– sum: sum of values
– count: number of values
41
Aggregate Functions
• Examples
– Find the average salary of instructors in the Comp. Sci. department
– Find the total number of instructors who teach a course in the Spring 2018
semester
SELECT avg(salary)
FROM instructor
WHERE dept_name= 'Comp. Sci.'
SELECT count(distinct ID)
FROM teaches
WHERE semester = 'Spring' AND year = 2018
42
Aggregate Functions – GROUP BY
• Groups together attribute(s) for which the aggregate is computed
• Example
– Find the average salary of instructors in each department
dept_name salary
Finance 85000
History 61000
Physics 91000
Music 40000
Comp. Sci. 77333
Biology 72000
Elec. Eng. 80000
instructor
id name dept_name salary
10101 Srinivasan Comp. Sci. 65000
12121 Wu Finance 90000
15151 Mozart Music 40000
22222 Einstein Physics 95000
32343 El Said History 60000
33456 Gold Physics 87000
45565 Katz Comp. Sci. 75000
58583 Califieri History 62000
76543 Singh Finance 80000
76766 Crick Biology 72000
83821 Brandt Comp. Sci. 92000
98345 Kim Elec. Eng. 80000
SELECT dept_name, avg(salary)
FROM instructor
GROUP BY dept_name
43
Aggregate Functions – GROUP BY
• Attributes in the select clause outside of aggregate functions
must appear in group by list
• Example
– Find the average salary of instructors in each department
SELECT dept_name, avg(salary)
FROM instructor
GROUP BY dept_name
SELECT dept_name, id, avg(salary)
FROM instructor
GROUP BY dept_name
44
Aggregate Functions – HAVING Clause
• Similar to the WHERE clause, BUT
– Predicates in the WHERE clause are applied before forming groups
– Predicates in the HAVING clause are applied after the formation of groups
• Example
– Find the names all departments whose average salary is greater than 42000
SELECT dept_name
FROM instructor
GROUP BY dept_name
HAVING avg(salary) > 42000
SELECT dept_name
FROM instructor
WHERE avg(salary) > 42000
GROUP BY dept_name
45
Aggregate Functions
• Sequence of operations
1. The FROM clause is first evaluated to get a relation
2. If a WHERE clause is present, the predicate in the WHERE clause is applied
to the result relation of the FROM clause
3. Tuples satisfying the WHERE predicate are then placed into groups by the
GROUP BY clause if it is present
4. The HAVING clause, if it is present, is applied to each group; the groups
that do not satisfy the having clause predicate are removed
5. The SELECT clause uses the remaining groups to generate tuples of the
result, applying the aggregate functions to get a single result tuple for
each group
46
Null Values
• It is possible for tuples to have a null value, denoted by NULL, for
some of their attributes
• NULL signifies an unknown value or that a value does not exist
• The result of any arithmetic expression involving NULL is NULL
• The predicate IS NULL can be used to check for null values
• Example
– Find all instructors whose salary is undefined
SELECT name
FROM instructor
WHERE salary IS NULL
47
Null Values
• SQL treats as unknown the result of any comparison involving a
null value (other than predicates IS NULL and IS NOT NULL)
– Example: 5 < NULL or NULL <> NULL or NULL = NULL
• The predicate in a where clause can involve Boolean operations
(and, or, not); thus the definitions of the Boolean operations need
to be extended to deal with the value unknown
48
Null Values
• Boolean operations
– AND
• (true and unknown) = unknown
• (false and unknown) = false
• (unknown and unknown) = unknown
– OR
• (unknown or true) = true
• (unknown or false) = unknown
• (unknown or unknown) = unknown
49
Null Values
• SQL treats as unknown the result of any comparison involving a
null value (other than predicates IS NULL and IS NOT NULL)
– Example: 5 < NULL or NULL <> NULL or NULL = NULL
• The predicate in a where clause can involve Boolean operations
(and, or, not); thus the definitions of the Boolean operations need
to be extended to deal with the value unknown
• The result of WHERE clause predicate is treated as false if it
evaluates to unknown
• Aggregate functions usually ignore null values
• Example
SELECT sum(salary)
FROM instructor 898000
50
Null Values in Aggregation
instructor
id name dept_name salary
1 10101 Srinivasan Comp. Sci. 65000
2 12121 Wu Finance 90000
3 15151 Mozart Music 40000
4 22222 Einstein Physics 95000
5 32343 El Said History 60000
6 33456 Gold Physics 87000
7 45565 Katz Comp. Sci. 75000
8 58583 Califieri History 62000
9 76543 Singh Finance 80000
10 76766 Crick Biology 72000
11 83821 Brandt Comp. Sci. 92000
12 98345 Kim Elec. Eng. 80000
SELECT avg(salary) 13 12345 Newton Physics null
FROM instructor 74833.3333
SELECT count(salary)
FROM instructor 12
SELECT count(*)
FROM instructor 13
• Aggregate functions usually ignore null values
• Example
51
Null Values in Aggregation
instructor
id name dept_name salary
1 10101 Srinivasan Comp. Sci. 65000
2 12121 Wu Finance 90000
3 15151 Mozart Music 40000
4 22222 Einstein Physics 95000
5 32343 El Said History 60000
6 33456 Gold Physics 87000
7 45565 Katz Comp. Sci. 75000
8 58583 Califieri History 62000
9 76543 Singh Finance 80000
10 76766 Crick Biology 72000
11 83821 Brandt Comp. Sci. 92000
12 98345 Kim Elec. Eng. 80000
13 12345 Newton Physics null
SELECT sum(salary)/count(*)
FROM instructor 69076
SELECT avg(salary)
FROM instructor 74833.3333
52
Advanced Modification of the Database
• Deletion of tuples from a given relation
• Insertion of new tuples into a given relation
• Updating of values in some tuples in a given relation
53
Deletion
• DELETE can be combined with the WHERE clause to define which
conditions must be satisfied by the tuples to be deleted
• Examples
– Delete all instructors
– Delete all instructors from the Finance department
DELETE FROM instructor
DELETE FROM instructor
WHERE dept_name = 'Finance’
54
Insertion
• INSERT can be combined with SELECT-FROM-WHERE to insert the
results of a query directly into a table
• Example
– Make each student in the Music dept. who has earned more than 144
credit hours an instructor in the Music dept. with a salary of 18,000
– Note that the SELECT-FROM-WHERE statement is evaluated fully before any
of its results are inserted into the relation
INSERT INTO instructor
SELECT id, name, dept_name, 18000
FROM student
WHERE dept_name = 'Music'
AND total_cred > 144
55
Updates
• The UPDATE operation changes specific attributes in tuples
• Examples
– Give a 5% salary raise to all instructors
– Give a 5% salary raise to those instructors who earn less than 70000
UPDATE instructor
SET salary = salary * 1.05
UPDATE instructor
SET salary = salary * 1.05
WHERE salary < 70000
56
Updates
• Example
– Give a 5% salary raise to instructors whose salary is less than average
UPDATE instructor
SET salary = salary * 1.05
WHERE salary < (
SELECT avg(salary)
FROM instructor
)
57
Updates
• Example
– Increase the salaries of instructors whose salary is over $100,000 by 3%,
and all others by 5%
– The order is important
UPDATE instructor
SET salary = salary * 1.03
WHERE salary > 100000
UPDATE instructor
SET salary = salary * 1.05
WHERE salary <= 100000
58
Case Statement
• Example
– Increase the salaries of instructors whose salary is over $100,000 by 3%,
and all others by 5%
UPDATE instructor
SET salary = CASE
WHEN salary <= 100000 THEN salary * 1.05
ELSE salary * 1.03
END
59
Live Practice
• Find the titles of courses in the computer science department
that have 3 credits
• Find the IDs of all students who were taught by an instructor
named Einstein; make sure there are no duplicates in the result
• Find the highest salary of any instructor
• Find the total grade points earned by the student with ID '12345'
across all courses taken by the student
Live Practice
60
instructor
id
name
dept_name
salary
advisor
s_id
i_id
department
dept_name
building
budget
student
id
name
dept_name
tot_cred
course
course_id
title
dept_name
credits
prereq
course_id
prereq_id
time_slot
time_slot_id
day
start_time
end_time
takes
id
course_id
sec_id
semester
year
grade
teaches
id
course_id
sec_id
semester
year
classroom
building
room_number
capacity
section
course_id
sec_id
semester
year
building
room_number
time_slot_id
61
Live Practice
• Find the titles of courses in the computer science department
that have 3 credits
SELECT title
FROM course
WHERE dept_name = 'Comp. Sci.'
AND credits = 3
62
Live Practice
• Find the IDs of all students who were taught by an instructor
named Einstein; make sure there are no duplicates in the result
SELECT DISTINCT takes.id
FROM takes, instructor, teaches
WHERE takes.course_id = teaches.course_id
AND takes.sec_id = teaches.sec_id
AND takes.semester = teaches.semester
AND takes.year = teaches.year
AND teaches.id = instructor.id
AND instructor.name = 'Einstein'
63
Live Practice
• You are given a relation grade_points(grade,points) that
converts number to letter grades. Find the total grade points earned
by the student with ID '12345' across all courses taken by them
– If the student has not taken any courses, we would expect the answer to be 0
• This is not the case
SELECT sum(credits*points)
FROM takes, course, grade_points
WHERE takes.grade = grade_points.grade
AND takes.course_id = course.course_id
AND id = '12345'
Incomplete
64
Live Practice
• Find the highest salary of any instructor
SELECT max(salary)
FROM instructor
65
Live Practice
• Find the median salary of all instructors
– If the count is odd, the last row of the result of the previous query is the
median
– If the count is even, the average of the last two rows of the result of the
previous query is the median
SELECT count(*)
FROM instructor
ORDER BY salary
SELECT salary
FROM instructor
ORDER BY salary
LIMIT // count of instructors/2 + 1
END OF LECTURE 3