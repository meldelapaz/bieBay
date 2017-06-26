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
    menu()
});


function menu () {
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
}

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
        menu()
    });
}

function lowInventory () {
    connection.query("SELECT `product_name`, `stock_quantity` FROM `products` WHERE `stock_quantity`< 5 ORDER BY `stock_quantity` DESC;", function(err, results) {
        if (err)
            throw err;
        console.log(results)
        menu()
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
            results.stock_quantity++
            menu()
        });
    })
}

function newProduct() {
    console.log("nice, adding new product");

    inquirer.prompt([
        {
            type: "input",
            name: "id",
            message: "Please add the id of the item you would like to add"
        },
        {
            type: "input",
            name: "name",
            message: "Please add the name of the item you would like to add"
        },
        {
            type: "input",
            name: "department",
            message: "Please add the department name of the item you would like to add"
        },
        {
            type: "input",
            name: "price",
            message: "Please add the price of the item you would like to add"
        },
        {
            type: "input",
            name: "quantity",
            message: "Please add the stock quantity of the item you would like to add"
        },
        {
            type: "input",
            name: "autographed",
            message: "Is this product autographed?"
        }
    ]).then(function (answer) {
        var id = answer.id;
        var name = answer.name;
        var department = answer.department;
        var price = answer.price;
        var quantity = answer.quantity;
        var autographed = answer.autographed;

        connection.query("INSERT INTO `products` (`id`, `name`, `department`, `price`, `quantity`, `autographed`) VALUES (?, ?, ?, ?, ?, ?)", [id, name, department, price, quantity, autographed], function(err, data) {

            if (err) {
                throw err
            }
            console.log("Successfully added item!")
        });

    })
}