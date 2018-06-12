var mysql = require("mysql");
var prompt = require('prompt');
var inquirer = require('inquirer');
var colors = require('colors');


var connection = mysql.createConnection({
  host: "127.0.0.1",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "880527@Mao",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
});

function showInventory() {
    connection.query('SELECT * FROM products', function(err, inventory) {
        if (err) throw err;
              console.log("Bamazon's Inventory");
              for(var i = 0; i < inventory.length; i++) {
              console.log("Item ID: " + inventory[i].item_id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " | Price: " +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
         }

         inquirer.prompt([

             // Here we create a basic text prompt.
             {
                 type: "input",
                 message: "What is the id of the item you would like to buy?",
                 name: "id"
             },

              {
                 type: "input",
                 message: "How many would you like to buy?",
                 name: "quantity"
             }

         // Once we are done with all the questions... "then" we do stuff with the answers
         // In this case, we store all of the answers into a "order" object that inquirer makes for us.
         ]).then(function (order) {
             // If we log that order as a JSON, we can see how it looks.
             //console.log(JSON.stringify(order, null, 2));
                   var quantity = order.quantity;
                   var itemId = order.id;
                   connection.query('SELECT * FROM products WHERE item_id=' + itemId, function(err, selectedItem) {
                       if (err) throw err;
                        if (selectedItem[0].stock_quantity - quantity >= 0) {
                             console.log("Bamazon's Inventory has enough of that item (".green + selectedItem[0].product_name.green + ")!".green);
                             console.log("Quantity in Stock: ".green + selectedItem[0].stock_quantity + " Order Quantity: ".green + quantity);
                             console.log("You will be charged ".green + (order.quantity * selectedItem[0].price) +  " dollars.  Thank you for shopping at Bamazon.".green);
                             //  This is the code to remove the item from inventory.
                             // Some code from the mysql NPM readme: connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function(err, results) {});
                             connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem[0].stock_quantity - quantity, itemId],
                             function(err, inventory) {
                                 if (err) throw err;
                                  // Runs the prompt again, so the user can keep shopping.
                                  showInventory();
                             });  // Ends the code to remove item from inventory.

                        }

                        else {
                             console.log("Insufficient quantity.  Please order less of that item, as Bamazon only has ".red + selectedItem[0].stock_quantity + " " + selectedItem[0].product_name.red + " in stock at this moment.".red);
                             showInventory();
                        }
                   });
         });
    });
}

showInventory();
