January 22, 2026
Lecture 5: SQL Part 3/4
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Subquery VS Join
• SQL conceptually treats nested subqueries in the where clause
as functions that take parameters and return either a single value
or a set of values
– The technique of evaluating a nested subquery by invoking it as a function
is called correlated evaluation.
• Correlated evaluation is not very efficient,
– The subquery is evaluated separately for each tuple in the outer query
3
Subquery VS Join
• Example of a correlated subquery
SELECT course_id
FROM section AS S
WHERE semester = 'Fall'
AND year = 2017
AND EXISTS (SELECT *
 FROM section as T
 WHERE semester = 'Spring'
 AND year = 2018
 AND S.course_id = T.course_id
)
4
Subquery VS Join
• SQL conceptually treats nested subqueries in the where clause
as functions that take parameters and return either a single value
or a set of values
– The technique of evaluating a nested subquery by invoking it as a function
is called correlated evaluation.
• Correlated evaluation is not very efficient,
– The subquery is evaluated separately for each tuple in the outer query
• Therefore, SQL optimizers attempt to transform nested
subqueries into joins, where possible.
5
Set Comparison
• Example
– Find names of instructors with a salary greater than that of some (at least
one) instructor in the Biology department
SELECT DISTINCT T.name
FROM instructor AS T, instructor AS S
WHERE T.salary > S.salary AND S.dept name = 'Biology'
SELECT name
FROM instructor
WHERE salary > SOME (SELECT salary
 FROM instructor
 WHERE dept name = 'Biology'
)
6
Subquery VS Join
• So, which is better?
• In general, don’t worry too much about which one is “better”
– The optimizer decides how the query will be processed and usually
chooses a good, if not the best, execution plan
• But
– A correlated subquery may be executed once per row, which can be
expensive if the optimizer does not rewrite it
– For some complex transformations or performance‑critical workloads,
joins may be clearer or faster
• Sometimes, you cannot avoid using a subquery anyway
7
Outline
• Transactions
• Integrity constraints
• Index definition
• Views
• Authorization
The content of this lecture corresponds to Sections 4.2-4.7 of the course textbook
There are also a short references to Section 17.1 and 16.5.1
8
Transactions
• A transaction consists of a sequence of query and/or update
statements and is a “unit” of work
• The SQL standard specifies that a transaction begins implicitly
when an SQL statement is executed
• The transaction must end with one of the following statements:
– Commit work
• The updates performed by the transaction become permanent in the database
– Rollback work
• All the updates performed by the SQL statements in the transaction are undone
9
Transactions
• Example
– Consider the following schema
– Transfer 1000 from the account of the client with id=5624 to the account
of the client with id=2742
account(account_num, cliend_id, type, open_date, balance)
UPDATE account
SET balance = balance - 1000
WHERE id = 5624
UPDATE instructor
SET balance = balance + 1000
WHERE id = 2742
* Images were generated using Microsoft Copilot
10
Transactions
• Example
– Consider the following schema
– Transfer 1000 from the account of the client with id=5624 to the account
of the client with id=2742
account(account_num, cliend_id, type, open_date, balance)
UPDATE account
SET salary = CASE
WHEN id=5624 THEN balance - 1000
WHEN id=2742 THEN balance + 1000
ELSE salary
END
* Images were generated using Microsoft Copilot
11
Transactions
• Example
– Consider the following schema
– Transfer 1000 from the account of the client with id=5624 to the account
of the client with id=2742
– Steps
1. read(A)
2. A := A – 50
3. write(A)
4. read(B)
5. B := B + 50
6. write(B)
account(account_num, cliend_id, type, open_date, balance)
1. read(A)
2. A := A – 50
3. read(B)
4. write(A)
5. B := B + 50
6. write(B)
1. read(A)
2. A := A – 50
3. read(B)
4. B := B + 50
5. write(A)
6. write(B)
12
ACID Properties
• To preserve the integrity of data the DBMS must ensure
– Atomicity
– Consistency
– Isolation
– Durability
Transaction management is going to be revisited in the second part of the course
13
ACID Properties
• Atomicity
– If the transaction fails after step 3 and before step 6, money
will be “lost” leading to an inconsistent database state
• Consistency
– The sum of A and B is unchanged by the execution of the transaction
• Isolation
– If between 3. and 6., another transaction T2 accesses the database,
it will see an inconsistent database
• Durability
– After T1 is over, the changes must persist
1. read(A)
2. A := A – 50
3. write(A)
4. read(B)
5. B := B + 50
6. write(B)
14
Transactions
• Example
– Consider the following schema
– Transfer 1000 from the account of the client with id=5624 to the account
of the client with id=2742
account(account_num, cliend_id, type, open_date, balance)
BEGIN TRANSACTION;
UPDATE account
SET balance = balance - 1000 WHERE id = 5624;
UPDATE instructor
SET balance = balance + 1000 WHERE id = 2742;
END TRANSACTION;
* Images were generated using Microsoft Copilot
15
Integrity Constraints
• Integrity constraints guard against accidental damage to the
database by ensuring that authorized changes to the database
do not result in a loss of data consistency
• Examples
– A checking account must have a balance greater than 10,000.00
– A customer must have a (non-null) phone number
16
Constraints on a Single Relation
• NOT NULL
• PRIMARY KEY
• UNIQUE
• CHECK(P)
– where P is a predicate
17
Constraints on a Single Relation
• NOT NULL
– Declares the value of an attribute to not be NULL
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department
);
18
Constraints on a Single Relation
• PRIMARY KEY (A1, …, An)
– Sets the primary key of the relation which consists of attributes A1,…,An
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department
);
19
Constraints on a Single Relation
• UNIQUE (A1, …, An)
– Sets a candidate key of the relation which consists of attributes A1,…,An
– Candidate keys are permitted to be NULL (in contrast to primary keys)
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
UNIQUE (id),
FOREIGN KEY (dept_name) REFERENCES department
);
20
Constraints on a Single Relation
• CHECK (P)
– Specifies a predicate P that must be satisfied by every tuple in a relation
–
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department,
CHECK(salary > 25000)
);
21
Assertions
• An assertion is a predicate expressing a condition that we wish
the database always to satisfy
• Notation:
• When an assertion is created, the system tests it for validity
– If the assertion is valid, then any future modification to the database is
allowed only if it does not cause that assertion to be violated
• <predicate> can also contain a subquery
– However, most widely used database systems do not support subqueries
in assertions or the CHECK clause
CREATE ASSERTION <assertion-name> CHECK <predicate>
22
Referential Integrity
• Ensures that a value that appears in one relation for a set of
attributes, appears for a certain set of attributes in another
relation too
– Let be a set of attributes.
– Let and be two relations that contain attributes and where is the
primary key of
– is said to be a foreign key of if for any values of appearing in ,
these values also appear in
A
r s A A
s
A r A r
s
Referential Integrity
23
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
• Example
– Relations instructor and teaches
– id teaches is a foreign key
teaches
id course_id sec_id semester year
10101 CS-101 1 Fall 2017
10101 CS-315 1 Spring 2018
10101 CS-347 1 Fall 2017
12121 FIN-201 1 Spring 2018
15151 MU-199 1 Spring 2018
22222 PHY-101 1 Fall 2017
32343 HIS-351 1 Spring 2018
45565 CS-101 1 Spring 2018
45565 CS-319 1 Spring 2018
76766 BIO-101 1 Summer 2017
76766 BIO-301 1 Summer 2018
83821 CS-190 1 Spring 2017
83821 CS-190 2 Spring 2017
83821 CS-319 2 Spring 2018
98345 EE-181 1 Spring 2017
24
Referential Integrity
instructor
id name dept_name salary
76766 Crick Biology 72000
32343 El Said History 60000
45565 Katz Comp. Sci. 75000
12121 Wu Finance 90000
83821 Brandt Comp. Sci. 92000
33456 Gold Physics 87000
76543 Singh Finance 80000
10101 Srinivasan Comp. Sci. 65000
22222 Einstein Physics 95000
15151 Mozart Music 40000
58583 Califieri History 62000
98345 Kim Elec. Eng. 80000
25
Foreign Keys
• Foreign keys can be specified as part of the CREATE TABLE
statement
• By default, a foreign key references the primary-key attributes of
the referenced table
• SQL allows a list of attributes of the referenced relation to be
specified explicitly
FOREIGN KEY (dept_name) REFERENCES department
FOREIGN KEY (dept_name) REFERENCES department(dept_name)
26
Cascading Action
• When a referential-integrity constraint is violated, the normal
procedure is to reject the action that caused the violation
• An alternative, in case of delete or update is to cascade
CREATE TABLE instructor (
id char(5),
…
FOREIGN KEY (dept_name) REFERENCES department
ON DELETE CASCADE
ON UPDATE CASCADE
);
27
Cascading Action
• ON DELETE CASCADE
– If a parent row is deleted, all child rows are automatically deleted too
• ON UPDATE CASCADE
– If a parent row’s primary key changes, all referencing foreign keys are
automatically updated to the new value
• ON [UPDATE|DELETE] SET NULL
– Set the foreign-key value in child rows to NULL when the parent is
updated or deleted
• ON [UPDATE|DELETE] SET DEFAULT
– Foreign-key values in child rows are set to a default defined value
28
Integrity Constraints and Transactions
• Consider the following table
• Now we want to insert one entry for a person named Tommy and a
person named Gina; Tommy and Gina are married
• How do we insert the tuples without causing a constraint violation?
CREATE TABLE person (
id char(5),
name varchar(40),
spouse char(5),
PRIMARY KEY(id),
FOREIGN KEY(spouse) REFERENCES person
)
29
Integrity Constraints and Transactions
• Solution
– Set spouse to NULL initially, update after inserting all persons
BEGIN TRANSACTION;
INSERT INTO person VALUES ('00001','Tommy',NULL);
INSERT INTO person VALUES ('00002','Gina','00001');
UPDATE person SET spouse='00002' WHERE id='00001';
END TRANSACTION;
30
Integrity Constraints and Transactions
• Consider the following table
• Now we want to insert one entry for a person named Tommy and a
person named Gina; Tommy and Gina are married
• What about now
CREATE TABLE married_person (
id char(5),
name varchar(40),
spouse char(5) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(spouse) REFERENCES married_person
)
31
Integrity Constraints and Transactions
• Problem
– Set spouse to NULL is not working; if not set to NULL, FK is violated
BEGIN TRANSACTION;
INSERT INTO married_person VALUES ('00001','Tommy',NULL);
INSERT INTO married_person VALUES ('00002','Gina','00001');
UPDATE married_person SET spouse='00002' WHERE id='00001';
END TRANSACTION;
BEGIN TRANSACTION;
INSERT INTO married_person VALUES ('00001','Tommy','00002');
INSERT INTO married_person VALUES ('00002','Gina','00001');
END TRANSACTION;
32
Integrity Constraints and Transactions
• Solution
– Set the foreign key constraint to DEFERRABLE INITIALLY DEFERRED
– The checking of the FK constraint is postponed (deferred) until the
transaction commits
CREATE TABLE married_person (
id char(5),
name varchar(40),
spouse char(5) NOT NULL,
PRIMARY KEY(id),
FOREIGN KEY(spouse) REFERENCES married_person
DEFERRABLE INITIALLY DEFERRED
)
33
Integrity Constraints and Transactions
• Solution
– Now this works
BEGIN TRANSACTION;
INSERT INTO married_person VALUES ('00001','Tommy','00002');
INSERT INTO married_person VALUES ('00002','Gina','00001');
END TRANSACTION;
34
Index Definition
• Many queries reference only a small proportion of the records in
a table
– It is inefficient for the system to read every record to find a record with a
particular value
• An index on an attribute of a relation is a data structure that
allows the database system to find those tuples in the relation
that have a specified value for that attribute efficiently, without
scanning through all the tuples of the relation
• We create an index with the create index command
CREATE INDEX <name> ON <relation-name> (attribute)
35
Index Definition
• Example
– Speed-up the look-up of students by id
CREATE TABLE student (
 id varchar (5),
 name varchar (20) NOT NULL,
 dept_name varchar (20),
 tot_cred numeric (3,0) DEFAULT 0,
 PRIMARY KEY (ID)
)
CREATE INDEX studentID_index ON student(ID)
36
Views
• In some cases, it is not desirable for all users to see the entire
logical model
• Consider a person who needs to know an instructor's name and
department, but not the salary:
• A view provides a mechanism to hide certain data from the view of
certain users.
• Any relation that is not of the conceptual model but is made visible
to a user as a “virtual relation” is called a view
SELECT id, name, dept_name
FROM instructor
37
View Definition
• A view is defined using the CREATE VIEW statement:
• where <QUERY EXPRESSION> is any legal SQL expression
• Once a view is defined, the view name can be used to refer to
the virtual relation that the view generates
• View definition is not the same as creating a new relation by
evaluating the query expression
– A view definition causes the saving of an expression
– The expression is substituted into queries using the view
CREATE VIEW view_name AS
<QUERY EXPRESSION>
38
View Definition and Use
• Example
– A view of instructors without their salaries
– Find all instructors in the Biology department
CREATE VIEW faculty as
SELECT id, name, dept_name
FROM instructor
SELECT name
FROM faculty
WHERE dept_name = 'Biology'
39
View Definition and Use
• Example
– Create a view of department salary totals
CREATE VIEW depts_total_salary(dept_name, total_salary) AS
SELECT dept_name, sum (salary)
FROM instructor
GROUP BY dept_name
40
View Definition and Use
• Another example
– Consider a relation that stores bank accounts for different countries
– At the creation of an account, a tuple in transaction is added to set the
initial balance from 0 to an initial amount.
– Create a view that contains the account number and current balance for
accounts in Switzerland
account(acc_id, client_id, country)
transaction(t_id, acc_id, old_balance, new_balance, time_stamp)
41
View Definition and Use
• Another example
CREATE VIEW swiss_account_balance AS
SELECT acc_id, new_balance AS balance
FROM account
 JOIN transaction USING (acc_id)
 JOIN (
 SELECT acc_id, max(time_stamp) AS time_stamp
 FROM transaction
 ) AS latest_ts_per_acc USING (acc_id, time_stamp)
WHERE country = 'CH'
GROUP BY dept_name
42
View Definition and Use
• Views differ from the with statement in that views, once created,
remain available until explicitly dropped
• The named subquery defined by WITH is local to the query in
which it is defined
43
Views Defined Using Other Views
• Example
– Define a view that lists the course ID and room number of all Physics
courses offered in the Fall 2017 semester
CREATE view physics_fall_2017 AS
SELECT course.course_id, sec_id, building, room_number
FROM course, section
WHERE course.course_id = section.course_id
AND course.dept_name = 'Physics'
AND section.semester = 'Fall'
AND section.year = '2017'
44
Views Defined Using Other Views
• Example
– Define a view that lists the course ID and room number of all Physics
courses offered in the Fall 2017 semester in the Watson building
CREATE VIEW physics_fall_2017_watson AS
SELECT course id, room number
FROM physics_fall_2017
WHERE building = 'Watson'
45
Views Defined Using Other Views
• One view may be used in the expression defining another view
• A view relation is said to depend directly on a view relation
if is used in the expression defining
• A view relation is said to depend on view relation v2 if either
depends directly on or there is a path of dependencies from
to
• A view relation v is said to be recursive if it depends on itself
v1 v2
v2 v1
v1 v1
v2 v1
v2
46
Ways to Maintain Views
• Non-materialized view
– Keep an alias of the view name and the query that was used to create it
• No extra storage needed
• Every time one accesses the view, the query is executed
• Materialized view
– Store the view on the disk in a similar fashion to a table
• Every time one accesses the view, the result is retrieved immediately
• The system must ensure that the view is kept up-to-date
• Some systems allow the definition of materialized views
– The explicit definition of materialized views is not part of the SQL standard
47
Materialized View Maintenance
• Materialized views can be maintained by recomputation on every
update
– Immediately, lazily, periodically
• View maintenance can be done by
– Manually defining triggers on insert, delete, and update of each relation in
the view definition
– Manually written code to update the view whenever database relations
are updated
– Periodic recomputation (e.g. nightly)
– A good option is to modify only the affected parts of the materialized view,
which is known as incremental view maintenance
48
Update of a View
• Example
– Add a new tuple to faculty view
CREATE TABLE instructor (
id char(5),
name varchar(20) NOT NULL,
dept_name varchar(20),
salary numeric(8,2),
PRIMARY KEY (id),
FOREIGN KEY (dept_name) REFERENCES department
);
49
Update of a View
• Example
– Add a new tuple to faculty view
– This insertion must be represented by the insertion into instructor
• Must have a value for salary
• Option 1: Reject the insert
• Option 2: Insert the tuple ('30765', 'Green', 'Music', null) into instructor
INSERT INTO faculty VALUES ('30765', 'Green', 'Music');
CREATE VIEW faculty as
SELECT id, name, dept_name
FROM instructor
50
Update of a View
• Another example
• Issues
– Which department, if multiple departments in Taylor?
– What if no department is in Taylor?
CREATE VIEW instructor_info AS
SELECT id, name, building
FROM instructor, department
WHERE instructor.dept_name = department.dept_name
INSERT INTO instructor_info VALUES ('69987', 'White', 'Taylor')
Because of problems such as these, modifications are generally
not permitted on view relations, except in limited cases.
51
Update of a View
• Most SQL implementations allow updates only on simple views
– The FROM clause has only one database relation
– The SELECT clause contains only attribute names of the relation, and does
not have any expressions, aggregates, or DISTINCT specification.
– Any attribute not listed in the SELECT clause can be set to NULL
– The query does not have a GROUP BY or HAVING clause.
52
Update of a View
• Another example
• What happens now?
– By default, SQL would allow the above update to proceed
– However, views can be defined with a WITH CHECK OPTION clause at the
end of the view definition
CREATE VIEW history_instructors AS
SELECT *
FROM instructor
WHERE dept_name= 'History'
INSERT INTO history_instructors
VALUES ('25566', 'Brown', 'Biology', 100000)
53
Authorization
• We may assign a user several forms of authorizations on parts of
the database
– READ: allows reading, but not modification of data
– INSERT: allows insertion of new data, but not modification of existing data
– UPDATE: allows modification, but not deletion of data
– DELETE: allows deletion of data
• Each of these types of authorizations is called a privilege.
– We may authorize the user all, none, or a combination of these types of
privileges on specified parts of a database, such as a relation or a view
54
Authorization
• Forms of authorization to modify the database schema
– INDEX: allows creation and deletion of indices
– RESOURCES: allows creation of new relations
– ALTERATION: allows the addition or deletion of attributes in a relation
– DROP: allows deletion of relations
55
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
56
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
57
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
58
Authorization on Views
• Example
CREATE VIEW history_instructors AS
SELECT *
FROM instructor
WHERE dept_name= 'History'
GRANT SELECT ON geo_instructor TO geo_staff
59
Authorization on Views
• Example
– Suppose that a geo_staff member issues
• What if
– geo_staff does not have permissions on instructor?
– creator of view did not have some permissions on instructor?
SELECT *
FROM geo_instructor
END OF LECTURE 5