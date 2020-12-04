const mysql = require("mysql");
const inquirer = require("inquirer");
const addWhat = require("./addWhat.js");
const appStart = require("./appStart");


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

appStart();
