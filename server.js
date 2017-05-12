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
var things = mongoose.model('things', assignSchema );

//uses
app.use(express.static('public'));
app.use(bodyParser.json() );
app.use(bodyParser.urlencoded( {extended: true }) );

//port
var port = process.env.PORT || 8888;

app.post('/assignment', function(req, res){
  console.log('in POST route');
  console.log(req.body);
  var newAssign = things(req.body);
  newAssign.save().then(function(){
  res.sendStatus(200);
});// end save to db
});// end post

app.get('/assignment/:name?', function(req, res){
  console.log('in GET route');
  console.log(req.params);
  if (req.params.name === undefined) {
    things.find().then(function (data){
      console.log('name undefined');
      res.send(data);
    }); // end then
  } else {
      things.find({student: req.params.name}).then(function (data){
        console.log(data);
        res.send(data);
    });//end then
  }//end else
});// end get

app.delete('/assignment/:id',function(req, res){
  console.log('req.param to delete:', req.params.id);
  things.remove({_id: req.params.id}).then(function(){
      res.sendStatus(200);
    });//end remove
});//end app.delete



//spin up server
app.listen(port, function(){
  console.log('server up on:', port);
});//end server

app.get('/', function(req, res){
  res.sendFile(path.resolve('public/views/index.html') );
});
