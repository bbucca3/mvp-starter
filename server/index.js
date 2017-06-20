var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token = require('./token.js');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var Shelter = require('../database-mongo').Shelter;
var selectAll = require('../database-mongo').selectAll;

var app = express();
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
// initialize bodyparser
app.use(bodyParser());

app.post('/shelters/search', function(req, res) {

  let url = `http://api.petfinder.com/shelter.find?key=${token.token}&location=${req.body.zip}&format=json`;

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      // console.log(info);
      info.petfinder.shelters.shelter.forEach((shelter) => {
        shelter = new Shelter({
          name:shelter.name.$t,
          city:shelter.city.$t,
          email:shelter.email.$t,
          phone:shelter.phone.$t
        });
        shelter.save();
      });
    }
  } 
  request(url, callback);
  res.end('successful server post');
});

app.get('/shelters', function (req, res) {

  console.log('inside server get');

  selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.writeHead(200, {'content-type':'application/json'});
      res.end(JSON.stringify(data));
    }
  });
  // Shelter.find().limit().sort({id:1}).exec((err, data) => {
  //   res.writeHead(200, {'content-type':'application/json'});
  //   res.end(JSON.stringify(data));
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

