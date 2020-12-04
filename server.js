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
    runApp();
});



function runApp() {

    inquirer.prompt({
        type: 'list',
        name: 'menu',
        message: "From this menu, you can choose to Add, View, or update info for departments, roles, or employees. What would you like to do?",
        choices: ["Add",
            "View",
            "Update"],
    })

        .then((answers) => {
            console.log(answers);

            if (answers.choices === "Add") {
                addDept();
                // inquirer.prompt({
                //     name: "roleAdds",
                //     type: "rawlist",
                //     message: "Which would you like to add?",
                //     choices: [
                //         "Add departments",
                //         "Add roles",
                //         "Add employees"
                //     ]
                // })
                //     .then(answers => {
                //         if (answers.roleAdds === "Add departments") {
                //             // addDept()
                //         }


                //         if (answers.roleAdds === "Add roles") {

                //         }
                //     });
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
