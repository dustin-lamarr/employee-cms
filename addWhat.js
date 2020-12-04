const mysql = require("mysql");
const inquirer = require("inquirer");
// const appStart = require("./appStart");

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
        });
};

function addWhat() {
    inquirer
        .prompt({
            name: "add",
            type: "rawlist",
            message: "Which would you like to add?",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        })
        .then(answer => {
            if (answer.add === "Departments") {
                addDept();
            }


            if (answer.add === "Roles") {
                addRole();
            }
        });

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
                            "INSERT INTO department SET ?",
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
                            function (err) {
                                if (err) throw err;
                                console.log("it worked");
                            }
                        );
                        appStart();
                    }
                });
        };
        
        function addRole() {
            inquirer
                .prompt([
                    {
                        name: "title",
                        type: "input",
                        message: "Enter title"
                    },
                    {
                        name: "salary",
                        type: "input",
                        message: "Enter salary"
                    },
                    {
                        name: "deptID",
                        type: "input",
                        message: "Enter department ID number"
                    },
                    {
                        name: "again",
                        type: "list",
                        message: "Would you like to enter another new role?",
                        choices: ["Yes", "No"]
                    }
                ])
                .then(answers => {
                    if (answers.again === "Yes") {
                        connection.query(
                            "INSERT INTO role SET ?",
                            {
                                title: answers.title,
                                salary: answers.salary,
                                department_id: answers.deptID
                            }
                        );
                        addRole();
                    }
                    if (answers.again === "No") {
                        connection.query(
                            "INSERT INTO role SET ?",
                            {
                                title: answers.title,
                                salary: answers.salary,
                                department_id: answers.deptID
                            },
                            function (err) {
                                if (err) throw err;
                                console.log("it worked");
                            }
                        );
                        appStart();
                    }
                });
        };
};



module.exports = addWhat;