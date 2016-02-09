var express = require('express');
var router = express.Router();
var Song = require('../../models/song');

//routes

// index
router.get('/', function(req, res) {
  Song.find({}, function(err, dbSongs) {
    res.json({
      songs: dbSongs
    });
  });
});

//user songs
router.get('/user/:id', function(req, res, next) {
  console.log("REQ", req.user)
  var user_id = req.user._id;
  Song.find({
    user_id: user_id
  }, function(err, dbSongs) {
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

// patch
router.patch('/:id', function(req, res, next) {
  if (!req.body.song) {
    return next({
      status: 422,
      message: 'Missing arguments'
    });
  }
  Song.findByIdAndUpdate(req.params.id, req.body.song, function(err, song) {
    if (err) {
      return err;
    }
    res.json(song);
  });
});

// delete
router.delete('/:id', function(req, res) {
  var id = req.params.id;
  Song.findByIdAndRemove({
    _id: id
  }, function(err) {
    if (err) {
      res.status(500).end();
    }
    res.status(204).end();
  });
});


module.exports = router;
