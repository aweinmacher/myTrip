var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripDB',{useMongoClient:true},function(err,db){
  if (err) { console.log("database is not connected !")};
  if (db) {console.log("Database connected Successfully")}
});

var app = express();
app.use(express.static('public'));
app.use(express.static('models'));
app.use(express.static('node_modules'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var Post = require('./models/models.post');
var Trip = require('./models/models.trip');
var Todo = require('./models/models.todo');

// RUN ONLY ONCE ---- CREATION CODE !!! CREATION CODE !!! CREATION CODE !!! CREATION CODE
var user1 = new User({
  name: 'User 1',
  trips: []
});
var trip1 = new Trip({
  user: user1._id,
  country: 'Country 1',
  flight: {
      number: 'Team-106',
      from: 'Elevation',
      to: 'First IT job',
      departure: {
          date: '23-Jan-2018',
          time: '9:00'
      },
      arrival: {
          date: '25-Jan-2018',
          time: '12:00'
      }
  },
  todos: []
});
var todo = new Todo({
  user: user1._id,
  text: 'Enjoy awesome stuff we learn'
});

todo.save(); // user1._id already exists, so it should be pushed automatically -> we can save todo

trip1.todos.push(todo); // in trip1 user1._id comes automatically, so before saving we need to push only a todo
trip1.save(); // save trip before pushing it into user

user1.trips.push(trip1);
user1.save();
// END OF CREATION CODE !!! END OF CREATION CODE !!! END OF CREATION CODE !!! END OF CREATION CODE !!!







app.listen(8080, function() {
    console.log("Server connected through port 8080");
  })