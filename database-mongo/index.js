var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var db = mongoose.connection;

db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var shelterSchema = mongoose.Schema({
  name: String,
  city: String,
  email: String,
  phone: String
});

var Shelter = mongoose.model('Item', shelterSchema);

var selectAll = function(callback) {
  Shelter.find({}, function(err, shelters) {
    if(err) {
      callback(err, null);
    } else {
      callback(null, shelters);
    }
  });
};

module.exports.selectAll = selectAll;