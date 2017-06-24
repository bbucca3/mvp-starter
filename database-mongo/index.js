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
  email: String,
  phone: String,
  city: String,
  state: String,
  address: String,
  shelterId: {type:String, unique:true}
});

var Shelter = mongoose.model('Shelter', shelterSchema);

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
module.exports.Shelter = Shelter;