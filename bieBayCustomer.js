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