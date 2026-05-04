January 6, 2026
Lecture 1: Course Information
Data Modeling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
2
Instructors and Assistants
• Theodoros Chondrogiannis (theodoros.chondrogiannis@ntnu.no)
Kontor 253, Gamle fysikk
– Instructor for the first part (in English)
• Svein Erik Bratsberg (sveinbra@ntnu.no)
Kontor 307, IT-bygget
– Instructor for the second part
• Martin Olderskog (martin.r.olderskog@ntnu.no)
– Leading student assistant
• More details on the course website on Blackboard
3
Exercises - Project - Exams
• Training exercises
– Voluntary
• Exercises
– 4 obligatory exercises
• Assessment modules
– Project (30%) - Submission on 23.03.2026
– Mid-term (30%) - 24.02.2026
– Final exam (40%) - 08.05.2026
• One must achieve a passing mark in all three to pass the course
– If you fail in one module, you can re-take just that specific module
4
Course Objectives
• By completion of this course, the candidate should demonstrate:
– Understanding of relational databases
– Database-Oriented Programming
– Data modeling with the entity-relationship model
– Evaluation and improvement of relational database schema based on
normalization theory
– Analysis and optimization of the performance of database systems
• In short, the course will provide you with all the necessary tools
to develop applications that rely on a database system
5
Resources
• Avi Silberschatz, Henry F. Korth, S.
Sudarshan. “Database System Concepts”.
McGraw-Hill, 7th edition
ISBN: 9780078022159
https://www.db-book.com/
– While the lecture is based on this book, there are
many other books you can use as well
– The Internet is big
• There are many videos of lectures from similar courses, as
well as many online courses that cover parts of the course
material
Use of AI
6
“It is permitted to use AI as an aid in preparing student
assignments, but the use of AI may vary between subjects and
study levels. Ask your subject teacher or supervisor if you are
unsure about AI use. It is your responsibility to act in an
academically honest manner and to familiarize yourself with
applicable ethical principles, laws, and regulations.”
* https://i.ntnu.no/wiki/-/wiki/English/using+artificial+intelligence+as+a+student
7
Use of AI
• In short, you can use AI tools such as MS Copilot
• However, use such tools as an aid, not as a paid employee
– For instance, if you ask an AI tool to write a query for you in SQL, make
sure you are knowledgeable enough to check whether the query given by
the AI tool is correct
– You will not have any help from AI tools during the mid-term or the final
exam
– As a future employee, you will use such tools extensively to increase your
productivity, but you still need to have a great grasp of the relevant
concepts to know what to ask from the tool and present results
Lecture Schedule (Part 1)
8
Week Date Lecture Topic
2 06.01.2026 1 Course Introduction
08.01.2026 NO LECTURE
3 13.01.2026 2 Relational Model and Relational Algebra
15.01.2026 3 SQL - Part 1/4
4 20.01.2026 4 SQL - Part 2/4
22.01.2026 5 SQL - Part 3/4
5 27.01.2026 6 SQL - Part 4/4
29.01.2026 NO LECTURE
6 03.02.2026 7 ER - Part 1/2
05.02.2026 8 ER - Part 2/2
7 10.02.2026 9 Normalization
12.02.2026 NO LECTURE
8 17.02.2026 10 Beyond Relational Databases
19.02.2026 NO LECTURE
9
Outline
• Purpose of Database Systems
• View of Data
• Database Languages
• Database Design
• Database Engine
• Database Architecture
• Database Users and Administrators
The content of this lecture corresponds to Chapter 1 of the course textbook
10
Key Takeaways
• What is this course about?
– Data Modelling, Databases, and Database Management Systems 😒
Databases and DBMS
11
“A database-management system (DBMS) is a collection
of interrelated data and a set of programs to access those
data. The collection of data, usually referred to as the
database, contains information relevant to an enterprise.”
*Database Systems Concepts course textbook
“Data modeling is the foundational process of organizing
and structuring data within a database, ensuring efficient
management, storage, and analysis.”
*atlan.com
12
Key Takeaways
• What is this course about?
– Data Modelling, Databases, and Database Management Systems 😒
• What are database management systems useful for?
• How do (relational) database management systems store data?
• How do database management systems facilitate access to data?
• How does a database management system work?
• Who uses a database management system?
What are database management
systems useful for?
• Enterprise information
• Manufacturing
• Banking and finance
• Universities
• Airlines
• Telecommunication
• Web-based services
• Document databases
• Navigation systems
14
Database Applications Examples
* Some images were generated using Microsoft Copilot
Designed by studiogstock / Freepik
Screenshots by AtB iOS app
15
Purpose of Database Systems
• In the early days, database applications were built directly
on top of file systems
– Data redundancy and inconsistency
– Difficulty in accessing data
– Data isolation
– Integrity problems
– Atomicity of updates
– Concurrent access by multiple users
– Security problems
• Database systems offer solutions to all the above problems
16
Purpose of Database Systems
• Database systems are all about powerful abstractions
– Everything you can do with a database system…
– …you can also do without one…
– …but it would be significantly more work to implement!
* Images weer generated using Microsoft Copilot
How do database management
systems store data?
18
Data Models
• A collection of tools for describing
– Data
– Data relationships
– Data semantics
– Data constraints
• Some data models
– Relational model
– Entity-Relationship data model (mainly for database design)
– Object-based data models (Object-oriented and Object-relational)
– Semi-structured data model (XML)
19
Relational Model
• All the data is stored in various tables
• Example of tabular data in the relational model
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
columnns
rows
Edgar F. Codd
Turing Award 1981
A Sample Relational Database
20
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
classroom
building room_number capacity
Packard 101 500
Painter 514 10
Taylor 3128 70
Watson 100 30
Watson 120 50
• Sample university database
* the university database is provided by the course textbook and is used through the lectures
View of Data
• An architecture for a database system
View 1 View 2 … View N
view level
logical level
physical level
21
22
Instances and Schemas
• Similar to types and variables in programming languages
• Logical Schema
– The overall logical structure of the database
– Analogous to the type information of a variable in a program
• Physical schema
– The overall physical structure of the database
• Instance
– The actual content of the database at a particular point in time
– Analogous to the value of a variable
23
Physical Data Independence
• Physical Data Independence
– The ability to modify the physical schema without changing the logical
schema
– Applications depend on the logical schema
• In general, the interfaces between the various levels and
components should be well defined so that changes in some
parts do not seriously influence others
24
Database Design
• The process of designing the general
structure of the database
• Consists of three phases:
– Conceptual Database Design
• produces the initial model of the mini-world in a
conceptual data model (e.g., in the ER model)
– Logical Database Design
• transforms the conceptual schema into the data model
supported by the DBMS (e.g., the relational model)
– Physical Database Design
• design indexes, table distribution, buffer size, etc., to
maximize the performance of the system
instructor(ID, name, dept_name, salary)
department(dept_name, building, budget)
student(ID, name, dept_name, tot_cred)
course(course_id, title, dept_name, credits)
classroom(building, room_number, capacity)
section(course_id, sec_id, semester, year, building, room_number, time_slot_id)
teaches(ID, course_id, sec_id, semester, year)
takes(ID, course_id, sec_id, semester, year, grade)
advisor(s_ID, i_ID)
prereq(course_id, prereq_id)
time_slot(time_slot_id, day, start_hr, start_min, end_hr, end_min)
25
Data Definition Language (DDL)
• Specification notation for defining the database schema
• DDL compiler generates table templates stored in a data dictionary
• Data dictionary contains metadata (i.e., data about data)
– Database schema
– Integrity constraints
• Primary key, i.e., an ID that
uniquely identifies instructors
– Authorization
• Who can access what
CREATE TABLE instructor (
 ID CHAR(5),
    name VARCHAR(20),
    dept_name VARCHAR(20),
    salary NUMERIC(8,2)
)
How do database management
systems facilitate access to data?
27
Data Manipulation Language (DML)
• Language for accessing and updating the data organized by the
appropriate data model
• There are basically two types of data-manipulation languages
– Procedural DML
• require a user to specify what data is needed and how to get that data
– Declarative DML
• require a user to specify what data is needed without specifying how to get that data
• The portion of a DML that involves information retrieval is called
a query language
28
SQL Query Language
• Structured Query Language (SQL) is declarative
– A query takes as input several tables (possibly only one) and always
returns a single table
• Example
– Find all instructors in Comp. Sci. dept
SELECT name
FROM instructor
WHERE dept_name = 'Comp. Sci.'
name
Srinivasan
Katz
Brandt
29
SQL Query Language
• Example
– Find all instructor names in departments with a budget greater than 91000
SELECT name
FROM instructor, department
WHERE instructor.dept_name = department.dept_name
AND department.budget > 91000
name
Srinivasan
Wu
Katz
Singh
Brandt
instructor
id name dept_name salary
10101 Srinivasan Comp. Sci. 65000
12121 Wu Finance 90000
15151 Mozart Music 40000
22222 Einstein Physics 95000
32343 El Said History 60000
33456 Gold Physics 87000
45565 Katz Comp. Sci. 75000
…
department
dept_name building budget
Biology Watson 90000
Comp. Sci. Taylor 100000
Elec. Eng. Taylor 85000
Finance Painter 120000
History Painter 50000
Music Packard 80000
Physics Watson 70000
30
SQL Query Language
• SQL is NOT a Turing machine equivalent language
• To be able to compute complex functions, SQL is usually
embedded in some higher-level language
• Application programs generally access databases through one of
– Language extensions to allow embedded SQL
– Application program interface (e.g., ODBC/JDBC) which allows SQL
queries to be sent to a database
31
Why SQL?
• Database systems (typically) support a high-level, declarative
query language that specifies what data should be retrieved,
rather than how it is retrieved
• Example
– Find all instructors in Comp. Sci. dept
SELECT name
FROM instructor
WHERE dept_name = 'Comp. Sci.'
result = []
open_file(instructor)
while not EOF(instructor) do:
 t = get_next(instructor);
 if t.dept_name = 'Comp. Sci.’:
 result.add(tuple)
return result
32
Why SQL?
• Database systems (typically) support a high-level, declarative
query language that specifies what data should be retrieved,
rather than how it is retrieved
• This code is very likely to be
– much more convenient to express
– much more efficient to execute
• There are many equivalent ways to execute a given query
• Let the system decide which way is best
• The more complex the query, the bigger the savings!
33
Relational Algebra
• Formal foundation for queries in relational database systems
• RA operations compute new relations from existing ones
– selection ( )
– projection ( )
– cross product ( )
– union ( )
– set difference ( )
– natural join ( )
– renaming ( )
σ
π
×
∪
−
⋈
ρ
34
Relational Algebra vs SQL
• Semantics of SQL are (partly) defined by the relational algebra
– SELECT clause projection
– WHERE clause selection
– JOIN clause join
• Example
– Find all instructor names in departments with a budget greater than 91000
→ π
→ σ
→ ⋈
πname(σbudget>91000(instructor ⋈ department))
SELECT name
FROM instructor, department
WHERE instructor.dept_name =
 department.dept_name
AND department.budget > 91000
How does a database management
system work?
36
Database Architecture
• Centralized databases
– One to a few cores, shared memory
• Client-server,
– One server machine executes work on behalf of multiple client machines
• Parallel databases
– Many cores
– Shared memory / Shared disk / Shared nothing
• Distributed databases
– Geographical distribution
– Schema/data heterogeneity
Database Architecture
• A database system is partitioned into
modules that deal with each of the
responsibilities of the overall system
• The functional components of a
DBMS can be divided into
– The storage manager
– The query processor component
– The transaction management component
• Example
– Centralized/Shared memory architecture
Application
programmers
Sophisticated
users
Naive users Database
administrators
application
interfaces
application
programs query tools admin tools
compiler and
linker DML queries DDL
interpreter
Application
program
object code
Query evaluation
engine
DML compiler
and organizer
Indices Data dictionary
Data Statistics
Buffer
manager
Authorization
and integrity
manager
Transaction
manager
File
manager
use write use use
Query
processor
Storage manager
Disk
storage
37
38
Storage Manager
• Provides the interface between the low-level data stored in the
database and the queries submitted to the system
• The storage manager is responsible for the following tasks:
– Interaction with the OS file manager
– Efficient storing, retrieving, and updating of data
• The storage manager components include:
– Authorization and integrity manager
– Transaction manager
– File manager
– Buffer manager
39
Storage Manager
• The storage manager implements several data structures as part
of the physical system implementation:
– Data files -- store the database itself
– Data dictionary -- stores metadata about the structure of the database, in
particular the schema of the database
– Indices -- can provide fast access to data items. A database index
provides pointers to those data items that hold a particular value
40
Query Processor
• The query processor components include:
– DDL interpreter
• Interprets DDL statements and records the definitions in the data dictionary
– DML compiler
• Translates DML statements in a query language into an evaluation plan consisting of
low-level instructions that the query evaluation engine understands
• The DML compiler performs query optimization; that is, it picks the lowest cost
evaluation plan from among the various alternatives.
– Query evaluation engine
• Executes low-level instructions generated by the DML compiler
Query Processing
Query Relational algebra
expression
Query
output
Execution
plan
Parser
and translator
Optimizer
Evaluation
engine
data data statistics
41
41
42
Transaction Manager
• A transaction is a collection of operations that perform a single
logical function in a database application
• The transaction-management component ensures that the
database remains in a consistent (correct) state despite system
failures (e.g., power failures and operating system crashes) and
transaction failures
• Concurrency-control manager controls the interaction among the
concurrent transactions to ensure the consistency of the
database
Who uses a database management
system?
44
Database Applications
• Database applications are usually partitioned into
two or three parts
– Two-tier architecture: the application resides at the
client machine, where it invokes database system
functionality at the server machine
user
application
DBMS
client
server
45
Database Applications
• Database applications are usually partitioned into
two or three parts
– Two-tier architecture: the application resides at the
client machine, where it invokes database system
functionality at the server machine
– Three-tier architecture: the client machine acts as a
front end and does not contain any direct database calls
• The client communicates with an application server, usually
through a form interface
• The application server, in turn, communicates with a database
system to access data
DBMS
application
server
application client
user
client
server
Database Users
Application
programmers
Sophisticated
users
Naive users Database
administrators
application
interfaces
application
programs query tools admin tools
compiler and
linker DML queries DDL
interpreter
Application
program
object code
Query evaluation
engine
DML compiler
and organizer
use write use use
Storage manager
47
Database Users
• There are four different types of database-system users:
– Naive users interact with the system by invoking one of the application
programs that have been written previously
– Application programmers are computer professionals who write
application programs
– Sophisticated users interact with the system without writing programs
using a database query language or specialized tools
– Specialized users write specialized database applications that do not fit
into the traditional data-processing framework
• For example, CAD, graphic data, audio, video.
48
Database Administrator
• A person who has central control over the system:
– Schema definition
– Storage structure and access method definition
– Schema and physical organization modification
– Granting of authorization for data access
– Routine maintenance
• Periodically backing up the database
• Ensuring that enough free disk space is available for normal operations, and
upgrading disk space as required
• Monitoring jobs running on the database to ensure that performance is not degraded
by very expensive tasks submitted by some users
Brief history of database
management systems
50
History of Database Systems
• 1950s and early 1960s:
– Data processing using magnetic tapes for storage
• Tapes provided only sequential access
– Punched cards for input
51
History of Database Systems
• Late 1960s and 1970s:
– Hard disks allowed direct access to data
– Network and hierarchical data models in widespread use
– Ted Codd defines the relational data model
• Would win the ACM Turing Award for this work
• IBM Research begins System R prototype
• UC Berkeley (Michael Stonebraker) begins Ingres prototype
– Oracle releases first commercial relational database
– High-performance (for the era) transaction processing
52
History of Database Systems
• Late 1980s:
– Research relational prototypes evolve into commercial systems
• SQL becomes industrial standard
– Parallel and distributed database systems
• Wisconsin, IBM, Teradata
– Object-oriented database systems
• Late 1990s:
– Large decision support and data-mining applications
– Large multi-terabyte data warehouses
– Emergence of Web commerce
53
History of Database Systems
• 2000s
– Big data storage systems
• Google BigTable, Yahoo PNuts, Amazon,
• “NoSQL” systems.
– Big data analysis: beyond SQL
• Map reduce and friends
• 2010s
– SQL reloaded
• SQL front end to Map Reduce systems
• Massively parallel database systems
• Multi-core main-memory databases
END OF LECTURE 1