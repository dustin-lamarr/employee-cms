const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');
const viewWhat = require("./viewWhat.js");
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
            if (answer.menu === "Update") {
                updateWhat();
            }
        });
};

function updateWhat() {
    inquirer
        .prompt({
            name: "update",
            type: "rawlist",
            message: "Which would you like to update?",
            choices: [
                "Departments",
                "Roles",
                "Employees"
            ]
        })
        .then(answer => {
            if (answer.update === "Departments") {
                selectDept();
            }

            if (answer.update === "Roles") {
                selectRole(); //need to create
            }

            if (answer.update === "Employees") {
                showEmps(); // need to create
            }
        });

    function selectDept() {
        connection.query("SELECT * FROM department",
            function (err, res) {
                if (err) throw err;
                inquirer
                    .prompt([
                        {
                            name: "department",
                            type: "rawlist",
                            message: "Choose department to update",
                            choices: function () {
                                var choicesArray = [];
                                for (var i = 0; i < res.length; i++) {
                                    choicesArray.push(res[i].name);
                                }
                                return choicesArray;
                            }
                        },
                        {
                            name: "updated",
                            type: "input",
                            message: "Choose new department name"
                        }
                    ])
                    .then(answers => {
                        updateDept(answers);
                    });

                updateMore();

                function updateDept(answers) {
                    var deptQuery = "UPDATE department SET ? WHERE ?";
                    connection.query(deptQuery,
                        [{
                            name: answers.updated
                        },
                        {
                            name: answers.department
                        }],
                        function (err, res) {
                            if (err) throw (err);
                            console.table(res)
                        });

                };
            });
    };

    function selectRole() {
        connection.query("SELECT * FROM role",
            function (err, res) {
                if (err) throw err;
                inquirer
                    .prompt([
                        {
                            name: "role",
                            type: "list",
                            message: "Choose role to update",
                            choices: function () {
                                var choicesObj = [];
                                for (var i = 0; i < res.length; i++) {
                                    choicesObj.push({
                                        value: res[i].id,
                                        name: res[i].title
                                    })
                                }
                                console.log(choicesObj);
                                return choicesObj;
                            }

                        },
                        {
                            name: "updateWhich",
                            type: "rawlist",
                            message: "Which would you like to update?",
                            choices: ["Title", "Salary", "Department ID"]
                        },
                        {
                            name: "update",
                            type: "input",
                            message: "Enter new data"
                        }
                    ])

                    .then((answers) => {
                        if (answers.updateWhich === "Title") {
                            updateTitle(answers);
                        };

                        if (answers.updateWhich === "Salary") {
                            updateSalary(answers);
                        }

                        if (answers.updateWhich === "Department ID") {
                            updateDeptID(answers);

                        }
                        updateMore();

                        function updateTitle() {
                            console.log(answers)
                            connection.query("UPDATE role SET ? WHERE ?",
                                [{
                                    title: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };

                        function updateSalary() {
                            connection.query("UPDATE role SET ? WHERE ?",
                                [{
                                    salary: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };

                        function updateDeptID() {
                            connection.query("UPDATE department_id SET ? WHERE ?",
                                [{
                                    department_id: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        }
                    });
            });
    };

    function updateMore() {
        inquirer
            .prompt({
                type: 'list',
                name: 'updateMore',
                message: "Would you like to update another role?",
                choices: ["Yes",
                    "No"],
            })
            .then((answer) => {
                if (answer.updateMore === "Yes") {
                    updateWhat();
                }

                if (answer.updateMore === "No") {
                    appStart();
                }
            });
    };
};


module.exports = updateWhat;