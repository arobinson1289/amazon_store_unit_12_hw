var mysql = require("mysql");
var inquirer = require("inquirer");

const db = mysql.createConnection({
    host:"localhost",
    port: 3306,
    user: "root",
    password:"Dixielyon3",
    database:"bamazon_DB"
})

db.connect(function(err){
  if(err){
    console.log(`error connecting ${err.stack}`);
  }else {
      Getdb()
    };
  
})

function Getdb (){
    var sqlQuery = "SELECT * FROM products"

    db.query(sqlQuery, function(err,res){
        if(err) throw err;
      
        DisplayDB(res);

    })
}

function DisplayDB(data){
    for(let i = 0; i < data.length; i++){
        console.log(`ID: ${data[i].id}, Name: ${data[i].item_name}, Price: ${data[i].price},Inventory: ${data[i].stock}`)
    }
    ChooseItem(data)
}

function ChooseItem(data){
    inquirer.prompt([
        {
            type:"input",
            name:"choice",
            message: "Enter the ID of the item you wish to purchase",
            validate:function(val){
                return !isNaN(val) 
            }
        }
    ]).then(function(answer){
        var item = GetItem(data, answer.choice)
        PromptQuantity(item);
    })

}
function PromptQuantity(item){
    console.log(item);
    inquirer.prompt([
        {
            type: "input",
            name:"quantity",
            message:"How many do you want?",
            validate: function(val){
                return !isNaN (val) && val > 0
            }
        }
    ]).then(function(answer){
        if(answer.quantity >= item.stock){
            console.log("not enough hombre")
            DisplayDB()
        } else {
            console.log("lets buy this jawn")
            makePurchase(item, answer.quantity)
        }
    })
}

function makePurchase(item,quantity){
    var sqlQuery = `UPDATE products
                    SET stock = stock - ?
                    WHERE id = ?`
    db.query(sqlQuery, [quantity,item.id], function (err,res){
        if(err) throw err;
        console.log(`You Spent ${item.price * quantity}`)
        Getdb(res);
    })   
}

function GetItem(data, id){
    for(var i = 0; i < data.length; i++){
        if(data[i].id === parseInt(id)){
            return data[i]
        } 
    }
    return null
}