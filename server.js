var express = require ('express');
var app = express();
var bodyParser = require ('body-parser');
var path = require ('path');
var mongoose = require ('mongoose');

//connect to mongoDB
mongoose.connect( 'mongodb://localhost:27017/assignment');

var assignSchema = mongoose.Schema ({
  assign: String,
  student: String,
  score: Number,
  date: Number
});

//model
var homeworks = mongoose.model('homeworks', assignSchema );

//uses
app.use(express.static('public'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded( {extended: true }) );

//port
var port = process.env.PORT || 8888;

//spin up server
app.listen(port, function(){
  console.log('server up on:', port);

});

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/views/index.html') );
});
