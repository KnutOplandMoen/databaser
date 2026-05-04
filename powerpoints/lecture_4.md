January 20, 2026
Lecture 4: SQL Part 2/4
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• Nested subqueries
• Join expressions
The content of this lecture corresponds to Sections 3.8 and 4.1 of the course textbook
There is also a minor reference to Section 16.4.4
3
Nested Queries
• SQL provides a mechanism for the nesting of subqueries
– A subquery is a SELECT-FROM-WHERE expression that is nested within
another query
UPDATE instructor
SET salary = salary * 1.05
WHERE salary < (
SELECT avg(salary)
FROM instructor
)
4
Nested Queries
• Recall: a typical SQL query has the form:
• The nesting can be done as follows
– FROM clause: can be replaced by any valid subquery
– WHERE clause: can be replaced with an expression of the form
where B is an attribute and <operation> a valid SQL operation
– SELECT clause: can be a subquery that generates a single value
ri
P
Ai
SELECT A1, …, An
FROM r1, …, rm
WHERE P
B <operation> <subquery>
5
Set Membership
• SQL allows testing tuples for membership in a relation
– IN and NOT IN
• The IN connective tests for set membership, where the set is a
collection of values produced by a select clause
• The NOT IN connective tests for the absence of set membership
• Example
– Find courses offered in Fall 2017 and in Spring 2018
SELECT DISTINCT course_id
FROM section
WHERE semester = 'Fall' AND year = 2017
AND course_id IN (SELECT course_id
 FROM section
 WHERE semester = 'Spring' AND year= 2018
);
SELECT DISTINCT course_id
FROM section
WHERE semester = 'Fall' AND year = 2017
AND course_id IN (SELECT course_id
 FROM section
 WHERE semester = 'Spring' AND year= 2018
);
6
Set Membership
(SELECT course_id FROM section WHERE semester='Fall' AND year=2017)
INTERSECT
(SELECT course_id FROM section WHERE semester='Spring' AND year=2018)
SELECT DISTINCT course_id
FROM section
WHERE semester = 'Fall' AND year = 2017
AND course_id IN (SELECT course_id
 FROM section
 WHERE semester = 'Spring' AND year= 2018
);
7
Set Membership
• Example
– Find courses offered in Fall 2017 but not in Spring 2018
(SELECT course_id FROM section WHERE semester='Fall' AND year=2017)
EXCEPT
(SELECT course_id FROM section WHERE semester='Spring' AND year=2018)
SELECT DISTINCT course_id
FROM section
WHERE semester = 'Fall' AND year = 2017
AND course_id NOT IN (SELECT course_id
 FROM section
 WHERE semester = 'Spring' AND year= 2018
)
8
Set Membership
• Example
– Name all instructors whose name is neither “Mozart” nor Einstein”
SELECT DISTINCT name
FROM instructor
WHERE name NOT IN ('Mozart', 'Einstein')
9
Set Membership
• Example
– Find the total number of (distinct) students who have taken the course
sections taught by the instructor with ID 10101
SELECT count (DISTINCT id)
FROM takes
WHERE (course_id, sec_id, semester, year) IN (
 SELECT course_id, sec_id, semester, year
 FROM teaches
 WHERE teaches.id = '10101'
)
10
Set Comparison
• SQL allows testing tuples for membership in a relation
– SOME and ALL
• The SOME connective tests whether a value is <comp> than some
(at least one) values in another set
• The ALL connective tests whether a value is <comp> than all
values in another set
– <comp>: <
,
<=
,
>
,
>=
,
=, and <>
11
Set Comparison
• Example
– Find names of instructors with a salary greater than that of some (at least
one) instructor in the Biology department
SELECT name
FROM instructor
WHERE salary > SOME (SELECT salary
 FROM instructor
 WHERE dept name = 'Biology'
)
12
Set Comparison
• Definition of SOME
– 5 < SOME {0,5,6}
• TRUE
– 5 < SOME {0,5}
• FALSE
– 5 = SOME {0,5}
• TRUE
– 5 ≠ SOME {0,5}
• TRUE
F <comp> SOME r ⇔ ∃t ∈ r : F <comp> t
= SOME is equivalent to IN
BUT
NOT SOME is not equivalent to NOT IN
NOTE: Some DBMSs support the keyword ANY,
which is synonymous to SOME
13
Set Comparison
• Example
– Find the names of all instructors whose salary is greater than the salary of
all instructors in the Biology department
SELECT name
FROM instructor
WHERE salary > ALL (SELECT salary
 FROM instructor
 WHERE dept name = 'Biology'
)
14
Set Comparison
• Definition of ALL
– 5 < ALL {0,5,6}
• FALSE
– 5 < ALL {6,10}
• TRUE
– 5 = ALL {4,5}
• FALSE
– 5 ≠ ALL {4,6}
• TRUE
F <comp> ALL r ⇔ ∀t ∈ r : F <comp> t
≠ ALL is equivalent to NOT IN
BUT
ALL is not equivalent to IN
15
Test for Empty Relations
• The EXISTS construct returns the value true if the argument
subquery is nonempty
16
Test for Empty Relations
• Example
– Find all courses taught in both the Fall 2017 semester and in the Spring
2018 semester
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
17
Test for Empty Relations
• Example
– Find all students who have taken all the courses offered in the Biology
department
SELECT DISTINCT S.id, S.name
FROM student AS S
WHERE NOT EXISTS ((SELECT course_id
 FROM course
 WHERE dept_name = 'Biology')
 EXCEPT
 (SELECT T.course_id
 FROM takes as T
 WHERE S.id = T.id)
)
18
Recall: Live Practice
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
Complete solution in the next slide
19
Live Practice
SELECT sum(credits*points)
FROM takes, course, grade_points
WHERE takes.grade = grade_points.grade
AND takes.course_id = course.course_id
AND id = '12345' AND id = '12345'
UNION
SELECT 0
FROM student
WHERE id = '12345'
AND NOT EXISTS (SELECT *
 FROM takes
 WHERE id = '12345'
)
20
Test for Absence of Duplicates
• The UNIQUE construct tests whether a subquery has any
duplicate tuples in its result
– Evaluates to “true” if a given subquery contains no duplicates
21
Test for Absence of Duplicates
• Example
– Find all courses that were offered at most once in 2017
SELECT T.course_id
FROM course as T
WHERE UNIQUE (SELECT R.course_id
 FROM section AS R
 WHERE T.course_id = R.course_id
 AND R.year = 2017
)
22
Test for Absence of Duplicates
• Example
– Find all courses that were offered at least twice in 2017
SELECT T.course_id
FROM course as T
WHERE NOT UNIQUE (SELECT R.course_id
 FROM section AS R
 WHERE T.course_id = R.course_id
 AND R.year = 2017
)
23
To Correlate or not to Correlate
• A subquery that uses a correlation name from an outer query is
called a correlated subquery
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
24
To Correlate or not to Correlate
• A subquery that uses a correlation name from an outer query is
called a correlated subquery
• Scoping rule
– In a subquery, it is legal to use only correlation names defined in the
subquery itself or in any query that contains the subquery
– If a correlation name is defined both locally in a subquery and globally in a
containing query, the local definition applies
25
To Correlate or not to Correlate
• Scoping rule
– S refers to the outer definition
SELECT DISTINCT S.id, S.name
FROM student AS S
WHERE NOT EXISTS ((SELECT course_id
 FROM course
 WHERE S.dept_name = 'Biology')
 EXCEPT
 (SELECT T.course_id
 FROM takes as T
 WHERE S.id = T.id)
)
26
To Correlate or not to Correlate
• Scoping rule
– S refers to the local definition
SELECT DISTINCT S.id, S.name
FROM student AS S
WHERE NOT EXISTS ((SELECT course_id
 FROM course AS S
 WHERE S.dept_name = 'Biology')
 EXCEPT
 (SELECT T.course_id
 FROM takes as T
 WHERE S.id = T.id)
)
27
To Correlate or not to Correlate
• Correlated subqueries have to be evaluated for every
assignment of values to the outer tuple variables
– They are “parameterized” by those variables
• Non-correlated subqueries have a constant value for all
assignments of values to the outer tuple variables
– They need to be evaluated only once
28
Subqueries in the FROM Clause
• SQL allows a subquery expression to be used in the from clause
– Similar to having a temporary table
• Example
– Find the average instructors’ salaries of those departments where the
average salary is greater than 42000.
SELECT dept_name, avg_salary
FROM (
SELECT dept_name, avg(salary) AS avg_salary
FROM instructor
GROUP BY dept_name)
WHERE avg_salary > 42000
No need for HAVING
29
Subqueries in the FROM Clause
• Example
– Find the cross product of instructor IDs with other instructor IDs such that
the salary of one is over 90000 and the salary of the other is below 70000
SELECT I1.id, I2.id
FROM instructor AS I1, instructor AS I2
WHERE I1.salary > 90000
AND I2.salary < 70000
Without nesting
• Example
– Find the cross product of instructor IDs with other instructor IDs such that
the salary of one is over 90000 and the salary of the other is below 70000
SELECT I1.id, I2.id
FROM (
SELECT * FROM instructor
WHERE salary > 90000
) AS I1, (
SELECT * FROM instructor
WHERE salary < 70000
) AS I2
30
Subqueries in the FROM Clause
With nesting
31
Scalar Subqueries
• A scalar subquery is one that is used where a single value is
expected
• Scalar subqueries can occur in SELECT, WHERE, and HAVING
clauses
– Scalar subqueries may also be defined without aggregates
– The result is still a relation
• When a scalar subquery is used in an expression where a value is expected, SQL
implicitly extracts the value
• Runtime error if subquery returns more than one result tuple
– It is not always possible to figure out at compile time if a subquery can
return more than one tuple in its result
32
Recall: Live Practice
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
33
Recall: Live Practice
• Find the median salary of all instructors
SELECT CASE
 WHEN (SELECT count(salary) FROM instructor)%2 = 0 THEN avg(salary)
 ELSE max(salary)
END
FROM (SELECT salary
 FROM (SELECT salary FROM instructor
 ORDER BY salary
 LIMIT (SELECT count(salary) FROM instructor)/2 + 1
 )
 ORDER BY salary DESC
 LIMIT 2
) AS salaries
34
WITH Clause
• The WITH clause provides a way of defining a temporary relation
– The definition of the temporary relation is available only to the query in
which the WITH clause occurs
35
WITH Clause
• Example
– Find all departments with the maximum budget
WITH max_budget(value) AS
(
SELECT max(budget)
FROM department
)
SELECT department.dept_name
FROM department, max_budget
WHERE department.budget = max_budget.value
36
WITH Clause
• Example
– Find all departments where the total salary is greater than the average of
the total salary at all departments
WITH dept_total(dept_name, value) AS (
 SELECT dept_name, sum(salary)
 FROM instructor
 GROUP BY dept_name),
 dept_total_avg(value) AS (
 SELECT avg(value)
 FROM dept_total)
SELECT dept_name
FROM dept_total, dept_total_avg
WHERE dept_total.value > dept_total_avg.value
37
WITH Clause
• Example
– List all departments along with the number of instructors in each
department
SELECT dept_name, (
 SELECT count(*)
 FROM instructor
 WHERE department.dept_name = instructor.dept_name)
AS num_instructors
FROM department
38
JOIN Operations
• A join operation is a cross product which requires that tuples in
the two relations match (under some condition)
– Takes two relations as input and returns as a result another relation
– It also specifies the attributes that are present in the result of the join
• The join operations are typically used as subquery expressions
in the from clause
39
JOIN Operations
• Join condition
– Defines which tuples in the two relations match, and what attributes are
present in the result of the join
• Join type
– Defines how tuples in each relation that do not match any tuple in the
other relation (based on the join condition) are treated
JOIN Types JOIN Conditions
inner join
left outer join
right outer join
full outer join
natural
on <predicate>
using (A1, …, AN)
• NATURAL JOIN matches tuples with the same values for all
common attributes, and retains one copy of each common column
• The FROM clause can have multiple relations combined using
NATURAL JOIN
• Notation:
40
NATURAL JOIN
SELECT A1, A2, … An
FROM r1 NATURAL JOIN r2 NATURAL JOIN r3 … NATURAL JOIN rn
where P
41
NATURAL JOIN
• Example
– List the names of instructors along with the course ID of the courses that
they taught
SELECT name, course_id
FROM students, takes
WHERE student.id = takes.id
SELECT name, course_id
FROM student NATURAL JOIN takes
NATURAL JOIN
42
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics
0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
takes
id course_id sec_id semester year grade
128 CS-101
1 Fall 2017
A
128 CS-347
1 Fall 2017 A12345 CS-101 1 Fall 2017 C
12345 CS-190
2 Spring 2017
A
12345 CS-315
1 Spring 2018
A
12345 CS-347
1 Fall 2017
A
19991 HIS-351
1 Spring 2018
B
23121 FIN-201
1 Spring 2018 C+
44553 PHY-101
1 Fall 2017 B45678 CS-101 1 Fall 2017 F
45678 CS-101
1 Spring 2018 B+
45678 CS-319
1 Spring 2018
B
54321 CS-101
1 Fall 2017 A54321 CS-190 2 Spring 2017 B+
55739 MU-199
1 Spring 2018 A76543 CS-101 1 Fall 2017 A
76543 CS-319
2 Spring 2018
A
76653 EE-181
1 Spring 2017
C
98765 CS-101
1 Fall 2017 C98765 CS-315 1 Spring 2018 B
98988 BIO-101
1 Summer 2017
A
98988 BIO-301
1 Summer 2018 null
name course_id
Zhang CS-101
Zhang CS-347
Shankar CS-101
Shankar CS-190
Shankar CS-315
Shankar CS-347
Brandt HIS-351
Chavez FIN-201
Peltier PHY-101
Levy CS-101
Levy CS-101
Levy CS-319
Williams CS-101
Williams CS-190
Sanchez MU-199
Brown CS-101
Brown CS-319
Aoi EE-181
Bourikas CS-101
Bourikas CS-315
Tanaka BIO-101
Tanaka BIO-301
43
Beware of NATURAL JOIN
• Unrelated attributes with the same name can get equated
incorrectly
• Example
– List the names of the students along with the titles of courses that they
have taken
Beware of NATURAL JOIN
44
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics 0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
takes
id course_id sec_id semester year grade
128 CS-101 1 Fall 2017 A
128 CS-347 1 Fall 2017 A12345 CS-101 1 Fall 2017 C
12345 CS-190 2 Spring 2017 A
12345 CS-315 1 Spring 2018 A
12345 CS-347 1 Fall 2017 A
19991 HIS-351 1 Spring 2018 B
23121 FIN-201 1 Spring 2018 C+
44553 PHY-101 1 Fall 2017 B45678 CS-101 1 Fall 2017 F
45678 CS-101 1 Spring 2018 B+
45678 CS-319 1 Spring 2018 B
54321 CS-101 1 Fall 2017 A54321 CS-190 2 Spring 2017 B+
55739 MU-199 1 Spring 2018 A76543 CS-101 1 Fall 2017 A
76543 CS-319 2 Spring 2018 A
76653 EE-181 1 Spring 2017 C
98765 CS-101 1 Fall 2017 C98765 CS-315 1 Spring 2018 B
98988 BIO-101 1 Summer 2017 A
98988 BIO-301 1 Summer 2018 null
course
course_id title dept_name credits
BIO-101 Intro. to Biology Biology 4
BIO-301 Genetics Biology 4
BIO-399 Computational Biology Biology 3
CS-101 Intro. to Computer Science Comp. Sci. 4
CS-190 Game Design Comp. Sci. 4
CS-315 Robotics Comp. Sci. 3
CS-319 Image Processing Comp. Sci. 3
CS-347 Database System Concepts Comp. Sci. 3
EE-181 Intro. to Digital Systems Elec. Eng. 3
FIN-201 Investment Banking Finance 3
HIS-351 World History History 3
MU-199 Music Video Production Music 3
PHY-101 Physical Principles Physics 4
45
Beware of NATURAL JOIN
• Unrelated attributes with the same name can get equated
incorrectly
• Example
– List the names of the students along with the titles of courses that they
have taken
SELECT name, title
FROM student NATURAL JOIN takes NATURAL JOIN course
Beware of NATURAL JOIN
46
name title
Zhang Intro. to Computer Science
Zhang Database System Concepts
Shankar Intro. to Computer Science
Shankar Game Design
Shankar Robotics
Shankar Database System Concepts
Brandt World History
Chavez Investment Banking
Peltier Physical Principles
Williams Intro. to Computer Science
Williams Game Design
Sanchez Music Video Production
Brown Intro. to Computer Science
Brown Image Processing
Aoi Intro. to Digital Systems
Tanaka Intro. to Biology
Tanaka Genetics
This result does not contain all
pairs where the student takes
a course in a department other
than the student's own
department
takes(id, course_id,sec_id,semester, year, grade)
course(course_id, title, dept_name, credits)
student(id, name, dept_name, tot_cred)
student ⋈ takes ⋈ course
47
Beware of NATURAL JOIN
• Unrelated attributes with the same name can get equated
incorrectly
• Example
– List the names of the students along with the titles of courses that they
have taken
SELECT name, title
FROM student NATURAL JOIN takes NATURAL JOIN course
SELECT name, title
FROM student NATURAL JOIN takes, course
WHERE takes.course_id = course.course_id
Beware of NATURAL JOIN
48
name title
Zhang Intro. to Computer Science
Zhang Database System Concepts
Shankar Intro. to Computer Science
Shankar Game Design
Shankar Robotics
Shankar Database System Concepts
Brandt World History
Chavez Investment Banking
Peltier Physical Principles
Levy Intro. to Computer Science
Levy Intro. to Computer Science
Levy Image Processing
Williams Intro. to Computer Science
Williams Game Design
Sanchez Music Video Production
Brown Intro. to Computer Science
Brown Image Processing
Aoi Intro. to Digital Systems
Bourikas Intro. to Computer Science
Bourikas Robotics
Tanaka Intro. to Biology
Tanaka Genetics
name title
Zhang Intro. to Computer Science
Zhang Database System Concepts
Shankar Intro. to Computer Science
Shankar Game Design
Shankar Robotics
Shankar Database System Concepts
Brandt World History
Chavez Investment Banking
Peltier Physical Principles
Williams Intro. to Computer Science
Williams Game Design
Sanchez Music Video Production
Brown Intro. to Computer Science
Brown Image Processing
Aoi Intro. to Digital Systems
Tanaka Intro. to Biology
Tanaka Genetics
49
Join Conditions
• There are different ways to define the conditions/attributes on
which relations are joined
– Cross product + WHERE clause
– USING keyword
– ON keyword
SELECT name, title
FROM (student NATURAL JOIN takes) JOIN course USING (course_id)
SELECT name, title
FROM student NATURAL JOIN takes, course
WHERE takes.course_id = course.course_id
SELECT name, title
FROM (student NATURAL JOIN takes) JOIN course ON takes.course_id = course.course_id
50
Join Conditions
• There are different ways to define the conditions/attributes on
which relations are joined
• So which one is the best?
– I asked the experts of our era (ChatGPT, MS Copilot, Google AI, Meta AI)
– They all agree that the best way is to use JOIN … ON …
– Reasons
• Clarity, correctness, and maintainability
• However, in terms of performance, there is no difference
– SQL optimizers rewrite join queries internally anyway
• There are queries that, to answer them, the same table needs to
be mentioned more than once
• Example
– Print all courses that have a prerequisite with their prerequisites in (A,B)
format, where A is the course name, and B is the name of its prerequisite
SELECT title, prereq_id
FROM (course JOIN prereq USING (course_id)) JOIN
 course ON (course.course_id = prereq.prereq_id)
51
Self-Join
SELECT title, prereq_id
FROM course JOIN prereq USING (course_id)
• There are queries that, to answer them, the same table needs to
be mentioned more than once
• Example
– Print all courses that have a prerequisite with their prerequisites in (A,B)
format, where A is the course name, and B is the name of its prerequisite
52
Self-Join
SELECT a.title, b.title
FROM (course AS a JOIN prereq USING (course_id)) JOIN
 course AS b ON (b.course_id = prereq.prereq_id)
53
OUTER JOIN
• An extension of the join operation that avoids loss of information
• Computes the join and then adds tuples from one relation that do
not match tuples in the other relation to the result of the join
• Uses null values
• Three forms of outer join:
– left outer join
– right outer join
– full outer join
OUTER JOIN
54
inner join
left outer join full outer join
right outer join
55
OUTER JOIN
• Example
– Print all courses with their prerequisites in (A,B) format, where A is the
course ID, and B is the ID of the prerequisite
– Print all courses with their prerequisites in (A,B) format, where A is the
course name, and B is the ID of the prerequisite
SELECT course_id, prereq_id
FROM prereq
SELECT title, prereq_id
FROM course NATURAL JOIN prereq
course(course_id, title, dept_name, credits)
prereq(course_id, prereq_id)
OUTER JOIN
56
SELECT title, prereq_id
FROM course NATURAL JOIN prereq
title prereq_id
Genetics BIO-101
Computational Biology BIO-101
Game Design CS-101
Robotics CS-101
Image Processing CS-101
Database System Concepts CS-101
Intro. to Digital Systems PHY-101
Print ALL courses
SELECT title, prereq_id
FROM course LEFT OUTER JOIN prereq
 USING(course_id)
title prereq_id
Genetics BIO-101
Computational Biology BIO-101
Game Design CS-101
Robotics CS-101
Image Processing CS-101
Database System Concepts CS-101
Intro. to Digital Systems PHY-101
Music Video Production null
World History null
Investment Banking null
Physical Principles null
Intro. to Biology null
Intro. to Computer Science null
SELECT title, prereq_id
FROM prereq RIGHT OUTER JOIN course
 USING(course_id)
57
OUTER JOIN + Aggregation
• A particularly useful application of outer joins is for aggregation
• Example
– Print the IDs of all students along with the number of courses they have
taken in total in the year 2018
OUTER JOIN + Aggregation
58
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics 0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
takes
id course_id sec_id semester year grade
128 CS-101 1 Fall 2017 A
128 CS-347 1 Fall 2017 A12345 CS-101 1 Fall 2017 C
12345 CS-190 2 Spring 2017 A
12345 CS-315 1 Spring 2018 A
12345 CS-347 1 Fall 2017 A
19991 HIS-351 1 Spring 2018 B
23121 FIN-201 1 Spring 2018 C+
44553 PHY-101 1 Fall 2017 B45678 CS-101 1 Fall 2017 F
45678 CS-101 1 Spring 2018 B+
45678 CS-319 1 Spring 2018 B
54321 CS-101 1 Fall 2017 A54321 CS-190 2 Spring 2017 B+
55739 MU-199 1 Spring 2018 A76543 CS-101 1 Fall 2017 A
76543 CS-319 2 Spring 2018 A
76653 EE-181 1 Spring 2017 C
98765 CS-101 1 Fall 2017 C98765 CS-315 1 Spring 2018 B
98988 BIO-101 1 Summer 2017 A
98988 BIO-301 1 Summer 2018 null
59
OUTER JOIN + Aggregation
• A particularly useful application of outer joins is for aggregation
• Example
– Print the IDs of all students along with the number of courses they have
taken in total in the year 2018
SELECT id, count(course_id)
FROM student JOIN takes USING(id)
GROUP BY id
OUTER JOIN + Aggregation
60
id count
76653 1
76543 2
54321 2
55739 1
45678 3
98765 2
128 2
19991 1
44553 1
12345 4
98988 2
23121 1
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics 0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics 0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
61
OUTER JOIN + Aggregation
• A particularly useful application of outer joins is for aggregation
• Example
– Print the IDs of all students along with the number of courses they have
taken in total in the year 2018
SELECT id, count(course_id)
FROM student JOIN takes USING(id)
GROUP BY id
SELECT id, count(course_id)
FROM student LEFT OUTER JOIN takes USING(id)
GROUP BY id
OUTER JOIN + Aggregation
62
id count
76653 1
76543 2
54321 2
55739 1
45678 3
98765 2
128 2
19991 1
70557 0
44553 1
12345 4
98988 2
23121 1
student
id name dept_name tot_cred
128 Zhang Comp. Sci. 102
12345 Shankar Comp. Sci. 32
19991 Brandt History 80
23121 Chavez Finance 110
44553 Peltier Physics 56
45678 Levy Physics 46
54321 Williams Comp. Sci. 54
55739 Sanchez Music 38
70557 Snow Physics 0
76543 Brown Comp. Sci. 58
76653 Aoi Elec. Eng. 60
98765 Bourikas Elec. Eng. 98
98988 Tanaka Biology 120
63
TABLE ORDER
• Join expressions can be written in different sequences
• Example
– Print the names of instructors along with the courses they teach
– Logical level - Correctness
• The order does not matter - the queries are equivalent
– Physical level - Performance
• The order CAN matter - in most modern DBMSs, it does not
SELECT name, title
FROM instructor NATURAL JOIN teaches JOIN course USING(course_id)
SELECT name, title
FROM teaches JOIN course USING(course_id) NATURAL JOIN instructor
Performance issues
are related to the subject of
query optimization
64
TABLE ORDER
• In short, given that the query is correct:
– The order of tables in inner join operations does not affect the result
– The order of tables in left/right outer join operations always matters, as it
affects the result
– The order of tables in full outer join operations does not affect the result
• However, null values will appear in different places
65
Subquery VS Join
• SQL conceptually treats nested subqueries in the where clause
as functions that take parameters and return either a single value
or a set of values
– The technique of evaluating a nested subquery by invoking it as a function
is called correlated evaluation.
• Correlated evaluation is not very efficient,
– The subquery is evaluated separately for each tuple in the outer query
66
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
67
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
68
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
69
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
END OF LECTURE 4