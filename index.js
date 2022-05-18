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
        default:
          buildTeam();
      }
    });
}
function departmentView() {
  const query = `SELECT * FROM employees.department;`;
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
  const query = `SELECT * FROM employees.role;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("ROLES");
    console.log("\n");
    console.table(res);
    startPrompt();
  });
}
