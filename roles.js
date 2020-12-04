const mysql = require("mysql");
const inquirer = require("inquirer");

function AddRole(title, salary, deptID) {
    
 this.title= addRole = () =>{
    inquirer
        .prompt([
            {
                name: "role",
                type: "input",
                message: "Enter new role"
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
                    "INSERT INTO role ?",
                    {
                        name: answers.role
                    }
                );
                addRole();
            }
            if (answers.again === "No") {
                connection.query(
                    "INSERT INTO role SET ?",
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
}

module.exports = Employee;