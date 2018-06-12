DROP DATABASE IF EXISTS bamazonDB;
CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(256) NULL,
  department_name VARCHAR(256) NULL,
  price DECIMAL(3,2) NULL,
  stock_quantity INT(255) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Coke", "Drink", 1.75, 95);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Monster", "Drink", 2.25, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Papaya", "Fruite", 3.50, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Apple", "Fruite", 2.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Oreo", "Cookie", 1.99, 90);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Macaroon", "Cookie", 7.99, 40);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cheetos", "Snack", 0.99, 85);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Lays", "Snack", 0.89, 82);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Banana", "Fruite", 0.19, 200);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Minion", "Toy", 9.99, 10);