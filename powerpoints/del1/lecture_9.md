February 10, 2026
Lecture 9: Relational Database Design Part 3/3
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Outline
• Functional dependencies
• Decomposition using functional dependencies
• Normal Forms
The content of this lecture corresponds to Chapter 7,
Sections 7.1-7.3 and 7.6 of the course textbook
3
Normalization Theory
• Decide whether a particular relation is in “good” form
• In the case that a relation is not in “good” form, decompose it
into set of relations such that
– Each relation is in good form
– The decomposition is a lossless decomposition
• What is “good” and what is “bad”?
R
R
R1, R2,…, Rn
4
Recall: Design Alternatives
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
5
Bad Database Design
• Storing data redundantly or intermixing information about
different concepts in the same relation is a source of problems
• In the following table
– The phone number of each instructor is stored redundantly
– The concepts course and instructor are stored intermixed
course
course_id title i_name phone
1234 Database Systems Theodoros 4225
5342 Computer Architecture Theodoros 4225
7834 Pedagogics Zachary 4741
9111 Computer Graphics Zachary 4741
6
Update Anomalies
• When a single mini-world fact needs to be changed (e.g., update
phone number for Theodoros), multiple tuples must be updated
– complicates the code of application programs
– degrades run-time performance
– may introduce inconsistencies that are hard to correct
7
Insertion Anomalies
• The phone number of a new instructor cannot be inserted into
the database until it is known what course(s) they will teach
– Since CRN is a key, it cannot be set to NULL.
• Such insertion anomalies arise when unrelated concepts (i.e., courses and instructors’
phone numbers) are stored together in a single table.
• A relational table should encode a single (partial) function
course
course_id title i_name phone
1234 Database Systems Theodoros 4225
5342 Computer Architecture Theodoros 4225
7834 Pedagogics Zachary 4741
9111 Computer Graphics Zachary 4741
? ? Maria 4227
8
Deletion Anomalies
• When the last course of an instructor is deleted, their phone
number is lost
– Even if CRN could be set to NULL, it would be strange that all courses
held by an instructor may be deleted but the last
• Again, such deletion anomalies arise when unrelated concepts
(i.e., courses and instructors’ phone numbers) are stored
together in a single table
9
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
10
Functional Dependencies
• Let be a relation with its relation schema
• The functional dependency
• holds on if and only if for any legal relations , whenever
any two tuples and of agree on the attributes , they also
agree on the attributes
r(R) R
R r(R)
t
1 t
2 r a
β
a ⊆ R and β ⊆ R
a → β
t
1[α] = t
2[α] ⇒ t
1[β] = t
2[β]
11
Functional Dependencies
• Example
– Consider the relation r
– What are some functional dependencies that hold?
• does not hold
• does not hold
• holds
A → B
B → D
A → C
r
A B C D
a1 b1 c1 d1
a1 b2 c1 d2
a2 b2 c2 d2
a2 b3 c2 d3
a3 b3 c2 d4
r
A B C D
a1 b1 c1 d1
a1 b2 c1 d2
a2 b2 c2 d2
a2 b3 c2 d3
a3 b3 c2 d4
r
A B C D
a1 b1 c1 d1
a1 b2 c1 d2
a2 b2 c2 d2
a2 b3 c2 d3
a3 b3 c2 d4
r
A B C D
a1 b1 c1 d1
a1 b2 c1 d2
a2 b2 c2 d2
a2 b3 c2 d3
a3 b3 c2 d4
r
A B C D
a1 b1 c1 d1
a1 b2 c1 d2
a2 b2 c2 d2
a2 b3 c2 d3
a3 b3 c2 d4
12
Functional Dependencies
• Given a set set of functional dependencies, there are certain
other functional dependencies that are logically implied by
– If and it is implied that
• The set of all functional dependencies logically implied by is
the closure of
• We denote the closure of by
F
F
A → B B → C A → C
F
F
F F+
13
Functional Dependencies
• A functional dependency is trivial if it is satisfied by all instances
of a relation
–
–
• In general, is trivial if
id, name → id
name → name
α → β β ⊆ α
14
Recall: Keys
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
15
Functional Dependencies and Keys
• is a superkey for relation schema if and only if
– In other words, if
• is a candidate key for if and only if
– , and
–
K R K → R
t
1[K] = t
2[K] ⇒ t
1[R] = t
2[R]
K R
K → R
∃/ a ⊂ K : a → R
16
Functional Dependencies and Keys
• Functional dependencies allow us to express constraints that
cannot be expressed using superkeys
• Example
– Consider the schema:
– We expect some functional dependencies to hold:
•
,
– but not
•
id → name id → budget
dept_name → salary
in_dep(id, name,salary, dept_name, building, budget)
17
Use of Functional Dependencies
• We use functional dependencies to:
– To test relations to see if they are legal under a given set of functional
dependencies
• If a relation r is legal under a set F of functional dependencies, we say that r satisfies F
– To specify constraints on the set of legal relations
• We say that F holds on R if all legal relations on R satisfy the set of functional
dependencies F
• Note: A specific instance of a relation schema may satisfy a
functional dependency even if the functional dependency does
not hold on all legal instances
– For example, a specific instance of instructor may satisfy name → id
18
Use of Functional Dependencies
• There are tools for analysing example database states for
possible FDs
– If an FD does not hold in the example state, it cannot hold in general
– If an FD does hold in the example state, the database designer needs to
decide whether it holds in general
• Database design based on normal forms requires the database
designer to collect all FDs that generally hold in the mini-world
– This design task that cannot be automated
– It is actually sufficient to collect a representative subset of FDs that
implies all valid FDs
19
Use of Functional Dependencies
• Example
– The following table contains information about database textbooks and
their authors
– What are some functional dependencies in this scenario?
book
author no title publisher isbn
Elmasri 1 Fund. of DBS Addison-W. 805317554
Navathe 2 Fund. of DBS Addison-W. 805317554
Silberschatz 1 DBS Concepts Mc-Graw H. 471365084
Korth 2 DBS Concepts Mc-Graw H. 471365084
Sudarshan 3 DBS Concepts Mc-Graw H. 471365084
20
Use of Functional Dependencies
• Example
– The ISBN uniquely identifies a single book
– Thus, the following FD holds
– equivalently, we could use two FDs
– Since a book may have several authors, the following FD does not hold
isbn → title, publisher
isbn → title
isbn → publisher
isbn → author
21
Use of Functional Dependencies
• Example
– One author can write many books, thus the following FD may not be
assumed, even though it happens to hold in the given example DB state:
– It is possible that there are books with the same title but different authors
and different publishers. So, title determines no other attribute
author → title
22
Use of Functional Dependencies
• Example
– For every book (we now know: books are identified by ISBN), there can
only be one first (second, third, …) author
– At first glance, the author of any given book is also uniquely assigned a
position in the authorship sequence
– but this might be violated by authors with the same name
isbn, no → author
isbn, author → no
23
Use of Functional Dependencies
• Example
– We might also be tempted to assume the FD
– but if, in a new book edition, the authorship sequence changes, we are in
trouble
publisher, title, no → author
24
Use of Functional Dependencies
• During database design, only unquestionable FDs should be used
– database normalization alters the table structure based on the
specified FDs
– if it turns out that an FD does not hold, it is not sufficient to simply remove a
constraint (e.g., a key) from the schema
– instead, tables will be created or deleted, data will be copied, and
application programs may have to be changed
25
Lossless Decomposition with FD
• We can use functional dependencies to show when certain
decomposition are lossless
• Given a relation a decomposition of into and is
lossless if at least one of the following dependencies is in
–
–
• The above functional dependencies are a sufficient condition for lossless join
decomposition
• The dependencies are a necessary condition only if all constraints are functional
dependencies
r(R) R R1 R2
F+
R1 ∩ R2 → R1
R1 ∩ R2 → R2
26
Lossless Decomposition with FD
• Example: and
• Decomposition:
– Lossless decomposition
–
• Decomposition:
– Lossless decomposition
–
R = (A, B,C) F = {A → B, B → C}
R1 = (A, B), R2 = (B,C)
R1 ∩ R2 = {B} and B → {B,C}
R1 = (A,C), R2 = (B,C)
R1 ∩ R2 = {A} and A → {A, B}
27
Dependency Preservation
• Testing functional dependency constraints each time the
database is updated can be costly
• It is useful to design the database in a way that constraints can
be tested efficiently
• If testing a functional dependency can be done by considering
just one relation, then the cost of testing this constraint is low
• When decomposing a relation it may no longer be possible to do
the testing without having to perform a cross product
• A decomposition that makes it computationally hard to enforce
functional dependency is said to be NOT dependency preserving
28
Dependency Preservation
• Example
– Consider this ER diagram
– The relation derived from the dept_advisor
instructor
id
name
salary
department
dept_name
building
Budget
dept_advisor
student
id
name
tot_cred
dept_advisor(s_id, i_id, dept_name)
29
Dependency Preservation
• Example
– The relation derived from the dept_advisor
– Suppose we also have the additional constraint that “an instructor can act
as advisor for only a single department.”
• This implies the following functional dependencies
– In the above design, we are forced to repeat the department_name once for
each time an instructor participates in a dept_advisor relationship
dept_advisor(s_id, i_id, dept_name)
i_id → dept_name
s_id, dept_name → i_id
30
Dependency Preservation
• Example
– In this design, we are forced to repeat the department_name once for each
time an instructor participates in a dept_advisor relationship
– To fix this, we need to decompose dept_advisor
– No decomposition will include all the attributes in
– Hence, our design is not dependency preserving as it does not permit the
enforcement of the functional dependency without a join
s_id, dept_name → i_id
dept_advisor(s_id, i_id, dept_name)
i_id → dept_name
s_id, dept_name → i_id
31
Goals of Normalization
• Let be a relation scheme with a set of functional
dependencies
• Decide whether a relation scheme is in “good” form.
– In the case that a relation scheme R is not in “good” form, decompose it
into a set of relation scheme such that
• Each relation scheme is in good form
• The decomposition is a lossless decomposition
• Preferably, the decomposition should be dependency preserving
R F
R
R1, R2,…, Rn
32
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form
33
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form
34
1NF - First Normal Form
• A relational schema is in first normal form (1NF) if the
domains of all attributes of are atomic
– Non-atomic values complicate storage and encourage redundant
(repeated) storage of data
– Example
• Set of accounts stored with each customer, and set of owners stored with each
account
• In general, all relations are assumed to be in 1NF by default
– 1NF is a bit special in the way that it deals with a different problem that
causes redundancy than the higher normal forms
R
R
35
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form
36
2NF - First Normal Form
• A relation schema is in second normal form (2NF) if each
attribute in meets one of the following criteria:
– appears in a candidate key
– is not partially dependent on a candidate key
• A functional dependency is called a partial dependency
if there is a proper subset such that
• Every relation that is in 3NF is also in 2NF, e.g., every partial
dependency is a transitive dependency
• Every relation in 2NF is also in 1NF
R
A R
A
A
α → β
γ ⊂ α γ → β
37
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form
38
BCNF - Boyce-Codd Normal Form
• A relation schema is in BCNF with respect to a set of
functional dependencies if for all functional dependencies in
of the form
where and at least one of the following holds:
– is trivial
– is a superkey for R
R F
F+
α ⊆ R β ⊆ R
α → β
α → β
39
BCNF - Boyce-Codd Normal Form
• Example
– The schema is not in BCNF
– The functional dependency holds on
, but is not a superkey
in_dep
dept_name → building, budget
in_dep dept_name
in_dep(id, name,salary, dept_name, building, budget)
40
BCNF - Boyce-Codd Normal Form
• Example
– The schema is not in BCNF
– The functional dependency holds on
, but is not a superkey
in_dep
dept_name → building, budget
in_dep dept_name
in_dep(id, name,salary, dept_name, building, budget)
41
Decomposing a Schema into BCNF
• Let be a schema that is not in BCNF
• Let be the dependency that causes a violation of BCNF
• We decompose into
–
–
R R
α → β
R
(α ∪ β)
(R − (β − α))
42
Decomposing a Schema into BCNF
• In the example, we have
–
–
• Therefore, is replaced by
–
–
• The resulting relations are in BCNF, i.e.,
α = dept_name
β = building, budget
in_dep
(α ∪ β) = (dept_name, building, budget)
(R − (β − α)) = (ID, name, dept_name,salary)
instructor(id, name,salary, dept_name)
department(dept_name, building, budget)
43
BCNF and Dependency Preservation
• It is not always possible to achieve both BCNF and dependency
preservation
44
Recall Dependency Preservation
• Example
– In this design, we are forced to repeat the department_name once for each
time an instructor participates in a dept_advisor relationship
– To fix this, we need to decompose dept_advisor
– No decomposition will include all the attributes in
– Hence, our design is not dependency preserving as it does not permit the
enforcement of the functional dependency without a join
s_id, dept_name → i_id
dept_advisor(s_id, i_id, dept_name)
i_id → dept_name
s_id, dept_name → i_id
45
BCNF and Dependency Preservation
• It is not always possible to achieve both BCNF and dependency
preservation
• Example
– is not in BCNF
– is not a superkey
– BUT
• No decomposition will include all the attributes in
• Hence, the decomposition is NOT going to be dependency preserving
dept_advisor(s_id, i_id, dept_name)
i_id
s_id, dept_name → i_id
46
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form
47
3NF - Third Normal Form
• A relation schema is in third normal form (3NF) if for all:
• at least one of the following holds
– is trivial
– is a superkey for R
– Each attribute in is contained in a candidate key for
• This condition is a minimal relaxation of BCNF to ensure dependency preservation
• If a relation is in BCNF it is in 3NF
R
α → β
α
A β − α R
α → β ∈ F+
“I believe in a key, an only key, and nothing but the key, so help me Codd.”
48
3NF - Third Normal Form
• Example
– Consider the following schema
– the following functional dependencies
– two candidate keys
– We have seen before that dept_advisor is not in BCNF
= {s_id, dept_name}, {s_id, i_id}
dept_advisor(s_id, i_id, dept_name)
i_id → dept_name
s_id, dept_name → i_id
49
3NF - Third Normal Form
• R, however, is in 3NF
– is a superkey
– and is NOT a superkey, but:
• and
• is contained in a candidate key
s_id, dept_name
i_id → dept_name i_id
{dept_name} − {i_ID} = {dept_name}
dept_name
50
3NF vs BCNF
• Advantages to 3NF over BCNF
– It is always possible to obtain a 3NF design without sacrificing
losslessness or dependency preservation
• Disadvantages to 3NF
– We may have to use null values to represent some of the possible
meaningful relationships among data items
– There is the problem of repetition of information
51
Redundancy in 3NF
• Consider the schema below, which is in 3NF
–
–
– Instance table (on the right)
• Problems
– Repetition of information
– Need to use null values
R
R = (J,K, L)
F = {JK → L, L → K} J L K
j1 l1 k1
j2 l1 k1
j3 l1 k1
null l2 k2
52
3NF vs BCNF
• In practice
– There are some situations where
• In some cases, BCNF may not dependency preserving, and efficient checking for FD
violation on updates is important
– Solution: define a weaker normal form, called Third Normal Form (3NF)
• Allows some redundancy
• Functional dependencies can be checked on individual relations efficienty (without
computing a join)
– There is always a lossless-join, dependency-preserving decomposition
into 3NF
53
How Good is BCNF?
• There are database schemas in BCNF that do not seem to be
sufficiently normalized
• Example
– where an instructor may have more than one phone and can have
multiple children
• There are no non-trivial functional dependencies and therefore
the relation is in BCNF, but
inst_info(id, child_name, phone)
(99999, David, 512-555-1234)
(99999, David, 512-555-4321)
(99999, William, 512-555-1234)
(99999, William, 512-555-4321)
54
Normal Forms
• First normal form
• Second normal form
• Third normal form
• BCNF
• Fourth normal form and higher
55
4NF - Fourth Normal Form
• A relation schema is in 4NF with respect to a set of
functional and multivalued dependencies if for all multivalued
dependencies in of the form , where and
, at least one of the following hold:
– is trivial
– is a superkey for the schema
• If a relation is in 4NF it is in BCNF
R D
D+ α → → β α ⊆ R
β ⊆ R
α → → β
α R
56
Multivalued Dependencies
• Let be a relation schema and let and . The
multivalued dependency
• holds on if in any legal relation , for all pairs for tuples
and in such that , there exist and such that
R α ⊆ R β ⊆ R
R r(R) t
1
t
2 r t
1[α] = t
2[α] t
3 t
4
α → → β
t
1[α] = t
2[α] = t
3[α] = t
4[α]
t
3[β] = t
1[β]
t
3[R − β] = t
2[R − β]
t
4[β] = t
2[β]
t
4[R − β] = t
1[R − β]
END OF LECTURE 9