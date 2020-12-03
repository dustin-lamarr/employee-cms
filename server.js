const mysql = require("mysql");
const inquirer = require("inquirer");
// const AddDept = require("./addDept");
// const addDept = require("./addDept");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "seasonofRudy14",
    database: "employees_db"
});

connection.connect(function (err) {
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
        .then(function (answers) {

            addDept();

        })
}


function addDept() {

    inquirer
        .prompt([
        {
            name: "department",
            type: "input",
            message: "Enter new department name"
        },
        {
            name: "again",
            type: "list",
            message: "Would you like to enter another new department?",
            choices: ["Yes", "No"]
        }])

        .then(answers => {

            if (answers.again === "Yes") {
                connection.query(
                    "INSERT INTO department ?",
                    {
                        name: answers.department
                    }
                );
                addDept();
            }
            if (answers.again === "No") {
                connection.query(
                    "INSERT INTO department SET ?",
                    {
                        name: answers.department
                    },
                    function(err) {
                        if (err) throw err;
                        console.log("it worked"); 
                      }   
                )
            }
        })
}

// console.log(name)

runApp();