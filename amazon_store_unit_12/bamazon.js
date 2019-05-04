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
      
        console.log(res);

    })
}