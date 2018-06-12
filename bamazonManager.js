var prompt = require('prompt');
var inquirer = require('inquirer');
var mysql = require('mysql');
var colors = require('colors');

var connection = mysql.createConnection({
     host: '127.0.0.1',
     port: 3306,
     user: 'root',
     password: '880527@Mao',
     database: "bamazonDB"
});

connection.connect(function(err) {
     if (err) throw err;
     //console.log("connected as id " + connection.threadId);
});

function showInventory() {
     connection.query('SELECT * FROM products', function(err, inventory) {
          if (err) throw err;
          console.log("Bamazon's Inventory");
          for(var i = 0; i < inventory.length; i++) {
            console.log("Item ID: " + inventory[i].item_id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " | Price: " +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
          } // Closes for loop
     }); // Closes connection.query
}

inquirer.prompt([
	// Here we give the user a list to choose from.
	{
		type: "list",
		message: "Select an action",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"],
		name: "selection"
	}

// Once we are done with all the questions... "then" we do stuff with the answers
// In this case, we store all of the answers into a "user" object that inquirer makes for us.
     ]).then(function (user) {
          switch(user.selection) {
               case "View Products for Sale":
               showInventory();
               break;

               case "View Low Inventory":
               connection.query('SELECT * FROM products WHERE stock_quantity < 5', function(err, inventory) {
                    if (err) throw err;
                    console.log("Bamazon's Inventory");
                    for(var i = 0; i < inventory.length; i++) {
                        console.log("Item ID: " + inventory[i].item_id + " | Product: " + inventory[i].product_name + " | Department: " + inventory[i].department_name + " | Price: " +  inventory[i].price + " | Quantity: " + inventory[i].stock_quantity);
                    } // Closes for loop
               }); // Closes connection.query
               break;

               case "Add to Inventory":
               inquirer.prompt([
               	// Here we create a basic text prompt.
               	{
               		type: "input",
               		message: "What is the id of the item you would like to add to?",
               		name: "itemId"
               	},
                    {
               		type: "input",
               		message: "How many items should we add to the inventory of that item?",
               		name: "amount"
               	}
               // Once we are done with all the questions... "then" we do stuff with the answers
               // In this case, we store all of the answers into a "user" object that inquirer makes for us.
          ]).then(function (request) {
               	// If we log that user as a JSON, we can see how it looks.
               	//console.log(JSON.stringify(user, null, 2));
                    connection.query('SELECT * FROM products WHERE item_id=' + request.itemId, function(err, selectedItem) {
                    	if (err) throw err;
                         //if (selectedItem[0].StockQuantity - quantity >= 0) {
                              console.log("You have added ".green + request.amount + " " + selectedItem[0].product_name.green + " to the inventory.".green);
                              // Some code from the mysql NPM readme: connection.query('UPDATE users SET foo = ?, bar = ?, baz = ? WHERE id = ?', ['a', 'b', 'c', userId], function(err, results) {});
                              connection.query('UPDATE products SET stock_quantity=? WHERE item_id=?', [selectedItem[0].stock_quantity + Number(request.amount), request.itemId],
                              function(err, inventory) {
                              	if (err) throw err;
                                   // Runs the prompt again, so the user can keep shopping.
                                   showInventory();
                              });  // Ends the code to add item to the inventory.
                    });
               }); // closes inquirer.prompt in 3rd switch item
               break;

               case "Add New Product":
               inquirer.prompt([
                    // Here we create a basic text prompt.
                    {
                         type: "input",
                         message: "What name of the product you would like to add?",
                         name: "product_name"
                    },
                    {
                         type: "input",
                         message: "What department does this item belong in?",
                         name: "department_name"
                    },
                    {
                         type: "input",
                         message: "What is the price of the item you would like to add to the inventory?",
                         name: "price"
                    },
                    {
                         type: "input",
                         message: "How many items should we add to the inventory of that item?",
                         name: "stock_quantity"
                    }
               // Once we are done with all the questions... "then" we do stuff with the answers
               // In this case, we store all of the answers into a "user" object that inquirer makes for us.
          ]).then(function (newItem) {

               connection.query("INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)",[newItem.product_name, newItem.department_name, newItem.price, newItem.stock_quantity],
               function(err, inventory) {
                    if (err) throw err;
                    // Runs the prompt again, so the user can keep shopping.
                    console.log("Great, ".green + newItem.product_name.green + " have been added to the inventory.".green);
                    showInventory();
               });  // Ends the code to remove item from inventory.


// INSERT INTO products VALUES (newItem.ProductName, newItem.DepartmentName, newItem.Price, newItem.StockQuantity)
               }); // closes inquirer.prompt in 4th switch item
          }  // Closes switch

});  // Closes initial inquirer.prompt