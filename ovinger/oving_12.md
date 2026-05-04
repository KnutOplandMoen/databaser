TDT4145 - Data Modeling, Databases and
Database Management Systems
Training Exercise 1 - Relational Algebra∗
1. Consider the following schema, where underlining marks primary key attributes and equally named attributes imply foreign keys:
Visits(P erson, Bar) Prefers(P erson, Beer) Serves(Bar, Beer)
Express the following queries in relational algebra. You may use the assignment operator to produce “intermediate relations” to make your queries more readable.
1. Find the bars which have no beers preferred by Steve.
2. Find the persons who visit each bar that has at least one of that person’s preferred beers.
3. Find the persons who do not visit any of the bars visited by Paul.
4. Find out who does not visit any bar that does not have any of that person’s preferred beers.
2. Consider the following database schema of a fictitious company. Underlining indicates primary key attributes, arrows depict foreign key relationships.
Employee(fname, minit, lname, ssn, bdate, address, sex, salary,
super_ssn → Employee.ssn, dno → Department.dnumber)
Dependent(essn → Employee.ssn, dependent_name, sex, bdate, relationship)
Department(dname, dnumber, mgr_ssn → Employee.ssn, mgr_start_date)
Dept_Locations(dnumber → Department.dnumber, dlocation)
Project(pname, pnumber, plocation, dnum → Department.dnumber)
Works_On(essn → Employee.ssn, pno → P roject.pnumber, hours)
In addition to information about their employees, the company records information about the employees’
relatives in the Dependent relation. The relation Dept_Locations records all locations where a department is
located. The Works_On relation records how many hours an employee worked on a particular project. The
arrows in the schema indicate foreign keys. The attribute on the left of the arrow is the attribute in each
relation, and the one on the right of the arrow is the original attribute in another relation that is referenced.
Express the following queries in relational algebra. You may use the assignment operator to produce “intermediate relations” to make your queries more readable.
1. Make a list of all departments and their projects (dnumber, dname, pnumber, pname). Make sure to
include departments with no projects and projects with no departments.
2. Find projects (pnumber, pname) on which employee Homer J. Simpson works together with his supervisor and his department manager.
3. Find departments (dname) with more than one location using aggregation.
4. Answer the previous query without using aggregation
∗Parts of the exercise have been created and modified over the years by members of the DBIS group of the University of Konstanz as part
of the course “Database Systems”.
1
Solutions
1. (a)
πBar(Serves) − πBar(Serves (σP erson=’Steve’ P refers))
(b)
Result ← πP erson (V isits) − πP erson (M issedOpportunities)
M issedOpportunities ← Opportunities − V isits
Opportunities ← πP erson,Bar (Serves P refers)
(c)
Result ← πP erson (V isits) − πP erson (P aulsBarsV isitors)
P aulsBarsV isitors ← V isits P aulsBars
P aulsBars ← πBar (σP erson=’Paul’ V isits)
(d)
πP erson (V isits) − πP erson (V isits − πP erson,Bar (Serves P refers))
2. (a)
Result ← πdnumber,dname,pnumber,pname (Department dnumber=dnum P roject)
(b)
Result ← πpnumber,pname (P roject (HP rojs ∩ SupeRAP rojs ∩ MgRAP rojs))
MgRAP rojs ← πpnumber (DeptMgr ssn=essn W orksOn)
DeptMgr ← πssn←mgr_ssn (H dno=dnumber Department)
SupeRAP rojs ← πpnumber (Supervisor W orksOn)
Supervisor ← πssn←supervisor_ssn H
HP rojs ← πpnumber (H ssn=essn W orksOn)
H ← σfname=’Homer’ ∧ minit=’J’ ∧ lname=’Simpson’ Employee
(c)
Result ← πdname(Department (σcnt>1(LocCount)))
LocCount ← dnumberγcnt←count(dlocation)(Dept_Locations)
(d) Solution 1
Result ← πdname (Department dnumber=LA.dnumber T woLocations)
T woLocations ← ρLA(πdnumber,dlocation DeptLocations)
LA.dnumber=LB.dnumber∧ LA.dlocation̸=LB.dlocation ρLB(πdnumber,dlocation DeptLocations)
Solution 2
Result ← πdname (Department dnumber=LA.dnumber T woLocations)
T woLocations ← L1 L1.dnumber=L2.dnumber∧ L1.dlocation̸=L2.dlocation L2
L1 ← πdnumber,dlocation DeptLocations
L2 ← πdnumber,dlocation DeptLocations
Page 2 of 2