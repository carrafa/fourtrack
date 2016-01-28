var express = require('express');
var app = express();


// database
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/mixy'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// middleware

var morgan = require('morgan');
app.use(morgan('dev'));

app.set('view engine', 'jade');

app.use(express.static('./public'));

var cookieParser = require('cookie-parser');
app.use(cookieParser());

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

var loadUser = require('./middleware/loadUser');
app.use(loadUser);


//routes
var users = require('./routes/users');
app.use('/api/users', users);

app.get('/welcome', function(req, res) {
  res.render('welcome');
});

app.get('/', function(req, res) {
  res.render('index');
});

//listen
var port = parseInt(process.env.PORT) || 8080;

app.listen(port, function() {
  console.log('HERE I AM ON ', port);
})
