const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");

//connects javascript with queries
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
          "update an employee",
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
        case "Update an employee":
          updateEmployee();
          break;
        case "exit":
          exit();
          break;
        default:
          updateEmployee();
      }
    });
}

//exits out of program
function exit() {
  console.log("Thank you for using employee tracker!");
  process.exit();
}
//shows all departments
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
//shows all roles
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
//views employees first, last, id, title, department, salary, and manager
function employeeView() {
  const query = `SELECT employees.first_name AS FIRST_NAME, employees.last_name AS LAST_NAME, employees.id, role.title, department.name AS DEPARTMENT, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS MANAGER
  FROM employees
  LEFT JOIN employees manager on manager.id = employees.manager_id
  INNER JOIN role ON (role.id = employees.role_id)
  INNER JOIN department ON (department.id = role.department_id)
  ORDER BY employees.id;`;
  connection.query(query, (err, res) => {
    if (err) throw err;
    console.log("\n");
    console.log("EMPLOYEES");
    console.log("\n");
    console.table(res);

    startPrompt();
  });
}
//creates a new department
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
//creates new role
function addRole() {
  connection.query(
    "SELECT department.id, department.name FROM department ORDER BY department.id;",
    async (err, res) => {
     
      await inquirer
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
          {
            type: "list",
            name: "whatDepartment",
            message: "What department does this role go under?",
            choices: () => res.map((res) => res.name),
          },
        ])
        .then((data) => {
          let deparmentId = ''
          for (const row of res) {
          if (row.name === data.whatDepartment) {
            departmentId = row.id;
            
          }}
          let newTitle = data.newTitle;
          let newSalary = data.newSalary;
          const query = `INSERT INTO role (title, salary, department_id) VALUES ('${newTitle}',${newSalary}, ${departmentId});`;
         
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
  );
}
//used for add employee, gathers the employees name
function createNewName() {
  return [
    {
      name: "first",
      type: "input",
      message: "Enter the employees first name: ",
    },
    {
      name: "last",
      type: "input",
      message: "Enter the employees last name: ",
    },
  ];
}
//adds an employee
async function addEmployee() {
  const addname = await inquirer.prompt(createNewName());
  connection.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id;",
    async (err, res) => {
      if (err) throw err;
      const { role } = await inquirer.prompt([
        {
          name: "role",
          type: "list",
          choices: () => res.map((res) => res.title),
          message: "What is the employee role?: ",
        },
      ]);
      let roleId = "";
      for (const row of res) {
        if (row.title === role) {
          roleId = row.id;
          continue;
        }
      }
      connection.query("SELECT * FROM employees", async (err, res) => {
        if (err) throw err;
        let choices = res.map((res) => `${res.first_name} ${res.last_name}`);
        choices.push("none");
        let { manager } = await inquirer.prompt([
          {
            name: "manager",
            type: "list",
            choices: choices,
            message: "Choose the employee Manager: ",
          },
        ]);
        let managerId = "";
        let managerName = "";

        if (manager === "none") {
          managerId = null;
        } else {
          for (const data of res) {
            data.fullName = `${data.first_name} ${data.last_name}`;
            if (data.fullName === manager) {
              managerId = data.id;
              managerName = data.fullName;
              console.log(managerId);
              console.log(managerName);
              continue;
            }
          }
        }
        console.log("\x1b[32m", "Employee has successfully been added!");
        connection.query(
          "INSERT INTO employees SET ?",
          {
            first_name: addname.first,
            last_name: addname.last,
            role_id: roleId,
            manager_id: parseInt(managerId),
          },
          (err, res) => {
            if (err) throw err;
            startPrompt();
          }
        );
      });
    }
  );
}

function updateEmployee() {
  connection.query(
    "SELECT role.id, role.title FROM role ORDER BY role.id;",
    async (err, res) => {
      if (err) throw err;
      await inquirer
        .prompt([
          {
            type: "input",
            name: "employeeId",
            message: "What is the employees ID?",
          },
          {
            type: "list",
            name: "updateRole",
            message: "What is employees new role?",
            choices: () => res.map((res) => res.title),
          },
        ])
        .then((answers) => {
          let roleId = "";
          for (const row of res) {
            if (row.title === answers.updateRole) {
              roleId = row.id;
              continue;
            }
          }
          connection.query(
            `UPDATE employees SET role_id = ${roleId} WHERE employees.id = ${answers.employeeId}`,
            async (err, res) => {
              if (err) throw err;
              console.log("\x1b[32m", "Successfully updated employee");
              startPrompt();
            }
          );
        });
    }
  );
}
