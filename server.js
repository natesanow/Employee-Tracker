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

 connection.connect(function (err) {
    if(err) throw err;
    questions();
 });
  
 function questions() {
  inquirer
    .prompt([
      {
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
      if (answer.starterQuestion === "View all Employees") {
        viewAllEmployees();
      } else if (answer.starterQuestion === "Add Employee") {
        addEmployee();
      } else if (answer.starterQuestion === "Update Employee Role") {
        updateEmployee();
      } else if (answer.starterQuestion === "View all Roles") {
        viewAllRoles();
      } else if (answer.starterQuestion === "Add Role") {
        addRole();
      } else if (answer.starterQuestion === "View all Departments") {
        viewAllDepartments();
      } else if (answer.starterQuestion === "Add Department") {
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
      message: "what is the employees last name?",
    },
    {
      type: "input",
      name: "roleId",
      message: "what is the employees role ID",
    },
    {
      type: "input",
      name: "managerId",
      message: "what is the employees manager ID",
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

function addRole() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "title",
      message: "what is the role title?",
    },
    {
      type: "input",
      name: "salary",
      message: "what is the salary?",
    },
    {
      type: "input",
      name: "departmentId",
      message: "what is the department ID?",
    },
  ])
  .then((answers) => {
    connection.query("INSERT INTO role SET?", {
      title: answers.title,
      salary: answers.salary,
      department_id: answers.department_id,
    });
    questions();
  });
}

function addDepartment() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "dept",
      message: "what department are you adding?",
    },
  ])
  .then((answer) => {
    connection.query("INSERT INTO department SET", {
      name: answer.dept,
    });
    questions();
  });
}

function updateEmployee() {
  inquirer
  .prompt([
    {
      type: "input",
      name: "employeeId",
      message: "what employee ID is getting a new role?"
    },
    {
      type: "input",
      name: "roleId",
      message: "what is the role ID for the new role?"
    },
  ])
  .then(answers => {
    connection.query("UPDATE employee SET ? WHERE ?", [
      {
        role_id: answers.roleId
      },
      {
        id: answers.employeeId
      }
    ])
    questions()
  })
}

