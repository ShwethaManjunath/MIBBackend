var mongodb = require('mongodb');
var mongoose = require('mongoose');

//Db Connections
let devdb = 'mongodb://127.0.0.1:27017/devdim';
let prodb = 'mongodb://127.0.0.1:27017/prodim';

mongoose.connect(devdb);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log("Database connection made successfully");
});

