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
                selectEmp(); // need to create
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
                            type: "list",
                            message: "Choose department to update",
                            choices: function () {
                                var choicesArray = [];
                                for (var i = 0; i < res.length; i++) {
                                    choicesArray.push({
                                        value: res[i].id,
                                        name: res[i].name
                                    });
                                }
                                return choicesArray;
                            }
                        },
                        {
                            name: "updated",
                            type: "input",
                            message: "Enter new department name"
                        }
                    ])
                    .then(answers => {
                        updateDept(answers);
                        updateMore();
                    });

                function updateDept(answers) {
                    var deptQuery = "UPDATE department SET ? WHERE ?";
                    connection.query(deptQuery,
                        [{
                            name: answers.updated
                        },
                        {
                            id: answers.department
                        }],
                        function (err, res) {
                            if (err) throw (err);
                            console.log(answers.department + " successfully changed to " + answers.updated)
                        });

                };
            });
        }
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
                            connection.query("UPDATE role SET ? WHERE ?",
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
                        };
                    });
            });
    };

    function selectEmp() {
        connection.query("SELECT * FROM employee",
            function (err, res) {
                if (err) throw err;
                inquirer
                    .prompt([
                        {
                            name: "role",
                            type: "list",
                            message: "Choose employee to update",
                            choices: function () {
                                var choicesObj = [];
                                for (var i = 0; i < res.length; i++) {
                                    choicesObj.push({
                                        value: res[i].id,
                                        name: res[i].first
                                    })
                                }
                                return choicesObj;
                            }

                        },
                        {
                            name: "updateWhich",
                            type: "rawlist",
                            message: "Which would you like to update?",
                            choices: ["First Name", "Last Name", "Role ID", "Manager ID"]
                        },
                        {
                            name: "update",
                            type: "input",
                            message: "Enter new data"
                        }
                    ])

                    .then((answers) => {
                        if (answers.updateWhich === "First Name") {
                            updateFirst(answers);
                        };

                        if (answers.updateWhich === "Last Name") {
                            UpdateLast(answers);
                        }

                        if (answers.updateWhich === "Role ID") {
                            updateRoleID(answers);
                        }

                        if (answers.updateWhich === "Manager ID") {
                            updateMgrID(answers);
                        }
                        updateMore();

                        function updateFirst() {
                            console.log(answers)
                            connection.query("UPDATE employee SET ? WHERE ?",
                                [{
                                    first_name: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };

                        function UpdateLast() {
                            connection.query("UPDATE employee SET ? WHERE ?",
                                [{
                                    last_name: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };

                        function updateRoleID() {
                            connection.query("UPDATE employee SET ? WHERE ?",
                                [{
                                    role_id: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };

                        function updateMgrID() {
                            connection.query("UPDATE employee SET ? WHERE ?",
                                [{
                                    manager_id: answers.update
                                },
                                {
                                    id: answers.role
                                }],
                                function (err, res) {
                                    if (err) throw (err);
                                    console.log(answers.role + " successfully changed to " + answers.update)
                                });
                        };
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