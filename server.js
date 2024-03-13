const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

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
    console.log(`Connected to the employee_db database.`)
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
        ]
    }])
    .then((answer) => {
        if (answer.startingQuestion === "View all Employees ") {
          viewAllEmployees();
        } else if (answer.startingQuestion === "Add new employee") {
          addEmployee();
        } else if (answer.startingQuestion === "Update employee role") {
          updateEmployee();
        } else if (answer.startingQuestion === "View All roles") {
          viewAllRoles();
        } else if (answer.startingQuestion === "Add new role") {
          addRole();
        } else if (answer.startingQuestion === "View all Departments"){
          viewAllDepartments();
        } else if (answer.startingQuestion === "Add new department") {
          addDepartment();
        } else {
          connection.end();
        }
      });
}
  