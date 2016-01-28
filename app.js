var express = require('express');
var app = express();

// database
var mongoPath = process.env.MONGOLAB_URI || 'mongodb://localhost/mixy'
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// middleware

var sassMiddleware = require('node-sass-middleware');
var path = require('path');
app.use(sassMiddleware({
  /* Options */
  src: './src/sass',
  dest: path.join('./public', 'css'),
  debug: true,
  // outputStyle: 'compressed',
  prefix: '/css' // Where prefix is at <link rel="stylesheets" href="prefix/style.css"/>
}));
app.use(express.static(path.join('css', 'public')));

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

var songs = require('./routes/songs');
app.use('/api/songs', songs);

app.get('/welcome', function(req, res) {
  if (req.cookies.token) {
    res.redirect('/')
  } else {
    res.render('welcome');
  }
});

var index = require('./routes/index');
app.use('/', index);


//listen
var port = parseInt(process.env.PORT) || 8080;

app.listen(port, function() {
  console.log('HERE I AM ON ', port);
})
