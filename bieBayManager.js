var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "",
    database: "bieBay"
});

connection.connect(function (err) {
    if (err) throw err;
});


inquirer.prompt([
    {
        type: "rawlist",
        message: "Please choose the product you would like to buy:",
        name: "choice",
        choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
]).then(function(answer) {
    switch(answer.choice) {
        case "View Products for Sale":
            productSale();
        break;

        case "View Low Inventory":
            lowInventory();
        break;

        case "Add to Inventory":
            addInventory();
        break;

        case "Add New Product":
            newProduct();
        break;
    }
});

function productSale () {
    console.log("nice, viewing products for sale");
    connection.query("SELECT * FROM `products`" , function (queryError, response){
        if (queryError)
            throw queryError;
            response.forEach(function (row) {
                console.log("id = ", "'", row.id, "'",
                "Product Name = ", "'", row.product_name, "'",
                "Price:", "'", row.price, "'",
                "Quantity:", "'", row.stock_quantity, "'")
            });
    });
}

function lowInventory () {
    connection.query("SELECT `product_name`, `stock_quantity` FROM `products` WHERE `stock_quantity`< 5 ORDER BY `stock_quantity` DESC;", function(err, results) {
        if (err)
            throw err;
        console.log(results)
    })
}

function addInventory () {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;

    inquirer.prompt([
        {
            type: "rawlist",
            message: "Add more of any of the following products:",
            name: "choice",
            choices: function() {
                var choiceArray = [];
                for (var i = 0; i < results.length; i++) {
                    choiceArray.push(results[i].product_name);
                }
                return choiceArray;
            }
        }
    ]).then(function(answer){
        var addedItem;
        for (var i = 0; i < results.length; i++) {
            if (results[i].item_name === answer.choice) {
                addedItem = results[i];
            }
        }
        connection.query(
            "UPDATE auctions SET ? WHERE ?",
            [
                {
                    stock_quantity: stock_quantity++
                }
            ],
            function(error) {
                if (error) throw err;
                console.log("Order successful!");
                start();
            }
        );
    })
    })
}

function newProduct() {
    console.log("nice, adding new product");
}