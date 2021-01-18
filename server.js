// Load Dependencies
// mysql and inquirer packages
const mysql = require("mysql");
const inquirer = require("inquirer");

// creates the connection to the sql database
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "Airforce22@!",
  database: "employee_db"
});

// connection to mySQL server and start prompt
connection.connect((err) => {
  if (err) throw err;
  console.log("Connection ID: " + connection.threadId);
  startQuery();
});

// asks the user which action they would like to take
function startQuery() {
  inquirer.prompt({
    name: "action",
    type: "list",
    message: "View the database, Create a new: department, role, or employee, and/or Update an employee's role",
    choices:
      [
        "View the database",
        "Add new department",
        "Add new role",
        "Add new employee",
        "Update an employee's role",
        "Quit"
      ]
  }).then((answer) => {
    if (answer.action === "View the database") {
      viewDB();
    }
    else if (answer.action === "Add new department") {
      addDepartment();
    }
    else if (answer.action === "Add new role") {
      addRole();
    }
    else if (answer.action === "Add new employee") {
      addEmployee();
    }
    else if (answer.action === "Update an employee's role") {
      updateEmployeeRole();
    }
    else {
      console.log("Quit Application");
      connection.end();
    }
  })
}

// prompts user for the table they want to view in the database
function viewDB() {
  inquirer.prompt({

    name: "table",
    type: "list",
    message: "Which table in the database would you like to view?",
    choices: ["Department", "Role", "Employee", "Create/Quit"]

  }).then((answers) => {

    // calls function to pull table data based on user's answer
    if (answers.table === "Department") {
      viewDepartments();
    }
    else if (answers.table === "Role") {
      viewRoles();
    }
    else if (answers.table === "Employee") {
      viewEmployees();
    }
    else {
      //takes user back to inital prompt
      startQuery();
    }

  });
}

// pulls department table data
function viewDepartments() {
  connection.query("SELECT * FROM department", (err, res) => {
    if (err) throw err;
    console.table(res);
    //takes user back to inital prompt
    startQuery();
  })
};

// pulls role table data
function viewRoles() {
  connection.query("SELECT * FROM role", (err, res) => {
    if (err) throw err;
    console.table(res);
    //takes user back to inital prompt
    startQuery();
  })
};

// pulls employee table data
function viewEmployees() {
  connection.query("SELECT * FROM employee", (err, res) => {
    if (err) throw err;
    console.table(res);
    //takes user back to inital prompt
    startQuery();
  })
};

//function to add department
function addDepartment() {
  inquirer.prompt([
    {
      name: "department",
      type: "input",
      message: "What is the name of the new department?",
    }
  ]).then((answer) => {

      // inserts department data into table
      connection.query("INSERT INTO department SET ?",
        {
          name: answer.department
        },
        function (err) {
          if (err) throw err;
          console.log("Department Added Successfully!");
          startQuery();
        }
      );
    });
}

// prompts user for new role info and adds it to the database
function addRole() {
  inquirer.prompt([
    {
      name: "title",
      type: "input",
      message: "What role title are you adding?",
    },
    {
      name: "salary",
      type: "input",
      message: "What is the salary for this position?",
    },
    {
      name: "departmentID",
      type: "input",
      message: "What is the department ID of this role?",
    }
  ]).then((answers) => {

    // inserts role data into table
    connection.query(
      "INSERT INTO role SET ?",
      {
        title: answers.title,
        salary: answers.salary,
        department_id: answers.departmentID
      },
      function (err) {
        if (err) throw err;
        console.log("Role Added Successfully!");
        startQuery();
      }
    );
  });
}

// prompts user for new employee info and adds it to the database
function addEmployee() {
  inquirer.prompt([
    {
      name: "firstName",
      type: "input",
      message: "Enter the employee's first name:",
    },
    {
      name: "lastName",
      type: "input",
      message: "Enter the employee's last name:",
    },
    {
      name: "roleID",
      type: "input",
      message: "Enter the employee's roleID:"
    },
    {
      name: "managerID",
      type: "input",
      message: "Enter the employee's managerID:",
    }
  ]).then((answers) => {

      // inserts employee data into table
      connection.query("INSERT INTO employee SET ?",
        {
          first_name: answers.firstName,
          last_name: answers.lastName,
          role_id: answers.roleID,
          manager_id: answers.managerID
        },
        function (err) {
          if (err) throw err;
          console.log("Employee Added Successfully!");
          //takes user back to inital prompt
          startQuery();
        }
      );
    });
}


