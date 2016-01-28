var express = require('express');
var router = express.Router();
var Song = require('../models/song');

//routes

// index
router.get('/', function(req, res) {
  Song.find({}, function(err, dbSongs) {
    res.json({
      songs: dbSongs
    });
  });
});

// create
router.post('/', function(req, res, next) {
  if (!req.body.song) {
    return next({
      status: 422,
      message: 'Missing arguments'
    });
  }
  var newSong = new Song(req.body.song);
  newSong.save(function(err, dbSong) {
    if (err) {
      res.json({
        error: err.errors
      });
    } else {
      res.json(dbSong);
    }
  });
});

// delete
router.delete('/', function(req, res) {
  if (req.song) {
    Song.findByIdAndRemove({
      _id: req.song._id
    }, function(err) {
      if (err) {
        res.status(500).end();
      }
      res.status(204).end();
    });
  }
});


module.exports = router;
