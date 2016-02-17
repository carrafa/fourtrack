var api = angular.module('playheadFactory', []);

api.factory('playhead', ['$interval', function($interval) {

  playheadInterface = {};

  playheadInterface.paused = false;

  playheadInterface.unpause = function() {
    playheadInterface.paused = false;
  }

  // moves the playhead when a song is playing
  playheadInterface.startPlayhead = function() {
    playhead = $interval(function() {
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          var pos = tracks[i].pos();
          var duration = tracks[i]._duration;
          var progress = (pos / duration) * 100;
          var playhead = angular.element(document.getElementById(
            'playhead'));
          playhead.css('width', progress + '%')

        }
      }
    }, 100);
  }

  // moves the playhead when a user clicks on the progress bar
  playheadInterface.setPos = function(event) {
    var mousePos = event.offsetX;
    var playbar = document.getElementById('progress-bar').clientWidth;
    var percentage = mousePos / playbar;

    for (i = 0; i < 4; i++) {
      if (tracks[i]) {
        tracks[i].pos(percentage * tracks[i]._duration);
      }
    }
  }

  // play button
  playheadInterface.playPause = function($scope) {
    if ((tracks[0].loaded === true) &&
      (tracks[1].loaded === true) &&
      (tracks[2].loaded === true) &&
      (tracks[3].loaded === true)
    ) {
      playheadInterface.paused = !playheadInterface.paused;
      for (i = 0; i < 4; i++) {
        if (playheadInterface.paused === false) {
          tracks[i].pause();
        }
        if (playheadInterface.paused === true) {
          tracks[i].play();
        }
      }
    }
  };

  return playheadInterface
}]);
