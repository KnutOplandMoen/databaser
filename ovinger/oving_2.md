TDT4145 - Data Modeling, Databases and
Database Management Systems
Exercise 2 - SQL
Spring Semester 2026
1. Download from the course website on Blackboard files northwind_schema.sql and northwind_data.sql.
Use them to create the schema of the database and add data1
. In short:
• The customers table contains information about people that submit orders for products.
• The suppliers table contains information about people who work for companies and supply products.
• The products table contains information about the products.
• The orders table contains information about orders submitted from a customer to a supplier (both
involved parties are individuals).
• The order_details table contains detailed information about each order.
Write the following queries in SQL.
1. For each supplier located in the state of Texas, print the orders they have handled along with the total
cost of the products that were sold in each order. Consider that the discount is subtracted from the
total value of the products.
2. Find how many orders include a product that contains the string "Nikkon" in its name.
3. Print the IDs of all customers located in the city of Baton Rouge that have spent more than $35 in
shipping fees.
4. Print the IDs of the customers that have submitted more orders than the average number of orders per
customer (considering customers that have submitted at least one order).
5. Print the customer ID of all customers that have not ordered any products from suppliers located in
the city of Albany.
6. Print all pairs of customer IDs-supplier IDs of customers and suppliers that are located in the same
state. Do not use nested queries.
7. Print the ID of all customers along with the number of orders they have made.
8. Print the names of all discontinued products that have been ordered at least once by a customer located
in the state of Indiana.
Submit your solutions using the northwind_solution.sql template provided along with the rest of the
exercises files.
1Data set adapted from https://github.com/mrin9/northwind.
1