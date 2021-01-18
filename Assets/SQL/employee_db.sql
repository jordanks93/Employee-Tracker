DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
	id INT NOT NULL AUTO_INCREMENT,
	name VARCHAR(30) NOT NULL DEFAULT "Dept Name",
    PRIMARY KEY (id)
);

CREATE TABLE role (
	id INT NOT NULL AUTO_INCREMENT,
	title VARCHAR(30) NOT NULL DEFAULT "title",
    salary DECIMAL NOT NULL DEFAULT 0,
    department_id INT NOT NULL DEFAULT 0,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
	id INT NOT NULL AUTO_INCREMENT,
	first_name VARCHAR(30) NOT NULL DEFAULT "First Name",
    last_name VARCHAR(30) NOT NULL DEFAULT "Last Name",
    role_id INT NOT NULL DEFAULT 0,
    manager_id INT,
	PRIMARY KEY (id),
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);



