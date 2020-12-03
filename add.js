const mysql = require("mysql");
const inquirer = require("inquirer");


function AddDept(name) {
    this.newDept = () => {
        inquirer
            .prompt({
                name: "department",
                type: "input",
                message: "Enter new department name"
            },
            )
    }
    this.id = id;
    this.name = name;

}