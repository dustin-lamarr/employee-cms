const mysql = require("mysql");
const inquirer = require("inquirer");

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

runApp();

var menu = {
    type: 'list',
    name: 'menu',
    message: "What would you like to do?",
    choices: ["Add departments, roles, or employees",
        "View departments, roles, or employees",
        "Update employee roles"],
};

function runApp() {

    inquirer.prompt(menu).then((answers) => {
        if (answers.choices === "Add departments, roles, or employees") {

            inquirer.prompt({
                name: "roleAdds",
                type: "rawlist",
                message: "Which would you like to add?",
                choices: [
                    "Add departments",
                    "Add roles",
                    "Add employees"
                ]
            })
                .then(answers => {
                    if (answers.roleAdds === "Add departments") {
                        addDept()
                    }


                    if (answers.roleAdds === "Add roles") {

                    }
                });
        }
    });
};

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
                    function (err) {
                        if (err) throw err;
                        console.log("it worked");
                    }
                );
                runApp();
            }
        })
}

// function addSelect() {
//     inquirer.prompt({
//         name: "roleAdds",
//         type: "rawlist",
//         message: "Which would you like to add?",
//         choices: [
//             "Add departments",
//             "Add roles",
//             "Add employees"
//         ]
//     })
//         .then(answers => {
//             if(answers.roleAdds === "Add departments"){
//             addDept()
//             }


//             if(answers.roleAdds === "Add roles"){
//                 new AddRole
//             }
// });
// }
