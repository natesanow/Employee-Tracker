const express = require('express');
const mysql = require('mysql2');
const inquirer = require('inquirer');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: '57Oliveway!',
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

 db.connect = (function (err) {
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
 }