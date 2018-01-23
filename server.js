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

var User = require('./models/models').user;
var Trip = require('./models/models').trip;
var Todo = require('./models/models').todo;

// 1) to check if the user exists by email and send data back if exists
app.get('/users', function (req, res) {
  // returns an object if user exists
  res.send({
      "_id" : "5a6708ced9d33a19c8584bcf",
      "email": "user@gmail.com",
      "trips" : [
        {
          "_id" : "5a6708ced9d33a19c8584bd0",
          "flight" : {
              "departure" : {
                  "date" : "23-Jan-2018",
                  "time" : "9:00"
              },
              "arrival" : {
                  "date" : "25-Jan-2018",
                  "time" : "12:00"
              },
              "number" : "Team-106",
              "from" : "Elevation",
              "to" : "First IT job"
          },
          "todos" : [{
              "_id" : "5a6708ced9d33a19c8584bd1",
              "user" : "5a6708ced9d33a19c8584bcf",
              "text" : "Enjoy awesome stuff we learn"
          }],
          "user" : ObjectId("5a6708ced9d33a19c8584bcf"),
          "country" : "Country 1"
      }
      ],
      "name" : "User 1"
  })
})


// 2) to handle adding a new user
app.post('/users', function (req, res) {
  // returns an object with user
})

// 3) to handle creating a Trip with a given country and pushing it into user.trips

// 4) to handle adding a todo

// 5) to handle getting all todos for a certain country










// RUN ONLY ONCE ---- CREATION CODE !!! CREATION CODE !!! CREATION CODE !!! CREATION CODE
// var user1 = new User({
//   name: 'User 1',
//   email: 'user@gmail.com',
//   trips: []
// });
// var trip1 = new Trip({
//   user: user1._id,
//   country: 'Country 1',
//   flight: {
//       number: 'Team-106',
//       from: 'Elevation',
//       to: 'First IT job',
//       departure: {
//           date: '23-Jan-2018',
//           time: '9:00'
//       },
//       arrival: {
//           date: '25-Jan-2018',
//           time: '12:00'
//       }
//   },
//   todos: []
// });
// var todo = new Todo({
//   user: user1._id,
//   text: 'Enjoy awesome stuff we learn'
// });

// todo.save(); // user1._id already exists, so it should be pushed automatically -> we can save todo

// trip1.todos.push(todo); // in trip1 user1._id comes automatically, so before saving we need to push only a todo
// trip1.save(); // save trip before pushing it into user

// user1.trips.push(trip1);
// user1.save();
// END OF CREATION CODE !!! END OF CREATION CODE !!! END OF CREATION CODE !!! END OF CREATION CODE !!!







app.listen(8080, function() {
    console.log("Server connected through port 8080");
  })
