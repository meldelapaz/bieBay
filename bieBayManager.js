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
    if (answer[0]) {
        productSale()
    } else if (answer[1]) {
        lowInventory()
    } else if (answer[3]) {
        addInventory ()
    } else if (answer[4]) {
        newProduct()
    }
    //else if inquirer.choices[1]
});

function productSale () {
    console.log("nice, viewing products for sale");
    // connection.query("SELECT * FROM `products`" , function (queryError, response){
    //     if (queryError)
    //         throw queryError;
    //         response.forEach(function (row) {
    //             console.log("id = ", "'", row.id, "'",
    //             "Product Name = ", "'", row.product_name, "'",
    //             "Price:", "'", row.price, "'",
    //             "Quantity:", "'", row.stock_quantity, "'")
    //         });
    // });
}

function lowInventory () {
    console.log("nice, viewing low inventory");
}

function addInventory () {
    console.log("nice, adding inventory");
}

function newProduct() {
    console.log("nice, adding new product");
}