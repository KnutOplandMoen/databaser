January 13, 2026
Lecture 2: Relational Model and Relational Algebra
Data Modeling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• Structure of relational databases
• Database schema
• Keys
• Relational algebra
The content of this lecture corresponds to Chapter 2 of the course textbook
The material also includes Notes 3.2 and 4.1
3
Relations
• Example instructor relation
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
attributes (or columnns)
tuples (or rows)
4
Attributes
• Let denote a relation with being its set of attributes
• The set of allowed values for each attribute is called the domain
of the attribute
• Attribute values are (normally) required to be atomic; that is,
indivisible
• The special value null is a member of every domain
– Indicates that the value is “unknown”
• The null value causes complications in the definition of many
operations
r(R) r R
5
Relations are Unordered
• Order of tuples is irrelevant
– Tuples may be stored in an arbitrary order
• Example: instructor relation with unordered tuples
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
6
Database Schema and Instance
• Database schema
– The logical structure of the database.
• Database instance
– The snapshot of the data in the database
at a given point in time
• Example:
– Schema
• instructor (ID, name, dept_name, salary)
– Instance:
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
7
Keys
• For a given relation , let
• is a superkey of if values for are sufficient to identify a
unique tuple of each possible relation
– Example: {id} and {id, name} are both superkeys of instructor
• Superkey is a candidate key if is minimal
– Example: {id} is a candidate key of instructor
• One of the candidate keys is selected to be the primary key
r(R) K ⊆ R
K R K
r(R)
K K
Example Schema Diagram
8
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
9
Relational Query Languages
• Procedural versus non-procedural, or declarative “Pure”
languages:
– Relational algebra
– Tuple relational calculus
– Domain relational calculus
• The above 3 pure languages are equivalent in computing power
• We will concentrate in this chapter on relational algebra
– Not turning-machine equivalent
– Consists of 6 basic operations
10
Relational Algebra
• Six basic operators
– select ( )
– project ( )
– Cartesian/cross product ( )
– union ( )
– set difference ( )
– renaming ( )
σ
π
×
∪
−
ρ
The result of a relational algebra operation is a relation, and therefore of relational
algebra operations can be composed together into a relational algebra expression
11
Relational Algebra
• Six basic operators
– select ( )
– project ( )
– Cartesian/cross product ( )
– union ( )
– set difference ( )
– renaming ( )
σ
π
×
∪
−
ρ
12
Select Operator
• The select operation selects tuples that satisfy a given predicate
• Notation:
• is called the selection predicate
– Indicates the condition that all tuples of the result must satisfy
p
σp(r)
13
Select Operator
• Example
– Select those tuples of the instructor relation where the instructor is in the
“Physics” department
• Query in RA:
• Result:
σdept_name=
′Physics′
(instructor)
instructor
id name dept_name salary
33456 Gold Physics 87000
22222 Einstein Physics 95000
14
Select Operator
• We allow comparisons using (equals), (not equals),
 (greater), (greater or equal), (less), (less or equal)
in the selection predicate
• We can combine several predicates into a larger predicate by
using the connectives (and), (or), (not)
= ≠
> ≥ < ≤
∧ ∨ ¬
15
Select Operator
• Example
– Find the instructors in Physics with a salary greater $90,000
σdept_name=
′Physics′ ∧ salary>90,000(instructor)
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
σdept_name=
′Physics′ ∧ salary>90,000(instructor)
id name dept_name salary
22222 Einstein Physics 95000
16
Select Operator
• We allow comparisons using (equals), (not equals),
 (greater), (greater or equal), (less), (less or equal)
in the selection predicate
• We can combine several predicates into a larger predicate by
using the connectives (and), (or), (not)
• The select predicate may include comparisons between two
attributes of the input relation
= ≠
> ≥ < ≤
∧ ∨ ¬
17
Select Operator
• Example
– Find all departments whose name is the same as their building name
σdept_name=building(department)
department
dept_name building budget
Biology Watson 90000
Comp. Sci. Taylor 100000
Elec. Eng. Taylor 85000
Finance Painter 120000
History Painter 50000
Music Packard 80000
Physics Watson 70000
σdept_name=building(department)
dept_name building budget
18
Relational Algebra
• Six basic operators
– select ( )
– project ( )
– Cartesian/cross product ( )
– union ( )
– set difference ( )
– renaming ( )
σ
π
×
∪
−
ρ
19
Project Operator
• The project operation returns its argument relation, with certain
attributes left out
• Notation:
• The result is defined as the relation of k columns obtained by
erasing the columns that are not listed
• Duplicate rows are removed from the result
– Recall: in relational algebra, relations are sets
ΠA1,A2,…,Ak
(r)
20
Project Operator
• Example
– Eliminate the dept_name attribute of instructor
Πid,name,salary(instructor)
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
Πid,name,salary(instructor)
id name salary
76766 Crick 72000
32343 El Said 60000
45565 Katz 75000
12121 Wu 90000
83821 Brandt 92000
33456 Gold 87000
76543 Singh 80000
10101 Srinivasan 65000
22222 Einstein 95000
15151 Mozart 40000
58583 Califieri 62000
98345 Kim 80000
• Example
– Find the names of all instructors in the physics department
– Instead of giving the name of a relation as the argument of the projection
operation, we give an expression that evaluates to a relation
21
Composition of Relational Operations
Πname(σdept_name=
′Physics′ σ (instructor)) dept_name=
′Physics′
(instructor)
22
Relational Algebra
• Six basic operators
– select ( )
– project ( )
– Cartesian/cross product ( )
– union ( )
– set difference ( )
– renaming ( )
σ
π
×
∪
−
ρ
23
Cross Product Operator
• The cross product operation combines information from any two
input relations
• Notation:
• The result contains tuples that are formed by combining each
tuple of with each tuple of
– To distinguish between attributes with the same name, we attach the name
of the relation from which the attribute originally came to the attribute name
ri rj
ri × rj
• Example
– Find the cross product of the relations instructor and teaches
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
Cross Product Operator
instructor × teaches
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
Result in
 the next slide
Cross Product Operator
25
instructor × teaches
instructor.id name dept_name salary teaches.id course_id sec_id semester year
76766 Crick Biology 72000 10101 CS-101 1 Fall 2017
76766 Crick Biology 72000 10101 CS-315 1 Spring 2018
76766 Crick Biology 72000 10101 CS-347 1 Fall 2017
76766 Crick Biology 72000 12121 FIN-201 1 Spring 2018
76766 Crick Biology 72000 15151 MU-199 1 Spring 2018
76766 Crick Biology 72000 22222 PHY-101 1 Fall 2017
76766 Crick Biology 72000 32343 HIS-351 1 Spring 2018
76766 Crick Biology 72000 45565 CS-101 1 Spring 2018
76766 Crick Biology 72000 45565 CS-319 1 Spring 2018
76766 Crick Biology 72000 76766 BIO-101 1 Summer 2017
76766 Crick Biology 72000 76766 BIO-301 1 Summer 2018
76766 Crick Biology 72000 83821 CS-190 1 Spring 2017
76766 Crick Biology 72000 83821 CS-190 2 Spring 2017
76766 Crick Biology 72000 83821 CS-319 2 Spring 2018
76766 Crick Biology 72000 98345 EE-181 1 Spring 2017
32343 El Said History 60000 10101 CS-101 1 Fall 2017
…
22222 Einstein Physics 95000 83821 CS-190 1 Spring 2017
…
98345 Kim Elec. Eng. 80000 98345 EE-181 1 Spring 2017
26
Union Operator
• The union operation allows us to combine two relations
• Notation:
• The result contains all tuples in and all tuples in
– Duplicates are excluded
ri rj
ri ∪ rj
• Example
– Find all courses taught in the Fall 2017 semester, or in the Spring 2018
semester, or in both
27
Union Operator
Πcourse_id(σsemester=
′Fall′∧year=2017(section))
Πcourse_id(σsemester=
′Spring′∧year=2018(section))
∪
• Example
– Find all courses taught in the Fall 2017 semester, or in the Spring 2018
semester, or in both
28
Union Operator
Πcourse_id(σsemester=
′Fall′∧year=2017(section)) ∪ Πcourse_id(σsemester=
′Spring′∧year=2018(section))
course_id
CS-101
CS-315
CS-319
CS-347
FIN-201
HIS-351
MU-199
PHY-101
29
Union Operator
• For to be valid
– and must have the same arity (same number of attributes, i.e., and
 must be of the same size)
– The attribute domains must be compatible
• The ith column of must contain the same type of values as the i
th column of
ri ∪ rj
ri rj Ri
Rj
ri rj
30
Set Difference Operator
• The set difference operation allows us to find tuples that are in
one relation but not in another
• Notation:
• The result contains all tuples that are both in and not in
• For the set difference operator to be valid, the same rules as for
the union operator (arity and compatibility) apply
ri rj
ri
− rj
• Example
– Find the set of all courses taught in the Fall 2017 semester, but not in the
Spring 2018 semester
31
Set Difference Operator
Πcourse_id(σsemester=
′Fall′∧year=2017(section))
Πcourse_id(σsemester=
′Spring′∧year=2018(section))
−
• Example
– Find the set of all courses taught in the Fall 2017 semester, but not in the
Spring 2018 semester
32
Set Difference Operator
Πcourse_id(σsemester=
′Fall′∧year=2017(section)) ∪ Πcourse_id(σsemester=
′Spring′∧year=2018(section))
course_id
CS-347
PHY-101
33
Rename Operator
• The results of relational-algebra expressions do not have a name
that we can use to refer to them. The rename operator is
provided for that purpose
• Notation:
• The operator returns the result of the expression under the
name
– Another form of the operator is
ρ E
x
ρx(A1,A2,…,An)
(E)
ρx(E)
34
Assignment Operator
• The assignment operation allows us to assign parts of a
relational algebra expression to temporary variables
• Notation:
var ← E
35
Assignment Operator
• Instead of
• We write
Πcourse_id(σsemester=
′Fall′∧year=2017(section)) ∪ Πcourse_id(σsemester=
′Spring′∧year=2018(section))
F2017 ← Πcourse_id(σsemester=
′Fall′∧year=2017(section))
S2018 ← Πcourse_id(σsemester=
′Spring′∧year=2018(section))
F2017 ∪ S2018
36
Intersection Operator
• The intersection operation allows us to combine two relations
• Notation:
• The result contains all tuples that are both in and in
• For the intersection operator to be valid, the same rules as for
the union operator (arity and compatibility) apply
ri rj
ri ∩ rj
• Example
– Find the set of all courses taught in both the Fall 2017 and the Spring
2018 semesters
37
Intersection Operator
Πcourse_id(σsemester=
′Fall′∧year=2017(section))
Πcourse_id(σsemester=
′Spring′∧year=2018(section))
∩
• Example
– Find the set of all courses taught in both the Fall 2017 and the Spring
2018 semesters
38
Intersection Operator
course_id
CS-101
39
Intersection Operator
• The intersection operator is not a basic operator but a derived
one, i.e., is can be expressed using basic operators
ri ∩ rj = (ri ∪ rj
) − ((ri
− rj
) ∪ (rj
− ri
))
40
Join Operator
• The cross product associates every tuple of one relation with
every tuple of another relation
• Example
– The cross product associates every tuple of the
relation instructor with every tuple of the relation teaches
• Most of the resulting rows have information about instructors who did NOT teach a
particular course
• It also matches tuples that contain information about an instructor, combined with
tuples regarding a course taught by a different instructor
instructor × teaches
Join Operator
41
instructor × teaches
instructor.id name dept_name salary teaches.id course_id sec_id semester year
76766 Crick Biology 72000 10101 CS-101 1 Fall 2017
76766 Crick Biology 72000 10101 CS-315 1 Spring 2018
76766 Crick Biology 72000 10101 CS-347 1 Fall 2017
76766 Crick Biology 72000 12121 FIN-201 1 Spring 2018
76766 Crick Biology 72000 15151 MU-199 1 Spring 2018
76766 Crick Biology 72000 22222 PHY-101 1 Fall 2017
76766 Crick Biology 72000 32343 HIS-351 1 Spring 2018
76766 Crick Biology 72000 45565 CS-101 1 Spring 2018
76766 Crick Biology 72000 45565 CS-319 1 Spring 2018
76766 Crick Biology 72000 76766 BIO-101 1 Summer 2017
76766 Crick Biology 72000 76766 BIO-301 1 Summer 2018
76766 Crick Biology 72000 83821 CS-190 1 Spring 2017
76766 Crick Biology 72000 83821 CS-190 2 Spring 2017
76766 Crick Biology 72000 83821 CS-319 2 Spring 2018
76766 Crick Biology 72000 98345 EE-181 1 Spring 2017
…
42
Join Operator
• Example
– The cross product associates every tuple of the
relation instructor with every tuple of the relation teaches
• Most of the resulting rows have information about instructors who did NOT teach a
particular course
• It also matches tuples that contain information about an instructor, combined with
tuples regarding a course taught by a different instructor
– To get only those tuples of that pertain to
instructors and the courses that they taught, we write
instructor × teaches
instructor × teaches
σinstructor.id=teaches.id(instructor × teaches)
Join Operator
43
σinstructor.id=teaches.id(instructor × teaches)
instructor.id name dept_name salary teaches.id course_id sec_id semester year
10101 Srinivasan Comp. Sci. 65000 10101 CS-101 1 Fall 2017
10101 Srinivasan Comp. Sci. 65000 10101 CS-315 1 Spring 2018
10101 Srinivasan Comp. Sci. 65000 10101 CS-347 1 Fall 2017
12121 Wu Finance 90000 12121 FIN-201 1 Spring 2018
15151 Mozart Music 40000 15151 MU-199 1 Spring 2018
22222 Einstein Physics 95000 22222 PHY-101 1 Fall 2017
32343 El Said History 60000 32343 HIS-351 1 Spring 2018
45565 Katz Comp. Sci. 75000 45565 CS-101 1 Spring 2018
45565 Katz Comp. Sci. 75000 45565 CS-319 1 Spring 2018
76766 Crick Biology 72000 76766 BIO-101 1 Summer 2017
76766 Crick Biology 72000 76766 BIO-301 1 Summer 2018
83821 Brandt Comp. Sci. 92000 83821 CS-190 1 Spring 2017
83821 Brandt Comp. Sci. 92000 83821 CS-190 2 Spring 2017
83821 Brandt Comp. Sci. 92000 83821 CS-319 2 Spring 2018
98345 Kim Elec. Eng. 80000 98345 EE-181 1 Spring 2017
44
Join Operator
• The join operation allows us to combine a select operation and a
cross product operation into a single operation
• Notation:
• is a predicate on attributes in the schema
• The join operation is defined as follows
θ Ri ∪ Rj
ri ⋈θ rj
ri ⋈θ rj
ri ⋈θ rj = σθ(ri × rj
)
45
Join Operator
• Example
– The cross product associates every tuple of the
relation instructor with every tuple of the relation teaches
• Most of the resulting rows have information about instructors who did NOT teach a
particular course
• It also matches tuples that contain information about an instructor, combined with
tuples regarding a course taught by a different instructor
– To get only those tuples of that pertain to
instructors and the courses that they taught, we write
instructor × teaches
instructor × teaches
σinstructor.id=teaches.id(instructor × teaches) = intructor ⋈instructor.id=teaches.id teaches
Join Operator
46
intructor ⋈instructor.id=teaches.id teaches
instructor.id name dept_name salary teaches.id course_id sec_id semester year
10101 Srinivasan Comp. Sci. 65000 10101 CS-101 1 Fall 2017
10101 Srinivasan Comp. Sci. 65000 10101 CS-315 1 Spring 2018
10101 Srinivasan Comp. Sci. 65000 10101 CS-347 1 Fall 2017
12121 Wu Finance 90000 12121 FIN-201 1 Spring 2018
15151 Mozart Music 40000 15151 MU-199 1 Spring 2018
22222 Einstein Physics 95000 22222 PHY-101 1 Fall 2017
32343 El Said History 60000 32343 HIS-351 1 Spring 2018
45565 Katz Comp. Sci. 75000 45565 CS-101 1 Spring 2018
45565 Katz Comp. Sci. 75000 45565 CS-319 1 Spring 2018
76766 Crick Biology 72000 76766 BIO-101 1 Summer 2017
76766 Crick Biology 72000 76766 BIO-301 1 Summer 2018
83821 Brandt Comp. Sci. 92000 83821 CS-190 1 Spring 2017
83821 Brandt Comp. Sci. 92000 83821 CS-190 2 Spring 2017
83821 Brandt Comp. Sci. 92000 83821 CS-319 2 Spring 2018
98345 Kim Elec. Eng. 80000 98345 EE-181 1 Spring 2017
47
Join Operator
• Similar to the set intersection, the join operator is not a basic
operator, but a derived one
• Why do we need to define these derived operators explicitly?
– Conceptual clarity
• Both operations are intuitive, and we do not think of them as a combination of others
– Readability
• Since these operations are quite common, it is much easier to write them explicitly
– Optimization
• Especially for join, query planners benefit from treating it as a primitive
48
Other Join Operators*
• Natural join
– replaces the predicate in with an implicit predicate that requires
equality over those attributes that appear in the schemas of both relations
• Outer joins
– left outer join
• preserves tuples only in the relation named to the left of the operation
– right outer join
• preserves tuples only in the relation named to the right of the operation
– full outer join
• preserves tuples in both relations
⋈
θ ⋈θ
⟥
⟥
⟥
* Part of extended relational algebra
Other Join Operators*
* Part of extended relational algebra 49
inner join
left outer join full outer join
right outer join
50
Aggregation Operator*
• The aggregation operation permits the use of aggregate
functions on relation attributes
• Notation:
– : attribute(s) to be grouped for which the aggregate is computed
– : an aggregate function
– : the attribute(s) to be aggregated
Ag
f
Aa
Ag
γf(Aa)
* Part of extended relational algebra
51
Aggregation Operator*
• Example
– Find the average salary of instructors in the Physics department
γavg(salary)
(σdept_name=
′Physics′
(instructor))
σdept_name=
′Physics′
(instructor)
id name dept_name salary
22222 Einstein Physics 95000
33456 Gold Physics 87000
γavg(salary)
(σdept_name=
′Physics′
(instructor))
salary
91000
* Part of extended relational algebra
52
Aggregation Operator*
• Example
– Find the average salary per department
dept_nameγavg(salary)
(instructor)
dept_nameγavg(salary)
(instructor)
dept_name
Finance 85000
History 61000
Physics 91000
Music 40000
Comp. Sci. 77333
Biology 72000
Elec. Eng. 80000
* Part of extended relational algebra
53
Equivalent Queries
• There is more than one way to write a query in relational algebra
• Example
– Find information about courses taught by instructors in the Physics
department with a salary greater than 90,000
– Query 1:
– Query 2:
– Query 3:
– The three queries are not identical; they are, however, equivalent; they
give the same result on any database
σdept_name=
′Physics′∧salary>90000(instructor)
σdept_name=
′Physics′
(σsalary>90000(instructor))
σsalary>90000(σdept_name=
′Physics′
(instructor))
54
Equivalent Queries
• Example
– Find information about courses taught by instructors in the Physics
department
– Query 1:
– Query 2:
– The two queries are not identical; they are, however, equivalent; they give
the same result on any database
σdept_name=
′Physics′
(instructor ⋈instructor.id=teaches.id teaches)
(σdept_name=
′Physics′
(instructor)) ⋈instructor.id=teaches.id teaches
55
Useful Tool for Practice
• RelaX - relational algebra calculator
– https://dbis-uibk.github.io/relax/landing
END OF LECTURE 2