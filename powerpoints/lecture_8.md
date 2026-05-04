February 5, 2026
Lecture 8: Relational Database Design Part 2/3
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• Reducing ER to relational schema
• Design issues
• Features of Good Relational Designs
The content of this lecture corresponds to Chapters 6 and 7,
Sections 6.7, 6.9, 7.1 of the course textbook
Summary of ER Notation
3
entity
att1
…
attM
rel_ship
entity set
relationship set
w_entity
watt1
…
wattM
rel_ship
weak entity set
identifying
relationship of
weak entity set
entityA
…
entityB
… rel_ship one to one
entityA
…
entityB
… rel_ship
entityA
…
entityB
… rel_ship
entityA
…
entityB
… rel_ship
one to many
many to one
many to many
entity
… rel_ship
entity
… rel_ship
partial participation full participation
entity
… rel_ship
role name
role rel_ship attA
attribute on a
relationship
entity
att1
att2
 att21
 att22
 att31
 att32
 att23
{att3}
…
attM simple attribute
multivalued attribute
composite attribute
primary key
w_entity
watt1
…
wattM
discriminating
attribute
4
ER Reduction to Relation Schemas
• Entity sets and relationship sets can be expressed uniformly as
relational schemas that represent the contents of the database
• A database which conforms to an ER diagram can be
represented by a collection of schemas
• For each entity set and relationship set there is a unique schema
that is assigned the name of the corresponding entity set or
relationship set
• Each schema has a number of columns (generally corresponding
to attributes), which have unique names
5
Entity Sets
• A strong entity set reduces to a schema with the same attributes
• The primary key of the entity set serves as the primary key of the
resulting schema
entity(att1, att2,att3,…, attM)
entity
att1
att2
att3
…
attM
6
Entity Sets
• A weak entity set becomes a table that includes a column for the
primary key of the identifying strong entity set
rel_ship
s_entity
att1
att2
…
attN
w_entity
watt1
…
wattM
s_entity(att1, att2,att3,…, attN)
w_entity(att1,watt1,…,wattM)
7
Entity Sets with Composite Attributes
• Composite attributes are flattened out by creating
a separate attribute for each component attribute
• Example
– Ignoring composite attributes, extended instructor
schema is
instructor
id
name
 first_name
 middle_initial
 last_name
addres
 street
 street_number
 street_name
 apt_number
 city
 state
 zip
{phone_number}
date_of_birth
age( )
instructor (id, first_name, middle_initial, last_name,
street_number,street_name, apt_number,
city,state,zip_code, date_of_birth)
8
Entity Sets with Multivalued Attributes
• A multivalued attribute of an entity is
represented by a separate schema
• Schema has attributes corresponding to the
primary key of and an attribute corresponding
to multivalued attribute
• Example
– Multivalued attribute phone_number of instructor
is represented by a schema
M E
EM
EM
E
M
instructor
id
name
 first_name
 middle_initial
 last_name
addres
 street
 street_number
 street_name
 apt_number
 city
 state
 zip
{phone_number}
date_of_birth
age( )
inst_phone(id, phone_number)
9
Relationship Sets
• The translation of a relationship set to a schema depends on the
type of the relationship
– One to one
– One to many
– Many to one
– Many to many
10
Relationship Sets
• A many-to-many relationship set is represented as a schema
with attributes for the primary keys of the two participating entity
sets, and any descriptive attributes of the relationship set
entity_A
attA1
…
attAM
entity_B
attB1
…
attBM
rel_ship rel_ship(attA1,attB1)
11
Relationship Sets
• Many-to-one and one-to-many relationship sets are represented
in the same fashion as many-to-many relationship sets
– However, sets that are total on the many-side can be represented by
adding an extra attribute to the “many” side, containing the primary key of
the “one” side
entity_A
attA1
…
attAM
entity_B
attB1
…
attBM
rel_ship
entity_A(attA1, …, attAM)
entity_B(attA1,attB1,…, attBN)
12
Relationship Sets
• For one-to-one relationship sets, either side can be chosen to act
as the “many” side
– That is, an extra attribute can be added to either of the tables
corresponding to the two entity sets
• If participation is partial on the “many” side, replacing a schema by an extra attribute in
the schema corresponding to the “many” side could result in null values
– In the case of full participation on both sides, a single relation may be
used
entity_A
attA1
…
attAM
entity_B
attB1
…
attBM
rel_ship
13
Relationship Sets and Weak Entities
• The schema corresponding to a relationship set linking a weak
entity set to its identifying strong entity set is redundant
rel_ship
s_entity
att1
att2
…
attN
w_entity
watt1
…
wattM
s_entity(att1, att2,att3,…, attN)
w_entity(att1,watt1,…,wattM)
14
Dealing with Redundancy
• For one-to-one relationship sets, either side can be chosen to act
as the “many” side
– That is, an extra attribute can be added to either of the tables
corresponding to the two entity sets
• If participation is partial on the “many” side, replacing a schema
by an extra attribute in the schema corresponding to the “many”
side could result in null values
15
Dealing with Redundancy
• The schema corresponding to a relationship set linking a weak
entity set to its identifying strong entity set is redundant
rel_ship
s_entity
att1
att2
…
attN
w_entity
watt1
…
wattM
s_entity(att1, att2,att3,…, attN)
w_entity(att1,watt1,…,wattM)
rel_ship(att1,watt1,…,wattM)
Example - ER to Relational Schema
16
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
Entity Sets
17
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
18
Entity Sets
• Strong entity sets reduce to schemas with the same attributes
student(id, name, tot_cred)
instructor(id, name,salary)
course(course_id, title, credits)
department(dept_name, building, budget)
classroom(building,room_number, capacity)
Weak Entity Sets
19
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
20
Weak Entity Sets
• The weak entity set section reduces to a schema in which the
primary key the primary key of the strong entity course, i.e.,
course_id, and the discriminator of section
section(course_id,sec_id,semester, year)
Relationship Sets
21
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
22
Relationship Sets
• Many-to-one and one-to-many relationships are represented in
the same fashion as many-to-many relationships
• BUT
– sets that are total on the many-side can be represented by adding an extra
attribute to the “many” side, containing the primary key of the “one” side
advisor(s_id, i_id)
inst_dept(id, dept_name)
stud_dept(id, dept_name)
course_dept(course_id, dept_name)
}Redundant
23
Relationship Sets
• Many-to-one and one-to-many relationships are represented in
the same fashion as many-to-many relationships
• BUT
– sets that are total on the many-side can be represented by adding an extra
attribute to the “many” side, containing the primary key of the “one” side
advisor(s_id, i_id)
student(id, name, tot_cred, dept_name)
instructor(id, name,salary, dept_name)
course(course_id, title, credits, dept_name)
Relationship Sets
24
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
25
Relationship Sets
• The relationship prereq is a many-to-many one
• Since there are roles refering to the same entiry, the relationship
is represented as a schema that uses the role indicators as
attribute names that form the primary key
prereq(course_id, prereq_id)
Relationship Sets
26
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
27
Relationship Sets
• All relationships are either one-to-many or many-to-many
teaches(id, course_id,sec_id,semester, year)
takes(id, course_id,sec_id,semester, year, grade)
sec_course(course_id,sec_id,semester, year)
sec_time_slot(course_id,secid,semester, year, time_slot_id)
sec_class(courseid,sec_id,semester, year, building,room_number)
Relationship Sets
28
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
29
Relationship Sets
• The entity course is the indentifying entity of session
• When we modeled the weak entity section, we already stored
this information
sec_course(course_id,sec_id,semester, year) } Redundant
section(course_id,sec_id,semester, year)
• All relationships are either one-to-many or many-to-many
teaches(id, course_id,sec_id,semester, year)
takes(id, course_id,sec_id,semester, year, grade)
sec_course(course_id,sec_id,semester, year)
sec_time_slot(course_id,secid,semester, year, time_slot_id)
sec_class(courseid,sec_id,semester, year, building,room_number)
30
Relationship Sets
section(course_id,sec_id,semester, year)
Relationship Sets
31
course_dept
inst_dept
advisor
teaches takes
sec_course sec_time_slot
sec_class
stud_dept
prereq
course
course_id
title
credits
section
sec_id
semester
year
classroom
building
room_number
capacity
time_slot
timeslot_id
[
 day
 start_time
 end_time
]
grade
student
id
name
tot_cred
instructor
id
name
salary
department
dept_name
building
budget
course_id prereq_id
• All relationships are either one-to-many or many-to-many
teaches(id, course_id,sec_id,semester, year)
takes(id, course_id,sec_id,semester, year, grade)
sec_time_slot(course_id,secid,semester, year, time_slot_id)
sec_class(courseid,sec_id,semester, year, building,room_number)
32
Relationship Sets
section(course_id,sec_id,semester, year)
• All relationships are either one-to-many or many-to-many
teaches(id, course_id,sec_id,semester, year)
takes(id, course_id,sec_id,semester, year, grade)
sec_class(courseid,sec_id,semester, year, building,room_number)
33
Relationship Sets
section(course_id,sec_id,semester, year, time_slot_id)
34
Relationship Sets
• All relationships are either one-to-many or many-to-many
section(course_id,sec_id,semester, year, time_slot_id, building,room_number)
teaches(id, course_id,sec_id,semester, year)
takes(id, course_id,sec_id,semester, year, grade)
35
Common Mistakes in ER Diagrams
• Incorrect use of attribute
– The use of attribute dept_name make the information about the department
the student belongs to duplicated
student
id
name
tot_cred
dept_name
department
dept_name
building
Budget
stud_dept
36
Common Mistakes in ER Diagrams
• Erroneous use of relationship attributes
– Primary keys of entities must stay on entities despite the fact that they are
the identifiers of relationships
student_id
student
id
name
tot_cred
dept_name
instructor
id
name
salary
advisor
instructor_id
37
Common Mistakes in ER Diagrams
• Erroneous use of relationship attributes
– The use of the attribute is wrong as assignment_marks is a single-valued
attribute while the situation requires a multivalued one
student
…
section
… stud_section
asssignment_marks
38
Common Mistakes in ER Diagrams
• Erroneous use of relationship attributes
– The use of the attribute is wrong as assignment_marks is a single-valued
attribute while the situation requires a multivalued one
– Correct approach
student
…
assignment
… marks_in
section
… sec_assign
asssignment_mark
39
Entity Sets vs Attributes
• Use of an entity allow storing more information and multiple
phone numbers
student
id
name
tot_cred
phone_number
dept_name
student
id
name
tot_cred
dept_name
phone
number
type
location
stud_phone
student
id
name
tot_cred
{phone_number}
dept_name
simple attribute multivalued attribute separate entity
40
Entity vs Relationship Sets
• It is not always clear whether an object is best expressed by an
entity set or a relationship set
student
id
name
tot_cred
takes
section
sec_id
semester
year
student
id
name
tot_cred
student_reg
registration
…
…
…
section_reg
section
sec_id
semester
year
41
ER Design Decisions
• The use of an attribute or entity set to represent an object.
• Whether a real-world concept is best expressed by an entity set
or a relationship set.
• The use of a ternary relationship versus a pair of binary
relationships.
• The use of a strong or weak entity set
• The use of specialization/generalization – contributes to
modularity in the design
• The use of aggregation – can treat the aggregate entity set as a
single unit without concern for the details of its internal structure
42
ER Design Decisions
• The use of an attribute or entity set to represent an object.
• Whether a real-world concept is best expressed by an entity set
or a relationship set.
• The use of a ternary relationship versus a pair of binary
relationships.
• The use of a strong or weak entity set
• The use of specialization/generalization – contributes to
modularity in the design
• The use of aggregation – can treat the aggregate entity set as a
single unit without concern for the details of its internal structure
43
Features of Good Relational Designs
• Suppose we combine instructor and department into in_dep, which
represents the natural join on the relations instructor and department
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
department
dept_name building budget
Biology Watson 90000
Comp. Sci. Taylor 100000
Elec. Eng. Taylor 85000
Finance Painter 120000
History Painter 50000
Music Packard 80000
Physics Watson 70000
44
Features of Good Relational Designs
• Suppose we combine instructor and department into in_dep, which
represents the natural join on the relations instructor and department
instructor
id name dept_name salary building budget
10101 Srinivasan Comp. Sci. 65000 Taylor 100000
12121 Wu Finance 90000 Painter 120000
15151 Mozart Music 40000 Packard 80000
22222 Einstein Physics 95000 Watson 70000
32343 El Said History 60000 Painter 50000
33456 Gold Physics 87000 Watson 70000
45565 Katz Comp. Sci. 75000 Taylor 100000
58583 Califieri History 62000 Painter 50000
76543 Singh Finance 80000 Painter 120000
76766 Crick Biology 72000 Watson 90000
83821 Brandt Comp. Sci. 92000 Taylor 100000
98345 Kim Elec. Eng. 80000 Taylor 85000
45
Features of Good Relational Designs
• Suppose we combine instructor and department into in_dep, which
represents the natural join on the relations instructor and department
– There is repetition of information
– Need to use null values
• if we add a new department with no instructors
46
Decomposition
• The only way to avoid the repetition-of-information problem in the
single schema is to decompose it into two schemas
• We want to decompose
in_dep(id, name,salary, dept_name, building, budget)
47
Decomposition
• The only way to avoid the repetition-of-information problem in the
single schema is to decompose it into two schemas
• We want to decompose
• To
in_dep(id, name,salary, dept_name, building, budget)
instructor(id, name,salary)
department(dept_name, building, budget)
48
Decomposition
• Not all decompositions are good
• Example
– Suppose we decompose
– To
– The problem arises when we have two employees with the
same name
employee(id, name,street, city,salary)
employee1(id, name)
employee2(name,street, city,salary)
49
Decomposition
• Lossy decomposition
– A lossy decomposition occurs when a relation is decomposed into two
or more relations and joining these decomposed relations
does not recreate the original relation exactly
• Lossless decomposition
– A lossless decomposition occurs when a relation is decomposed into
two or more relations and joining these decomposed relations
recreates the original relation exactly
R
R1,…, Rm
R
R1,…, Rm
50
Lossless Decompositon
• We say that a decomposition is a lossless decomposition if there
is no loss of information by replacing with the decomposed
relation schemas
• Formally
R
R1 ∪ … ∪ Rm
ΠR1
(r) ⋈ …ΠRN
(r) = r
51
Normalization Theory
• Decide whether a particular relation is in “good” form
• In the case that a relation is not in “good” form, decompose it
into set of relations such that
– Each relation is in good form
– The decomposition is a lossless decomposition
• Our theory is based on:
– functional dependencies
– multivalued dependencies
R
R
R1, R2,…, Rn
52
Functional Dependencies
• There are usually a variety of constraints (rules) on the data in
the real world
• For example, some of the constraints that are expected to hold in
a university database are:
– Students and instructors are uniquely identified by their ID
– Each student and instructor has only one name
– Each instructor and student is (primarily) associated with only one
department
– Each department has only one value for its budget, and only one
associated building.
53
Functional Dependencies
• An instance of a relation that satisfies all such real-world
constraints is called a legal instance of the relation
• A legal instance of a database is one where all the relation
instances are legal instances
• Constraints on the set of legal relations
• Require that the value for a certain set of attributes identifies
uniquely the value for another set of attributes
• A functional dependency is a generalization of the notion of a key
54
Multivalued Dependencies
• Suppose we record names of children, and phone numbers for
instructors
• If we were to combine these schemas to get
• Example data:
(99999, David, 512-555-1234)
(99999, David, 512-555-4321)
(99999, William, 512-555-1234)
(99999, William, 512-555-4321)
inst_child(ID, child_name)
inst_phone(ID, phone_number)
inst_info(ID, child_name, phone_number)
55
Multivalued Dependencies
• Suppose we record names of children, and phone numbers for
instructors
• If we were to combine these schemas to get
– Multivalued dependencies cover cases where one attribute in a relation
uniquely determines multiple independent sets of values for another
attribute
• Multivalued dependencies do not rule out the existence of certain tuples. Instead, they
require that other tuples of a certain form be present in the relation
inst_child(ID, child_name)
inst_phone(ID, phone_number)
inst_info(ID, child_name, phone_number)
END OF LECTURE 8