DROP DATABASE IF EXISTS amazonStore_DB;
CREATE DATABASE amazonStore_DB;

USE amazonStore_DB;

CREATE TABLE products(
  id INT NOT NULL AUTO_INCREMENT,
  item_name VARCHAR(100) NOT NULL,
  department VARCHAR(45) NOT NULL,
  price INT default 0,
  stock INT default 10,
  PRIMARY KEY (id)
);