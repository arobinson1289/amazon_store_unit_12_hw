DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
​
USE bamazon_DB;
​
CREATE TABLE products(
 id INT NOT NULL AUTO_INCREMENT,
 item_name VARCHAR(100) NOT NULL,
 price INT default 0,
 stock INT default 0,
 PRIMARY KEY (id)
);