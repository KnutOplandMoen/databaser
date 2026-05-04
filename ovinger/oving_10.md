TDT4145 - Data Modeling, Databases and
Database Management Systems
Training Exercise 3 - ER and Normal Forms
1. A housing cooperative wants to digitize their system. The structure of the system must therefore be described
with a fitting ER model. You are given the following requirements:
• Employees, residents and property owners should all be registered in the system with a social security
number, full name, phone number, email.
• The cooperative consists of a number of buildings. Each building has a unique identifying number, a
street address and a year that it was built.
• In each building there is a number of apartments. Every apartment has an apartment number (that
implicitly describes the floor number), the number of rooms, and a size.
• The apartment is owned by one or more persons with a percent, and contains a number of residents.
• Every apartment can have a number of booths in the basement. The booths have a size and a unique
number within the housing cooperative. A few people also have the possibility for power outlet in
their booths.
• In the cooperative there is a small governing board that manages the tasks that must be done. The
board has an ID. For every person in the board, we must register that person’s responsibility and work
task. A person can’t have multiple responsibilities or titles in the board.
• The board takes care of different cases. A case has a case number and a description.
Remember to write down any assumption that you find necessary regarding design decisions of the ER
diagram.
2. Convert this ER model to a relational schema (tables).
1
3. Consider the following table.
A B C D
a1 b1 c1 d1
a1 b1 c1 d2
a2 b2 c2 d2
a3 b4 c3 d3
a3 b3 c3 d1
a4 b3 c4 d2
Which of the following statements must be wrong? Justify your answers.
1. A → A
2. A → B
3. A → C
4. A, B → C
5. C → D
6. D → C
7. {A, B, C, D} is a superkey for the table
8. {A, B, C} is a superkey for the table
9. D is a candidate key for the table
10. {A, B, D} is a candidate key for the table
Page 2 of 3
Solutions
1. ER diagram modeling the description.
2. The ER corresponds to the following set of tables:
student(student_id, name)
exam(exam_id, course_id, exam_aids)
exam_site(room_no, name, capacity)
chair(chair_id, type, room_no)
table(table_id, type, room_no)
has(student_id, exam_id)
takes_place(exam_id, room_no, date)
For extra practice, think about the following: assume that when a students has an exam, they are assigned
either a table or a chair at a room site. What would be the best way to store this piece of information?
3. 2) A → B must be wrong, as identical values in A have different values in B.
5) C → D must be wrong, as identical values in C produce different values in D.
6) D → C must be wrong, as identical values in D produce different values in C.
8) {A, B, C} is not a superkey, as (a1, b1, c1) appears twice, which means that the value for D cannot
be determined from {A, B, C}.
9) D is not an unique identifier for the table, as it contains duplicate values (d2 appears twice).
Page 3 of 3