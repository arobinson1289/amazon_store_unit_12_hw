var inquirer = require('inquirer');
var mysql = require('mysql');
require('console.table');

const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "bamazon"
})

db.connect(function(err){
    if(err){
        console.log(`error connecting ${err.stack}`);
    } else {
        BAMAZON()
    }
})

function BAMAZON(){
    var sqlQuery = "SELECT * FROM products;"

    db.query(sqlQuery, function(err, res){
        if(err) throw err;
        DisplayDB(res);
    })
}

function DisplayDB(data){
    for(let i = 0; i < data.length; i++){
        console.log(`ID: ${data[i].item_id}, Name: ${data[i].product_name}, Price: ${data[i].price}, Inventory: ${data[i].stock_quantity}`)
    }

    ChooseItem(data)
}

function ChooseItem(data){
    inquirer.prompt([
        {
            type: "input",
            name: "choice",
            message: "ID product you wish to purchase",
            validate: function(val){
                return !isNaN(val) 
            }
        }
    ]).then(function(answer){
        var item = GetItem(data, answer.choice)

        PromptQuantity(item)
    })
}

function PromptQuantity(product){
    inquirer.prompt([
        {
            type: "input",
            name: "quantity",
            message: "How many do you want?",
            validate: function(val){
                return !isNaN(val) && val > 0
            }
        }
    ]).then(function(answer){
        if(answer.quantity >= product.stock_quantity){
            console.log("Not enough")
            BAMAZON()
        } else {
            console.log("Lets buy this")
            makePurchase(product, answer.quantity)
        }
    })
}

function makePurchase(product, quantity){
    var sqlQuery = `UPDATE products
                    SET stock_quantity = stock_quantity - ? 
                    WHERE item_id = ?`

    db.query(sqlQuery, [ quantity, product.item_id ], function(err, res){
        if(err) throw err;

        console.log(`You spent $${product.price * quantity}`)
        BAMAZON();
    })
}

function GetItem(data, id){
    for(var i = 0; i < data.length; i++){
        if(data[i].item_id === parseInt(id)){
            return data[i]
        } 
    }
    return null
}