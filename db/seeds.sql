INSERT INTO department (name)
VALUES
("Sales"),
("Engineering"),
("Finance"),
("Legal");

INSERT INTO role (department_id, title, salary)
VALUES
(1, "Salesperson", 60000),
(1, "Sales Manager", 100000),
(2, "Software Engineer", 125000),
(2, "Lead Engineer", 150000),
(3, "Accountant", 100000),
(3, "Account Manager", 125000),
(4, "Lawyer", 175000);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Alan", "Chapman", 1, 2),
("Jonathon","Santos", 2, 1),
("Tony","Anderson", 3, 4),
("Jack","Cooke", 4, 3),
("Lewis","Munoz", 5, 6),
("Derek","Prince", 6, 5),
("Charles","Decker", 7, 7);
