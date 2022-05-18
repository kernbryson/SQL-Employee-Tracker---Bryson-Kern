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
          employeeView();
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