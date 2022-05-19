const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database: "employees",
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