const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const addWhat = require("./addWhat.js");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "seasonofRudy14",
    database: "employees_db"
});

function appStart() {
    inquirer
        .prompt({
            type: 'list',
            name: 'menu',
            message: "From this menu, you can choose to Add, View, or update info for departments, roles, or employees. What would you like to do?",
            choices: ["Add",
                "View",
                "Update"],
        })
        .then((answer) => {
            if (answer.menu === "Add") {
                addWhat();
            }

            if (answer.menu === "View") {
                viewWhat();
            }
        });
};

function viewWhat() {
    inquirer
        .prompt({
            name: "view",
            type: "rawlist",
            message: "Which would you like to view?",
            choices: [
                "Departments",
                "Roles",
                "Employees",
                new inquirer.Separator(),
                "Exit"
            ]
        })
        .then(answer => {
            if (answer.view === "Departments") {
                viewDepts();
            }

            if (answer.view === "Roles") {
                viewRoles();
            }

            if (answer.view === "Employees") {
                viewEmployees();
            }

            if (answer.view === "Exit") {
                appStart();
            }
        });

    function viewDepts() {
        var deptQuery = "SELECT * FROM department";
        connection.query(deptQuery, function (err, res) {
            if (err) throw (err);
            console.table(res)
            viewMore();
        });
    };

    function viewRoles() {
        var roleQuery = "SELECT * FROM role";
        connection.query(roleQuery, function (err, res) {
            if (err) throw (err);
            console.table(res)
            viewMore();
        });
    };

    function viewEmployees() {
        var empQuery = "SELECT * FROM employee";
        connection.query(empQuery, function (err, res) {
            if (err) throw (err);
            console.table(res)
            viewMore();
        });
    }

    function viewMore() {
        inquirer
            .prompt({
                type: 'list',
                name: 'viewMore',
                message: "Would you like to view more?",
                choices: ["Yes",
                    "No"],
            })
            .then((answer) => {
                if (answer.viewMore === "Yes") {
                    viewWhat();
                }
    
                if (answer.viewMore === "No") {
                    appStart();
                }
            });
    };
};



module.exports = viewWhat;