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
    message: "View the database or create a new department, role, or employee.",
    choices: ["View the database", "Add new department", "Add new role", "Add new employee", "Quit"]
  })
    .then((answer) => {
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

