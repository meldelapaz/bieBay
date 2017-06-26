//Running this application will display all of the items available for sale

//SELECT * FROM `books`; --> to show items

//Prompt users with two messages:
    //Please write the ID of the product you would like to buy.
    //How many units of the product would you like to buy?

//Search if there are enough products in store
    // if not enough console.log('Insufficient quantity!') and prevent order from going through
    // else if enough, fulfill customer's order, update SQL database to reflect remaining quantity
    // then SHOW database


var mysql = require("mysql");
var inquirer = require("inquirer");

//creating the connection information for the sql database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bieBay"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    inquirer.prompt([
        {
            type: "confirm",
            message: "Would you like to buy Justin Bieber Merchendise?",
            name: "confirm",
            default: true
        }
    ]).then(function (answers) {
        if (answers.confirm) {
            chooseProduct();
        } else {
            console.log("Fine. Bye.")
        }
    });
}

function chooseProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

        inquirer.prompt([
            {
                type: "rawlist",
                message: "Please choose the product you would like to buy:",
                name: "choice",
                choices: function() {
                    var choiceArray = [];
                    for (var i = 0; i < results.length; i++) {
                        choiceArray.push(results[i].product_name);
                    }
                    return choiceArray;
                }
            },
            {
                type: "input",
                message: "How many would you like?",
                name: "quantity"
            }
        ]).then(function(answer){
            var chosenItem;
            for (var i = 0; i < results.length; i++) {
                if (results[i].product_name === answer.choice){
                    chosenItem = results[i];
                }
            }

            if (results.stock_quantity < parseInt(answer.quantity)) {
                connection.query(
                    "UPDATE products SET ? WHERE ?",
                    [
                        {
                            stock_quantity: answer.quantity
                        },
                        {
                            id: chosenItem.id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("Order successful!");
                        start();
                    }
                );
            } else {
                console.log("Sorry, item is out of stock...");
                start();
            }
        });
    });
}