const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
var roleArray = [
  {
    role: "Salesperson",
    id: 1,
  },
  {
    role: "Software Engineer",
    id: 2,
  },
  {
    role: "Accountant",
    id: 3,
  },
  {
    role: "Lawyer",
    id: 4,
  },
  {
    role: "Manager",
    id: 5,
  },
];
let roleArrayRole = roleArray.map(({ role }) => role)
var managerArray = [
  {
    name: "Bryson",
    id: 1,
  },
  {
    name: "Eric",
    id: 2,
  },
  {
    name: "Jake",
    id: 3,
  },
];
let managerArrayManager = roleArray.map(({ name }) => name)
let managerNames = managerArray.name;

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employee",
});
connection.connect(function (err) {
  if (err) throw err;
});

startPrompt();

function startPrompt() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          "view all departments",
          "view all roles",
          "view all employees",
          "add a department",
          "add a role",
          "add an employee",
          "update an employee role",
          "exit",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case "view all departments":
          departmentView();
          break;
        case "view all roles":
          RoleView();
          break;
        case "view all employees":
          employeeView();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "exit":
          exit();
          break;
        default:
          departmentView();
      }
    });
}
function exit() {
  console.log("Thank you for using employee tracker!");
  process.exit();
}
function departmentView() {
  const query = `SELECT department.name AS DEPARTMENT, department.id AS DEPARTMENT_ID FROM department;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("DEPARTMENTS");
    console.log("\n");
    console.table(res);
    startPrompt();
  });
}
function RoleView() {
  const query = `SELECT role.title AS TITLE, role.salary AS SALARY, role.id AS ROLE_ID FROM role;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("ROLES");
    console.log("\n");
    console.table(res);
    startPrompt();
  });
}
function employeeView() {
  const query = `SELECT * FROM employees JOIN role ON role.id = employees.role_id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("EMPLOYEES");
    console.log("\n");
    console.table(res);

    startPrompt();
  });
}

function addDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What department would you like to add?",
      },
    ])
    .then((data) => {
      let newDept = data.newDepartment;
      const query = `INSERT INTO department (name) VALUES ('${newDept}');`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(
          "\x1b[32m",
          "Successfully added " + newDept + " department!"
        );
        startPrompt();
      });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newTitle",
        message: "What is the roles title?",
      },
      {
        type: "input",
        name: "newSalary",
        message: "What is the roles salary?",
      },
    ])
    .then((data) => {
      let newTitle = data.newTitle;
      let newSalary = data.newSalary;
      roleArray.push(newTitle);
      const query = `INSERT INTO role (title, salary) VALUES ('${newTitle}',${newSalary});`;
      connection.query(query, (err, res) => {
        if (err) throw err;
        console.log(
          "\x1b[32m",
          "Successfully added " + newTitle + " to roles!"
        );
        startPrompt();
      });
    });
}
function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "newFirstName",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "newLastName",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "newEmployeeRole",
        message: "What is the employees role?",
        choices: roleArrayRole,
      },
      {
        type: "list",
        name: "newEmployeeManager",
        message: "Who is the employees manager?",
        choices: managerArrayManager,
      },
    ])
    .then((data) => {
      connection.query(query, (err, res) => {
        if (err) throw err;
        let randomID = Math.random() * 2;
        const query = `INSERT INTO employees (first_name, last_name, id, manager_id, role_id) VALUES ('${newFirstName}','${newLastName}', ${randomID};`;
      });
    });
}
