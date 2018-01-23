var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// mongoose.connect(process.env.CONNECTION_STRING, {useMongoClient: true}, function(err,db){
//   if (err) { console.log("database is not connected !")}
//   if (db) {console.log("Database connected Successfully")}
// })

// var Post = require('./models/********');

var app = express();
app.use(express.static('public'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));





app.listen(8000, function() {
    console.log("Server connected through port 8000");
  })

  // Adi testing