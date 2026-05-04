TDT4145 - Data Modeling, Databases and
Database Management Systems
Exercise 3 - ER
Spring Semester 2026
1. Your task is to design the ER diagram of a database for the project management of a company. Model the
following scenario as closely as possible according to the description:
• A project has a name and a total cost. One employee may not work on any project, but every project
must have at least one employee working on it. Since every employee can work on multiple projects,
the database needs to record the percentage of the work hours an employee spends on each project.
• Employees have a name, office, phone number, and a salary. Every employee has at most one manager,
who is also an employee.
• Every project produces at least one report and there are no reports without an associated project.
Reports are authored by employees. The order of the authors of a report is important and needs to be
stored in the database.
Your ER diagram should clearly show entity sets, relationship sets, attributes, keys, and all cardinality and
resource constraints. Each entity set should contain a numeric identifier, i.e., an id. State any assumptions
you make that go beyond the given scenario description.
2. You are given the following ER diagram that models the exam management of a university.
Translate the following ER diagram into a relational schema according to the lecture as accurately as possible.
Write down any assumptions you deem necessary. Also, list the foreign keys and the attributes they reference
(either in the schema with an arrow or in a separate list).
1