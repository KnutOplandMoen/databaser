February 3, 2026
Lecture 7: Relational Database Design Part 1/3
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• Introduction to database design
• Entity-Relationship model outline
The content of this lecture corresponds to Chapter 6,
Sections 6.1 - 6.6 of the course textbook
3
Web Application Development
• Example of a database application
DBMS
Web server Programming/Web-page
design language
SERVER SIDE CLIENT SIDE
4
Application Architectures
• To handle their complexity, large applications are often broken
into several layers
– Presentation or user-interface layer
• Deals with user interaction
– Business-logic layer
• Provides a high-level view of data and actions on data
– Data-access layer
• Provides the interface between the business-logic layer and the underlying database
• Many applications use an object-oriented language to code the business-logic layer
and use an object-oriented model of data, while the underlying database is relational
Software Development Lifecycle
*Image from https://medium.com/@artjoms/software-development-life-cycle-sdlc-6155dbfe3cbc 5
Database design happens here
6
Database Design Phases
• Initial phase
– Characterize the data needs of the prospective database users fully
• Second phase
– choosing a data model
• Applying the concepts of the chosen data model
• Translating these requirements into a conceptual schema of the database
• A fully developed conceptual schema indicates the functional requirements of the
enterprise.
– Describe the kinds of operations (or transactions) that will be performed on the data.
7
Database Design Phases
• Final Phase
– Moving from an abstract data model to the implementation of the
database
– Logical Design
• Database design requires that we find a “good” collection of relation schemas
• Business decision – What attributes should we record in the database?
• Computer Science decision – What relation schemas should we have, and how should
the attributes be distributed among the various relation schemas?
– Physical Design
• Deciding on the physical layout of the database
8
Design Alternatives
• In designing a database schema, we must ensure that we avoid
two major pitfalls
– Redundancy
• A bad design may result in repeated information, which, in turn, may lead to data
inconsistency among the various copies of information
– Incompleteness
• A bad design may make certain aspects of the enterprise difficult or impossible to
model
• Avoiding bad designs is not enough
– There may be a large number of good designs to choose from
Schema Diagram for University DB
9
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
10
Design Approaches
• Entity Relationship Model
– Models an enterprise as a collection of entities and relationships
• Entity: a “thing” or “object” in the enterprise that is distinguishable from other objects
– Described by a set of attributes
• Relationship: an association among several entities
– Represented diagrammatically by an entity-relationship diagram
(next slide)
• Normalization Theory
– Formalize what designs are bad, and test for them
ER for University Database
11
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
12
Entity Sets
• An entity is an object that exists and is distinguishable from other
objects
– Example
• Specific person, company, event, plant, etc.
• An entity set is a set of entities of the same type that share the
same properties
– Example
• Set of all persons, companies, trees, holidays, etc.
13
Entity Sets
• An entity is represented by a set of attributes; i.e., descriptive
properties possessed by all members of an entity set
• Example:
• A subset of the attributes forms a primary key of the entity set;
i.e., uniquely identifying each member of the set
instructor = (ID, name,salary)
course = (course_id, title, credits)
• Entity sets can be represented graphically as follows:
– Rectangles represent entity sets
– Attributes listed inside the entity rectangle
– Underline indicates primary key attributes
14
Representing Entity Sets in ER
instructor
id
name
salary
student
id
name
tot_cred
advisor
15
Relationship Sets
• A relationship is an association among several entities
• Example
• A relationship set is a mathematical relation among
entities, each taken from entity sets
• where is a relationship
n ≥ 2
(e1, e2, …, en)
(Peltier) 44553 advisor 22222 (Einstein)
student entity
{
relationship set
{
instructor entity
{
{(e1, e2, …, en)| e1 ∈ E1, e2 ∈ E2,…, en ∈ En}
16
Relationship Sets
• Example
• We define the relationship set advisor to denote the associations
between students and the instructors who act as their advisors
• Pictorially, we draw a line between related entities
(44553,22222) ∈ advisor
76766 Crick
45565 Katz
10101 Srinivasan
98345 Singh
76543 Kim
22222 Einstein
98988 Tanaka
12345 Shankar
128 Zhang
76543 Brown
76653 Aoi
23121 Chavez
44553 Peltier
instructor student
17
Relationship Sets
• Diamonds represent relationship sets
instructor
id
name
salary
student
id
name
tot_cred
advisor
Relationship Sets
• An attribute can also be associated with a relationship set
– For instance, the advisor relationship set between the entity sets
instructor and the student may have the attribute date, which tracks when
the student started being associated with the advisor
76766 Crick
45565 Katz
10101 Srinivasan
98345 Singh
76543 Kim
22222 Einstein
98988 Tanaka
12345 Shankar
128 Zhang
76543 Brown
76653 Aoi
23121 Chavez
44553 Peltier
3 May 2008
10 june 2007
12 June 2006
6 June 2009
30 June 2007
21 May 2007
4 May 2006
18
18
student instructor
19
Relationship Sets
• Rectangles connected to diamonds using a dashed line
represent attributes to relationship sets
instructor
id
name
salary
student
id
name
tot_cred
advisor
start_date
20
Roles
• Entity sets of a relationship need not be distinct
– Each occurrence of an entity set plays a “role” in the relationship
• The labels course_id and prereq_id are called roles
prereq
course
course_id
title
credits
course_id prereq_id
21
Degree of a Relationship Set
• Binary relationship
– Involves two entity sets (degree two)
– Most relationship sets in a database system are binary
instructor
id
name
salary
student
id
name
tot_cred
advisor
22
Non-binary Relationship Sets
• Relationships between more than two entity sets are rare
• However, there are occasions when it is more convenient to
represent relationships as non-binary
– Example
• Students work on research projects under the guidance of an instructor
• Relationship proj_guide is a ternary relationship between instructor, student, and project
instructor
id
name
salary
student
id
name
tot_cred
proj_guide
project
…
23
Complex Attributes
• Attribute types:
– Simple and composite attributes
– Single-valued and multivalued attributes
– Example
• multivalued attribute: phone_numbers
• Derived attributes
– Can be computed from other attributes
– Example
• age, given date_of_birth
• The set of permitted values for each attribute is called the domain
24
Composite Attributes
• Composite attributes allow us to divide attributes into subparts
(other attributes)
name
first_name middle_initial last_name street city state postal_code
address
street_number street_name apartment_number
Complex Attributes in ER
25
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
26
Mapping Cardinality Constraints
• Express the number of entities to which another entity can be
associated via a relationship set
• Most useful in describing binary relationship sets
• For a binary relationship set the mapping cardinality must be one
of the following types:
– One to one
– One to many
– Many to one
– Many to many
Mapping Cardinalities
27
a1
a2
a3
a4
b1
b2
b3
a1
a2
a3
b1
b2
b3
b4
b5
One to one One to many
Note: Some elements in A and B may not be mapped to any elements in the other set
A B A B
Mapping Cardinalities
28
a1
a2
a3
a4
b1
b2
b3
b1
b2
b3
b4
Many to one Many to many
a5
a1
a2
a3
a4
Note: Some elements in A and B may not be mapped to any elements in the other set
A B A B
29
Cardinality Constraints in ER
• We express cardinality constraints by drawing between the
relationship set and the entity set
– a directed line (→) signifying “one”
– an undirected line (—), signifying “many”
entityA
…
entityB
… relationship
entityA
…
entityB
… relationship
entityA
…
entityB
… relationship
entityA
…
entityB
… relationship
One to one One to many
Many to one Many to many
30
Cardinality Constraints in ER
• Example
– What do cardinality constraints mean for "advisor"?
• One-to-one relationship
– A student has at most one instructor as "advisor"
– An instructor is the "advisor" of at most one student
instructor
id
name
salary
student
id
name
tot_cred
advisor
31
Cardinality Constraints in ER
• Example
– What do cardinality constraints mean for "advisor"?
• One-to-many relationship
– A student has at most one instructor as "advisor"
– An instructor is the "advisor" of several students (or none)
instructor
id
name
salary
student
id
name
tot_cred
advisor
32
Cardinality Constraints in ER
• Example
– What do cardinality constraints mean for "advisor"?
• Many-to-one relationship
– A student has several "advisors" (or none)
– An instructor is the "advisor" of at most one student
instructor
id
name
salary
student
id
name
tot_cred
advisor
33
Cardinality Constraints in ER
• Example
– What do cardinality constraints mean for "advisor"?
• Many-to-many relationship
– A student has several "advisors" (or none)
– An instructor is the "advisor" of several students (or none)
instructor
id
name
salary
student
id
name
tot_cred
advisor
34
Total and Partial Participation
• Total participation
– Indicated by a double line
– Every entity in the entity set participates in at least one relationship in the
relationship set
• Partial participation
– Indicated by a single line
– Some entities may not participate in any relationship in the relationship set
instructor
id
name
salary
student
id
name
tot_cred
advisor
35
Notation for Complex Constraints
• A line may have associated cardinality limits
– Shown as , where is the minimum and the maximum cardinality
• A minimum value of indicates total participation
• A maximum value of indicates that the entity participates in at most one relationship
• A maximum value of indicates no limit
l . . h l h
1
1
*
instructor
id
name
salary
student
id
name
tot_cred
advisor 0..* 1..1
36
Weak Entity Sets
• Consider a section entity, which is uniquely identified by a
course_id, semester, year, and sec_id
– Clearly, section entities are related to course entities
• Suppose we create a relationship set sec_course between entity
sets section and course
– The information in sec_course is redundant
– Section already has an attribute course_id, which identifies the course with
which the section is related
37
Weak Entity Sets
• How do we deal with the redundancy?
– One option is to get rid of the relationship sec_course
• However, by doing so, the relationship between section and course becomes implicit in
an attribute, which is not desirable
– An alternative way to deal with this redundancy is to not store the attribute
course_id in the section entity and to only store the remaining attributes
section_id, year, and semester
• However, the entity set section then does not have enough attributes to identify a
particular section entity uniquely
38
Weak Entity Sets
• To deal with this problem, we treat the relationship sec_course as
a special relationship that provides extra information
– In this case, the course_id, required to identify section entities uniquely
• A weak entity set is one whose existence is dependent on
another entity, called its identifying entity
• An entity set that is not weak is termed strong entity set
sec_course
39
Weak Entity Sets in ER
• In E-R diagrams, a weak entity set is depicted via a double
rectangle
• The relationship set connecting the weak entity set to the
identifying strong entity set is depicted by a double diamond
course
course_id
title
credits
section
sec_id
semester
year
sec_course
40
Primary Key
• Primary keys provide a way to specify how entities and relations
are distinguished
• We consider
– Entity sets
– Relationship sets
– Weak entity sets
41
Primary Key for Entity Sets
• By definition, individual entities are distinct
• From a database perspective, the differences among them must
be expressed in terms of their attributes
– The values of the attributes of an entity must be such that they can
uniquely identify the entity
– No two entities in an entity set are allowed to have exactly the same value
for all attributes
• A key for an entity is a set of attributes that suffice to distinguish
entities from each other
42
Primary Key for Relationship Sets
• To distinguish among the various relationships of a relationship
set we use the individual primary keys of the entities in the
relationship set
– Let be a relationship set involving entity sets
– The primary key for is consists of the union of the primary keys of entity
sets
– If the relationship set has attributes associated with it,
then the primary key of also includes the attributes
R E1, E2,…, En
R
E1, E2,…, En
R A1, A2, …, Am
R A1, A2,…, Am
43
Primary Key for Relationship Sets
• The choice of the primary key for a relationship set depends on
the mapping cardinality of the relationship set
– Many-to-Many relationships: the preceding union of the primary keys is a
minimal superkey and is chosen as the primary key
– One-to-Many relationships: the primary key of the “Many” side is a
minimal superkey and is used as the primary key.
– Many-to-one relationships: the primary key of the “Many” side is a minimal
superkey and is used as the primary key.
– One-to-one relationships: the primary key of either one of the participating
entity sets forms a minimal superkey, and either one can be chosen as the
primary key.
44
Primary Key for Weak Entity Sets
• Instead of associating a primary key with a weak entity, we use
the identifying entity, along with extra attributes called
discriminator to uniquely identify a weak entity
– Every weak entity must be associated with an identifying entity
• The weak entity set is said to be existence dependent on the identifying entity set
– The identifying entity set is said to own the weak entity set that it identifies
• The relationship associating the weak entity set with the
identifying entity set is called the identifying relationship
sec_course
45
Primary Key for Weak Entity Sets
• In E-R diagrams, a weak entity set is depicted via a double
rectangle
• The relationship set connecting the weak entity set to the
identifying strong entity set is depicted by a double diamond
• We underline the discriminator of a weak entity set with a
dashed line
course
course_id
title
credits
section
sec_id
semester
year
sec_course
46
Primary Key for Weak Entity Sets
• Note that the relational schema we eventually create from the
entity set section does have the attribute course_id
– Even though we have dropped the attribute course_id from the entity set
section
section
course_id
sec_id
semester
year
building
room_number
time_slot_id
sec_course
course
course_id
title
credits
section
sec_id
semester
year
47
Redundant Attributes
• Suppose we have entity sets:
– student, with attributes: ID, name, tot_cred, dept_name
– department, with attributes: dept_name, building, budget
• We model the fact that each student has an associated
department using a relationship set stud_dept
student
id
name
tot_cred
dept_name
department
dept_name
building
budget
stud_dept
48
Redundant Attributes
• The attribute dept_name in student below replicates information
present in the relationship and is therefore redundant
• Therefore, it needs to be removed
• However
– when converting back to tables, in some cases the attribute gets
reintroduced, as we will see later
student
id
name
tot_cred
dept_name
department
dept_name
building
budget
stud_dept
48
49
Why ER?
• Do we really need ER diagrams?
– Strictly speaking, no
– There is no strict technical requirement to use ER diagrams
• ER diagrams
– help you understand the conceptual structure first
– prevent wrong assumptions
– provide better communication with teammates and stakeholders
– act as long-term documentation
• Similar to OO software design
– You can skip C4, BPMN, UML, and write code for classes directly 😱
ER vs Relational Model
50
ER Model Relational Model
Purpose Conceptual modeling Logical/physical modeling
Representation Diagram (graph-based) Tables (set theory)
Focus Entities + relationships Relations + keys + constraints
Used by Analysts, architects Developers, DBAs
Stage Early design Implementation
*Slide compiled with the assistance of MS Copilot
51
ER vs Relational Model
• For instance, ER allows the exact high-level representation of
some relationships that are implicit in the relational model
• Example
ER vs Relational Model
52
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
ER vs Relational Model
53
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
54
ER vs Relational Model
• For instance, ER allows the exact high-level representation of
some relationships that are implicit in the relational model
• Example
– In both cases, it is clear that a student can only be enrolled in one
department
• While in the schema design, this relationship is implicit, in the ER it is explicitly stated
using the relevant shapes and lines (more on this later)
END OF LECTURE 7