const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
        case "Intern":
          addIntern();
          break;
        default:
          buildTeam();
      }
    });
}
function departmentView(){
    
}