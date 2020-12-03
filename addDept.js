const mysql = require("mysql");
const inquirer = require("inquirer");
const { createConnection } = require("net");


function addDept() {
    
        inquirer
            .prompt({
                name: "department",
                type: "input",
                message: "Enter new department name"
            },
            {
                name: "again",
                type: "list",
                message: "Would you like to enter another new department?",
                choices: ["Yes", "No"]
            .then(answers => {

                if (answers.again === "Yes"){
                    connection.query(
                        "INSERT INTO employees_db ?",
                        {
                            name: answers.department
                        }
                    );
                    addDept();
                }
                if (answers.again === "No"){
                    connection.query(
                        "INSERT INTO employees_db ?",
                        {
                            name: answers.department
                        }
                    )
                }
            })
    });
  
    console.log(name)
}

module.exports = addDept;