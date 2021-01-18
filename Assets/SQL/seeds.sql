USE employee_db;


INSERT INTO department (name) 
VALUES ("Detection");

INSERT INTO department (name) 
VALUES ("Investigations");

INSERT INTO department (name) 
VALUES ("Executive");

INSERT INTO role (title, salary, department_id)
VALUES ("Fraud Detection", "40000", "1");

INSERT INTO role (title, salary, department_id)
VALUES ("Fraud Investigator", "45000", "2");

INSERT INTO role (title, salary, department_id)
VALUES ("Manager", "75000", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jenny", "Worman", "3", null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Paige", "McCoy", "3", null);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jordan", "Stuckman", "1", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Joao", "Cassimiro", "1", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Josh", "Stuckman", "2", "2");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Dave", "D'Alesio", "2", "2");

SELECT * FROM employee;
SELECT * FROM role;
SELECT * FROM department;