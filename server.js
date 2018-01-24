var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/tripDB', { useMongoClient: true }, function (err, db) {
  if (err) { console.log("database is not connected !") };
  if (db) { console.log("Database connected Successfully") }
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

// 1) if email exists - send user object; if not - send empty array
app.get('/authorisation/:email', function (req, res) {
  var email = req.params.email;
  User.find({ 'email': email }, function (err, data) {
    if (err) throw err;
    data[0].populate('trips', function (err, pop) {
      if (err) throw err;
      res.send(pop);
    })
    // res.send(data);
  })
})

// 2) to handle adding a new user - returns newly created object
app.post('/users/signup', function (req, res) {
  var newUser = new User({
    'name': req.body.name,
    'email': req.body.email
  });
  newUser.save(function (err, data) {
    if (err) throw err;
    res.send(data);
  })
})

// 3) to handle creating a Trip with a given country and pushing it into user.trips
// !!! check in frontend if the country exists and come here ONLY if not
app.post('/users/:userId/trips', function (req, res) {
  var userId = req.params.userId;
  User.findById(userId, function (err, data) {
    if (err) throw err;
    var newTrip = new Trip({
      'user': data._id,
      'country': req.body.country
    });
    newTrip.save(function(err, newTrip) {
      if (err) {console.error(err); res.sendStatus(500).send(err); return; }
      data.trips.push(newTrip);
      data.save(function (err, us) {
        if (err) {console.error(err); res.sendStatus(500).send(err); return; }
        us.populate('trips', function (err, pop) {
          if (err) throw err;
          res.send(pop);
        })
      })
    })
  })
})


// 4) to handle adding a todo
// app.post('/users/:userId/trips/:tripId', function (req, res) {
//   var userId = req.params.userId;
//   var tripId = req.params.tripId;
//   User.findById(userId, function (err, user) {
//     if (err) throw err;
//     console.log(user);
//     res.send(user);
//   })
// })





// 5) to handle deleting a country
// 6) to handle deleting a todo
// 7) to handle getting all todos for a certain country

// RUN ONLY ONCE ---- CREATION CODE !!! CREATION CODE !!! CREATION CODE !!! CREATION CODE !!! CREATION CODE
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


// ADD ERROR HANDLER - go to the first Node lesson


app.listen(8080, function () {
  console.log("Server connected through port 8080");
})
