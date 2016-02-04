var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  if (req.cookies.token) {
    res.render('index');
  } else {
    res.redirect('/welcome');
  }
})

router.get('/new_song', function(req, res) {
  if (req.cookies.token) {
    res.render('new_song');
  } else {
    res.redirect('/welcome');
  }
})

router.get('/profile', function(req, res) {
  if (req.cookies.token) {
    res.render('profile');
  } else {
    res.redirect('/welcome');
  }
})

module.exports = router;
