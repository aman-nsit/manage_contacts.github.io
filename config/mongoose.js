//require the library
const mongoose = require('mongoose');

//connect to the databasen
mongoose.connect('mongodb+srv://admin-1234:test-1234@cluster0.jzxvy15.mongodb.net/contact_list_db');

//acquire the connection(to check if it's successful)
const db = mongoose.connection;

//error
db.on('error', function(err) { console.log(err.message); });

//up and running then print the message
db.once('open', function() {
  
    console.log("Successfully connected to the database");

});