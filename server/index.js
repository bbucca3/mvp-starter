var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var token = require('./token.js');

// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
// var items = require('../database-mongo');

var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));
// initialize bodyparser
app.use(bodyParser());

app.post('/shelters/search', function(req, res) {

  let url = `http://api.petfinder.com/shelter.find?key=${token.token}&location=08901&format=json`;

  function callback(error, response, body) {
    if (!error && response.statusCode == 200) {
      var info = JSON.parse(body);
      
      console.log(info);
    }
  } 
  request(url, callback);
  res.end('hello from successful server post');
});

app.get('/shelters', function (req, res) {
  items.selectAll(function(err, data) {
    if(err) {
      res.sendStatus(500);
    } else {
      res.json(data);
    }
  });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

