const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "seasonofRudy14",
    database: "employees_db"
});

connection.connect(function(err) {
    if (err) throw (err);
});

function runApp() {
    inquirer.prompt({
        name: "options",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Add departments, roles, or employees",
            "View departments, roles, or employees",
            "Update employee roles"
        ]
    })
    .then(function(answers) {
        switch (answers.action) {
        case "Add departments, roles, or employees":
            
        }
    })
}