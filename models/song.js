var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var crypto = require('crypto');

var SongSchema = mongoose.Schema({
  user_id: {
    type: String
  },
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
      label: {
        type: String
      },
      url: {
        type: String
      }
    },
    track02: {
      label: {
        type: String
      },
      url: {
        type: String
      }
    },
    track03: {
      label: {
        type: String
      },
      url: {
        type: String
      }
    },
    track04: {
      label: {
        type: String
      },
      url: {
        type: String
      }
    }
  },
  artwork: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Song', SongSchema);
