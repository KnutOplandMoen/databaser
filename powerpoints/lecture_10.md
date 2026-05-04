February 17, 2026
Lecture 10: Beyond Relational Databases
Data Modelling, Databases and
Database Management Systems
Theodoros Chondrogiannis
*These slides are adapted from the original slides of the book “Database System Concepts”, © Silberschatz, Korth, Sudarshan, 2019.
History of Database Systems
2
A brief history of databases 4
3
Relational Databases
• ER modeling
• Relational schema
• Organize data in tables
• Declarative querying with SQL
• Some features
– Flexible by design
– Familiar BCNF structure
– Transactions & ACID
– Very “mature” & well tested (mostly)
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
4
Limitations
• Large and unstructured data
– Relational database schema is strictly enforced
• Lots of random I/Os and often write-heavy
• Not built for distributed applications
– Single point of failure
– Scale up, not out
• Performance, i.e, not fast enough for specialized applications
• Not great for analytics
Idea: Drop/Relax some of the feautures/constraints to achieve efficiency
5
Outline
• Data analytics
• Data warehousing
• Online Analytical Processing (OLAP)
• Semi-structured data
• Object-relational databases
• Spatial data
• NoSQL
The content of this lecture corresponds to some sections of
chapters 8, 10, 11, and 29 of the course textbook
6
Data Analytics
• Data analytics: the processing of data to infer patterns,
correlations, or models for prediction
– Primarily used to make business decisions
– Per individual customer
• E.g. what product to suggest for purchase
– Across all customers
• E.g. what products to manufacture/stock, in what quantity
• Critical for businesses today
7
Data Analytics
• Common steps in data analytics
– Gather data from multiple sources into one location
• Data warehouses also integrated data into common schema
• Data often needs to be extracted from source formats, transformed to common
schema, and loaded into the data warehouse
• Can be done as ETL (extract-transform-load), or ELT (extract-load-transform)
– Generate aggregates and reports summarizing data
• Dashboards showing graphical charts/reports
• Online analytical processing (OLAP) systems allow interactive querying
• Statistical analysis using tools such as R/SAS/SPSS
– Build predictive models and use the models for decision making
8
Data Analytics
• Predictive models are widely used today
– Companies use customer profile features (e.g. income, age, gender,
education, employment) and past history of a customer to predict
likelihood of default on loan and use prediction to make loan decision
– Companies use past history of sales (by season) to predict future sales,
use it to decide what/how much to produce/stock, and to target customers
9
OLTP
• Most database operations involve
On-Line Transaction Processing
– Short transactions, both queries and updates
– Queries are simple
– Queries and updates touch small portion of data
– Updates are frequent
10
OLTP
• Example: banks
– Account transactions
– ATM
– Managing loans
– Credit cards
– e-Banking
11
OLAP
• On-Line Analytical Processing
– Long transactions
– Queries are usually complex
– Queries touch large portion of the data
– Updates are infrequent
12
OLAP
• Example – stores chain of an enterprise
– Each store maintains its own customer records and sales records
– The same customer may be viewed as different customers for different
stores; hard to detect duplicate customer information
– Imprecise or missing data in the addresses of some customers
– Purchase records maintained in the operational system for limited time;
then deleted or archived
– The same “product” may have different prices, or different discounts in
different stores
13
Challenges
• Information integration
• Heterogeneous sources
• Data modeled for operational systems
• Data quality
• Data are “volatile”
• Data volume and tasks complexity
• Performance – short response time
OLTP vs OLAP
14
OLTP OLAP
Target Operational needs Business analysis
Data Small, operational Large, historical
Model Normalized Denormalized/multidimensional
Query language SQL Not unified
Updates Frequent and small Infrequent and batched
Querying load Small Large
Performance measure Throughput Response time
Transactional recovery Necessary Not necessary
Optimized for Update operations Querying and extraction operations
15
Data Warehousing
• Data sources often store only current data, not historical data
– Corporate decision making requires a unified view of all organizational
data, including historical data
• A data warehouse is a repository (archive) of information
gathered from multiple sources, stored under a unified schema,
at a single site
– Greatly simplifies querying, permits study of historical trends
– Shifts decision support query load away from transaction processing
systems
Data Warehousing
16
17
Servers - Technologies
• Two directions
– Native support of multidimensional data or not
• Relational OLAP (ROLAP)
– Store multidimensional data in relational tables
– Star schema, snowflake schema etc.
• Multidimensional OLAP (MOLAP)
– Data cube
– Nonrelational operators
18
Star Schema
• Two components
• Fact table
– A very large accumulation of facts such as sales
– Dependent and dimension attributes
– Usually insert only
• Dimension table
– Smaller, one for each dimension
– Generally static information about the entities involved in the facts
19
Star Schema - Example
• Car sales
• Fact table
– Sales(sNo, time, car, dealer, price)
• Dimension tables
– Cars(sNo, model, color)
– Dealers(dId, name, city, state, phone)
– Time(tId, day, month, year) involved in the facts
20
Relational VS Star Schema
• Example
– Model an enterprise that sells products to customers
– Local schema (schema at the database of the store)
cusomer
cusomer_id
name
street
city
state
zipcode
country
order
order_id
item_id
datetime
price
number
item_info
item_id
itemname
color
size
category
21
Relational VS Star Schema
• Example
– Model an enterprise that sells products to customers
– Global schema (schema at the single company server)
customer
cusomer_id
name
street
city
state
zipcode
country
item_order
order_id
item_id
datetime
price
number
item_info
item_id
itemname
color
size
category
store
store_id
city
state
country
order
order_id
store_id
customer_id
datetime
22
Relational VS Star Schema
• Example
– Model an enterprise that sells products to customers
– Star schema (at the data warehouse)
customer
customer_id
name
street
city
state
zipcode
country
sales
item_id
store_id
customer_id
date
number
price
item_info
item_id
itemname
color
size
category
store
store_id
city
state
country
date_info
date
month
quarter
year
23
Data Cube
• A data cube is a multidimensional generalization of a cross-tab
• Can have n dimensions; we show 3 below
• Cross-tabs can be used as views on a data cube
24
OLAP Operations
• Pivoting: changing the dimensions used in a cross-tab
– E.g. moving colors to column names
• Slicing: creating a cross-tab for fixed values only
– E.g fixing color to white and size to small
– Sometimes called dicing, when values for multiple dimensions are fixed
• Rollup: moving from finer-granularity data to a coarser granularity
– E.g. aggregating away an attribute
– E.g. moving from aggregates by day to aggregates by month or year
• Drill down: The opposite operation - that of moving from coarsergranularity data to finer-granularity data
25
Data Warehousing
• Past
– Many companies maintained their own data warehouse
• Present
– Most companies have moved operations to the cloud
– AI-assistance for decision making
More about data warehousing: TDT4300 Data Warehousing and Data Mining
26
Semi-structured Data
• Many applications require storage of complex data, whose
schema changes often
• The relational model’s requirement of atomic data types may be
an overkill
– E.g. storing set of interests as a set-valued attribute of a user profile may
be simpler than normalizing it
• Data exchange can benefit greatly from semi-structured data
– Exchange can be between applications, or between back-end and frontend of an application
27
Flexible schema
• Wide column representation
– Allow each tuple to have a different set of attributes
– Can add new attributes at any time
• Sparse column representation
– Schema has a fixed but large set of attributes, but each tuple may store
only a subset
28
Semi-structured Data Models
• Hierarchical data is common in many applications
• JSON: JavaScript Object Notation
– Widely used today
• XML: Extensible Markup Language
– Earlier generation notation, still used extensively
29
Multivalued data types
• Sets, multisets
– E.g.: set of interests {‘basketball, ‘La Liga’, ‘cooking’, ‘anime’, ‘jazz’}
• Key-value map (or just map for short)
– Store a set of key-value pairs
• E.g. {(brand, Apple), (ID, MacBook Air), (size, 13), (color, silver)}
– Operations on maps: put(key, value), get(key), delete(key)
• Arrays
– E.g. readings taken at regular intervals can be represented as array of
values instead of (time, value) pairs
• [5, 8, 9, 11] instead of {(1,5), (2, 8), (3, 9), (4, 11)}
 Multi-valued attribute types are modeled using non first-normal-form (NFNF or NF2) data model
30
JSON
• Textual representation widely used for data
exchange
• Example of JSON data:
• Types: integer, real, string, and
– Objects: are key-value maps, i.e. sets of
(attribute name, value) pairs
• JSON is ubiquitous in data exchange today
– Widely used for web services
– Most modern applications are architected
around on web services
{
"ID": "22222",
"name": {
"firstname: "Albert",
"lastname: "Einstein"
},
"deptname": "Physics",
"children": [
{
"firstname": "Hans",
"lastname": “Einstein”
},
{
"firstname": "Eduard",
"lastname": “Einstein"
}
]
}
31
SQL + JSON
• SQL extensions for
– JSON types for storing JSON data
– Extracting data from JSON objects using path expressions
– Generating JSON from relational data
– Creation of JSON collections using aggregation
– Syntax varies greatly across databases
• JSON is verbose
– Compressed representations, such as BSON (Binary JSON), are used for
efficient data storage
32
Object Orientation
• Object-relational data model provides a richer type system
• Applications are often written in OO programming languages
– The type system does not match the relational type system
– Switching between imperative language and SQL is troublesome
• Approaches for integrating object-orientation with databases
– Build an OO database, adding OO features to a relational database
– Automatically convert data between programming language model and
relational model; data conversion specified by object-relational mapping
– Build an OO database that natively supports object-oriented data and
direct access from programming languages
33
Object-relational Data Model
• Extend the relational data model by including object orientation
and constructs to deal with added data types
• Allow attributes of tuples to have complex types, including nonatomic values such as nested relations
• Preserve relational foundations, in particular the declarative
access to data, while extending modeling power
• Upward compatibility with existing relational languages
34
Complex Data Types
• Motivation
– Permit non-atomic domains (atomic ≡ indivisible)
– Example of non-atomic domain: set of integers, or set of tuples
– Allows more intuitive modeling for applications with complex data
• Intuitive definition
– Allow relations whenever we allow atomic (scalar) values—relations within
relations
– Retains the mathematical foundation of the relational model
– Violates first normal form
35
Example of a Nested Relation
• Example: library information system
• Each book has
– title,
– a list (array) of authors,
– publisher, with subfields name and branch, and
– a set of keywords
• Non-1NF relation books
title author_array publisher keyword_set
(name,branch)
Compilers [Smith, Jones] (McGraw-Hill, New York) {parsing, analysis}
Networks [Jones, Frick] (Oxford, London) {internet, Web}
36
Complex Types and SQL
• Extensions introduced in SQL:1999 to support complex types
– Collection and large object types
• Nested relations are an example of collection types
– Structured types
• Nested record structures like composite attributes
– Inheritance
– Object orientation
• Including object identifiers and references
• Not fully implemented in any database system currently
– But some features are present in each of the major commercial
database systems
37
Structured Types and Inheritance
• Structured types can be declared and used in SQL
CREATE TYPE Name AS (
 firstname varchar(20),
 lastname varchar(20)
) FINAL
CREATE TYPE Address AS (
 street varchar(20),
 city varchar(20),
 zipcode varchar(20)
) NOT FINAL
38
Structured Types and Inheritance
• Structured types can be used to create tables with composite
attributes
• Dot notation used to reference components: name.firstname
CREATE TABLE person (
 name Name,
 address Address,
 dateOfBirth date
)
39
Structured Types and Inheritance
• User-defined row types
• Can then create a table whose rows are a user-defined type
CREATE TYPE PersonType AS (
 name Name,
 address Address,
 dateOfBirth date
) NOT FINAL
CREATE TABLE customer OF PersonType
40
Methods
• Can add a method declaration with a structured type
• Method body is given separately
METHOD ageOnDate (onDate date)
RETURNS interval year
CREATE INSTANCE METHOD ageOnDate (onDate date)
RETURNS interval year
FOR CustomerType
BEGIN
 RETURN onDate- self.dateOfBirth;
END
41
Methods
• We can now find the age of each customer
SELECT name.lastname, ageOnDate (current_date)
FROM customer
42
Type Inheritance
• Suppose that we have the following type definition for people
• Using inheritance to define the student and teacher types
• Subtypes can also override methods
CREATE TYPE Person (
 name varchar(20),
 address varchar(20)
)
CREATE TYPE Student UNDER Person (
 degree varchar(20),
 department varchar(20)
)
CREATE TYPE Teacher UNDER Person (
 salary integer,
 department varchar(20)
)
• Example of array and multiset declaration
43
Array and Multiset Types in SQL
CREATE TYPE Book as (
 title varchar(20),
 author_array varchar(20) array [10],
 pub_date date,
 publisher Publisher,
 keyword-set varchar(20) multiset
)
CREATE TABLE books OF Book;
44
Creation of Collection Values
• Array construction
• Multisets
• Example: Insert a tuple into the relation books
ARRAY [‘Silberschatz’,`Korth’,`Sudarshan’]
MULTISET [‘computer’, ‘database’, ‘SQL’]
INSERT INTO books VALUES (
 ‘Compilers’,
 array[`Smith’,`Jones’],
 new Publisher (`McGraw-Hill’,`New York’),
 multiset [`parsing’,`analysis’ ]
);
45
Spatial Data Management
• Spatial Database Systems
– Manage large collections of 2D or 3D objects
• Spatial attribute
– Describe its location and/or geometry
– Spatial extent or points
• Spatial object
– Contains (at least) one spatial attribute
• Spatial relation
– A collection of spatial objects of the same entity
ID Name Type Polyline
1 Boulevard avenue (10023,1094),
(9034,1567),
(9020,1610)
2 Leeds highway (4240,5910),
(4129,6012),
(3813,6129),
(3602,6129)
… … … …
46
Spatial Data
• Spatial databases store information related to spatial locations,
and support efficient storage, indexing and querying of spatial data
• Geographic data
– Road maps, land-usage maps, topographic elevation maps, political maps
showing boundaries, land- ownership maps, and so on
• GIS are special-purpose databases tailored for storing geographic data
• Round-earth coordinate system may be used
• Geometric data
• design information about how objects are constructed
– For example, designs of buildings, aircraft, layouts of integrated-circuits
• 2 or 3 dimensional Euclidean space with (X, Y, Z) coordinates
47
Representing Spatial Data
• Vector representation
– Approximation of geometric objects
– Polygons, polylines, rectangles, circles etc.
• Raster representation
– Divide space by a fine grid
– Approximate objects by the set of overlapping pixels
object vector approximation raster approximation
48
Ubiquitous
• Spatial data can be found in many applications
– Geographic Information Systems
– Segmented images (e.g., objects in X-rays)
– Components of CAD constructs or VLSI circuits
– Stars on the sky
– …
• Spatial database systems are used by
– Users of mobile devices (find the nearest restaurant)
– Geographers, astrologers, life scientists, etc.
49
Spatial Data Types
*Image from: https://postgis.net/workshops/postgis-intro/
50
Spatial Queries
• Examples of spatial queries
– Region queries deal with spatial regions. e.g., ask for objects that lie
partially or fully inside a specified region
• E.g. PostGIS ST_Contains(), ST_Overlaps(), …
– Nearness queries request objects that lie near a specified location.
– Nearest neighbor queries, given a point or an object, find the nearest
object that satisfies given conditions
– Spatial graph queries request information based on spatial graphs
• E.g. shortest path between two points via a road network
– Spatial join of two relations with the location being the join attribute
– Queries that compute intersections or unions of regions
51
Spatial Relationships
• Associate objects
– Based on their relative location or extent in space
• Topological
• Distance-based
– Geometric distance, e.g., Euclidean distance
• Directional
– Relative orientation or based on a global reference
– North, south, east, west or left, right, up, down
ANY
intersects disjoint
equals contains inside adjacent
intersects inside/contains adjacent disjoint
5km
up north of
52
PostGIS
• Widely used extension to PostgreSQL
– Introduces spatial data types
– Provides a large collection of functions for spatial operations
– Provides indexing structures for spatial data
– Facilitates integration with many popular GIS
• ArcGIS, QGIS etc.
53
PostGIS
• Example
CREATE TABLE geometries (
  name varchar,
  geom geometry
);
INSERT INTO geometries (name, geom) VALUES
  ('Point', 'POINT(0 0)'),
  ('Linestring', 'LINESTRING(0 0, 1 1, 2 1, 2 2)'),
  ('Polygon', 'POLYGON((0 0, 1 0, 1 1, 0 1, 0 0))'),
  ('PolygonWithHole', 'POLYGON((...))'),
  ('Collection', ‘GEOMETRYCOLLECTION(...)'
);
54
PostGIS
• Example
– What is the total length of streets (in kilometers)/linestrings?
SELECT sum(ST_Length(geom))/1000
FROM geometries
WHERE ST_GeometryType(geom) = ‘ST_LineString’;
55
Textual Data
• Information retrieval: querying of unstructured data
– Simple model of keyword queries: given query keywords,retrieve
documents containing all the keywords
56
Textual Data
• Query
– Find documents that contain {‘big','fish'}
document_id document_content
1 A tiger lives at the zoo.
2 That is the biggest event of our lifetime.
3 Yes, it is very big.
4 Violence is a big problem.
5 A tiger jumped in.
6 I only eat big fish.
7 I speak English.
8 The tiger terrified him.
9 What is your favorite fish?
10 Can you put the fish on the big plate?
SELECT document_id
FROM documents
WHERE document_content
 LIKE ‘%big%’
AND document_content
 LIKE ‘%fish%’
{6,10}
57
Textual Data
• Query
– Find documents that contain {‘big','fish'}
document_id document_content
1 A tiger lives at the zoo.
2 That is the biggest event of our lifetime.
3 Yes, it is very big.
4 Violence is a big problem.
5 A tiger jumped in.
6 I only eat big fish.
7 I speak English.
8 The tiger terrified him.
9 What is your favorite fish?
10 Can you put the fish on the big plate?
SELECT document_id
FROM documents
WHERE document_content
 LIKE ‘%big%’
OR document_content
 LIKE ‘%fish%’
{2,3,4,6,9,10}
58
Textual Data
• Information retrieval: querying of unstructured data
– Simple model of keyword queries: given query keywords,retrieve
documents containing all the keywords
– More advanced models rank relevance of documents
– Today, keyword queries return many types of information as answers
• E.g. a query “cricket” typically returns information about ongoing cricket matches
• Relevance ranking
– Essential since there are usually many documents matching keywords
59
Model tf-idf
• Rare terms are more informative than frequent terms
– Stop words (e.g., ’the’, ’and’, etc.) are not informative at all
• Document frequency
– Number of documents that contain
– is an inverse measure of the informativeness of
• Inverse document frequency
– , where is the number of documents
– Captures how informative a term is in the whole document collection
– Gives different importance to different keywords in a query
df
t
t
df
t t
idf
t
idf
t = log(N/df
t
) N
History of Database Systems
60
A brief history of databases 4
61
NoSQL
• Three major papers were the seeds of the NoSQL movement
– BigTable (Google)
– Dynamo (Amazon)
• Distributed key-value data store
• Eventual consistency
• CAP Theorem
62
How did we get here?
• Explosion of social media sites (Facebook, Twitter) with large
data needs
• Rise of cloud-based solutions such as Amazon S3 (simple
storage solution)
• Just as moving to dynamically-typed languages (Python, Ruby),
a shift to dynamically-typed data with frequent schema changes
• Open-source community
63
NoSQL OLTP Systems
• No agreed upon definition
– No SQL at all, Non-relational, Not only SQL etc.
• Definition from www.nosql-database.org
– Next Generation DBMSs that mostly address some of the points: being
non-relational, distributed, open-source, and horizontally scalable
– The original intention has been modern web-scale database
management systems. The movement began early 2009 and is growing
rapidly. Often more characteristics apply such as: schema-free, easy
replication support, simple API, eventually consistent / BASE (not
ACID), a huge amount of data and more. So the misleading term
"nosql" (the community now translates it mostly with "not only sql")
64
NoSQL OLTP Systems
• Six key features
– ability to horizontally scale simple operation throughput over many servers
– ability to replicate and distribute (partition) data over many servers
– simple call level interface or protocol (in contrast to a SQL binding)
– weaker concurrency model than ACID transactions of most relational
database systems
– efficient use of distributed indexes and RAM for data storage
– ability to dynamically add new attributes to data records
65
CAP Theorem
• Three properties that are desirable and expected
from real­-world shared data systems
– C: data Consistency
– A: Availability
– P: tolerance of network Partition
• In 2000, Eric Brewer made the conjecture that
only two of these properties can be satisfied by
a system at any given time
– Formalized and confirmed by Seth Gilbert and Nancy Lynch in 2002
– Since then, more advanced models have been proposed, e.g., PACELC
Eric Brewer
66
NoSQL Data Models
• Key/Value Stores
• Document Databases
• NewSQL Databases
• Column Oriented Databases
• Graph Databases
• More…
http://highlyscalable.wordpress.com/2012/03/01/nosql-data-modeling-techniques/
67
Key-Value Stores
• Data storage
– values (data) are stored based on programmer
defined keys­
– system is agnostic as to the structure (semantics) of
the value
• Queries are expressed in terms of keys
• Indexes are defined over keys
– some systems support secondary indexes over
(part of) the value
Interface
+ put(key,document)
+ get(key):document­
68
Document-oriented Databases
• Data storage
– documents (data) is stored based on user-defined keys
– system is aware of the (arbitrary) document structure
– supports for lists, pointers, and nested documents
• Queries expressed in terms of key (or attribute, if
index exists)
• Support for key-based indexes and
secondary indexes
{
 “name”: “Tommy”
 “age”: 25
 “marital status”: “married”
 “citiesVisited”: [“Boston”,“New York”]
}
Interface
+ set(key,document)
+ get(key):document+ set(key,name,value)
+ get(key,name):value
7 NoSQL ­ 7.2 NoSQL Systems
Document Data Model
Document Data Model
• Interfa– set– get– set– get• Data storage
– documents (data) is stored based on progra– system is aware of the (arbitrary) document – support for lists, pointers and nested docum• Queries expressed in terms of key (or attrib• Support for key-based indexes and secondk1 “name”:“fred”
k2 “name”:“mary”;“age”:“25”
k3
…
kn “name”:“john”;“address”:“k3
”
“name”:“oak st”
Based on: “Scalable SQL and NoSQL Data Stores” by R. Cattell, 2010
­ Data storage
­ documents (data) is stored bas­ system is aware of the (arbitrar­ support for lists, pointers and ne­ Queries expressed in terms of key (o­ Support for key­based indexes and s188 / 364 Summer 2021 Big Data M
69
Column Family Data Model
• Data storage
– documents are stored based on a column family and a
key
– system is aware of (arbitrary) structure of column family
– system uses column family information to replicate and
distribute data
• Queries are expressed based on key and column
family
• Secondary indexes per column family are typically
supported
Interface
+ define(family)
+ insert(family,key,columns)
+ get(family,key):columns
7 NoSQL ­ 7.2 NoSQL Systems
Column Family Data ModePublic Private
Column Family Data Model
• • Data storage
– <name, value, timestamp> triples (son a column family and key; a colum– system is aware of (arbitrary) struct– system uses column family informat• Queries are expressed based on ke• Secondary indexes per column famk1 “name”:“fred”
k2 “name”:“mary”
k3
…
kn
“name”:“john”
“name”:“oak st”
“title”:“Mr”
“age”:“25”
Based on: “Scalable SQL and NoSQL Data Stores” by R. Cattell, 20­ Data storage
­ “documents” are stored­ system is aware of (arb­ system uses column fa­ Queries are expressed base­ Secondary indexes per colum189 / 364 Summer 2021
70
Graph Databases
• Data storage
– data is stored in terms of nodes and (typed) edges
– both nodes and edges can have (arbitrary) attributes
• Queries are expressed based on system ids
(if no indexes exist)
• Secondary indexes for nodes and edges are
supported
– get nodes by attributes and edges by type, start/end
node, and/or attributes
Interface
+ create: id
+ get(id)
+ connect(id1,id2): id
+ addAttribute(id, name, value)
+ getAttribute(id, name): value
END OF LECTURE 10