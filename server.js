const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');
const consoleTable = require('console.table');
// Connect to database
const connection = mysql.createConnection(
    {
      host: 'localhost',
      port: 3306,
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: "57Oliveway!",
      database: 'employee_db',
    },
  );

 connection.connect = (function (err) {
    if(err) throw err;
    questions();
 });
  
 function questions() {
    inquirer
      .prompt([{
         type: "list",
         name: "starterQuestion",
         message: "What would you like to do?",
         choices: [
            "View all Employees",
            "Add Employee",
            "Update Employee Role",
            "View all Roles",
            "Add Role",
            "View all Departments",
            "Add Department",
            "Exit Menu",
         ],
      },
    ])
    .then((answer) => {
        if (answer.starterQuestion === "View all Employees ") {
          viewAllEmployees();
        } else if (answer.starterQuestion === "Add new employee") {
          addEmployee();
        } else if (answer.starterQuestion === "Update employee role") {
          updateEmployee();
        } else if (answer.starterQuestion === "View All roles") {
          viewAllRoles();
        } else if (answer.starterQuestion === "Add new role") {
          addRole();
        } else if (answer.starterQuestion === "View all Departments"){
          viewAllDepartments();
        } else if (answer.starterQuestion === "Add new department") {
          addDepartment();
        } else {
          connection.end();
        }
      });
}

function viewAllEmployees() {
    connection.query('SELECT * FROM employee', function (err, res) {
        if(err) throw err;
        console.table(res);
        questions();
    });
}

function viewAllRoles() {
  connection.query('SELECT * FROM role', function (err, res) {
    if(err) throw err;
    console.table(res);
    questions();
});
}

function viewAllDepartments() {
  connection.query('SELECT * FROM department', function (err, res) {
    if(err) throw err;
    console.table(res);
    questions();
});
}

function addEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "first",
      message: "whatis the employees first name?",
    },
    {
      type: "input",
      name: "last",
      message: "what is the employees role ID?",
    },
  ])
  .then((answers) => {
    connection.query("INSERT INTO employee SET?", {
      first_name: answers.first,
      last_name: answers.last,
      role_id: answers.roleId,
      manager_id: answers.managerId,
    });
    questions();
  });
}