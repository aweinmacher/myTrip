var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    name: String,
    trips: [{type: Schema.Types.ObjectId, ref: 'Trip'}]
},{ usePushEach: true });

var tripSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    country: String,
    flight: {
        number: String,
        from: String,
        to: String,
        departure: {
            date: String,
            time: String
        },
        arrival: {
            date: String,
            time: String
        }
    },
    todos: [{type: Schema.Types.ObjectId, ref: 'Todo'}]
},{ usePushEach: true });

var todoSchema = new Schema({
    user: {type: Schema.Types.ObjectId, ref: 'User'},
    text: String
},{ usePushEach: true });

var User = mongoose.model('User', userSchema);
var Trip = mongoose.model('Trip', tripSchema);
var Todo = mongoose.model('Todo', todoSchema);

module.exports.user = User;
module.exports.trip = Trip;
module.exports.todo = Todo;

// So, to find all todos for a given country:
// 1. filter out all trips with current user id
// 2. get some data (trips) and filter for country
// 3. get some data (trips) and find all todos -> send them as response
// (probably res.send will be an array of arrays but not sure + if yes try spread)


// from Book population (w5d1)
// 'FIND ONE' POPULATION
// Book.findOne({name:"Book 1"}).populate('reviews').exec(function(err, book){
//     console.log(book);
//   }); 

// Critic.findOne({name:"Critic 1"}).populate('reviews').exec(function(err, critic){
//     console.log(critic);
//   });

// Review.find({}).populate('critic book').exec(function(err, review){
//     console.log(review[0]);
//   });

// Critic.findOne({name:"Critic 1"}).populate('reviews','text').exec(function(err, critic){
//     console.log(critic.reviews);
//   });

// Critic.findOne({ name: "Critic 1" }).populate('reviews', 'text -_id').exec(function(err, critic) {
//     console.log(critic.reviews);
//   });
// END OF 'FIND ONE' POPULATION  

// POPULATING A DOCUMENT
// Critic.findOne({ name: "Critic 1" }, function(err, critic) {
//     //now we have a single critic
//     critic.populate('reviews', function() {
//       console.log(critic.reviews);
//     });
//   });

// POPULATING AN ARRAY OF DOCUMENTS
// Critic.find(function(err, critics) {
//     //now we have an array of critics
//     Critic.populate(critics, { path: 'reviews' }, function(err, data) {
//       //now data is an array of populated critics
//       console.log(data);
//     });
//   });