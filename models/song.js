var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var SongSchema = mongoose.Schema({
  artist: {
    type: String
  },
  songTitle: {
    type: String
  },
  albumTitle: {
    type: String
  },
  audio: {
    track01: {
      type: String
    },
    track02: {
      type: String
    },
    track03: {
      type: String
    },
    track04: {
      type: String
    }
  },
  artwork: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', SongSchema);
