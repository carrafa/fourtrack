var api = angular.module('mixerFactory', []);

api.factory('mixer', [
  'playhead',
  '$timeout',
  function(
    playhead,
    $timeout
  ) {

    mixerInterface = {};

    // loads up a song to be mixed
    mixerInterface.loadMixer = function(event, sliders, song) {
      hideAllMixers()
      showCurrentMixer(event.target)
      unloadTracks(sliders);
      loadTracks(song, sliders);
    };

    // hides old mixer
    function hideAllMixers() {
      section = angular.element(document.getElementsByTagName('section'));
      img = angular.element(document.getElementsByTagName('img'));
      section.css('height', '0em');
      img.css('display', 'block');
    }

    // shows current mixer
    function showCurrentMixer(target) {
      $song = angular.element(target).parent();
      $song.find('section').css('height', '25em');
      $song.find('img').css('display', 'none');
    }

    // unloads previously loaded tracks
    function unloadTracks(sliders) {
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          tracks[i].unload();
        }
        sliders[i].value = 75;
      }
      playhead.unpause();
    }

    // creates a new audio object
    function newHowl(url) {
      var howl = new Howl({
        urls: [url],
        autoplay: false,
        buffer: true,
        onload: function() {
          this.loaded = true;
          playhead.playPause();
        }
      });
      return howl
    };

    // loads up a song
    function loadTracks(song, sliders) {
      var i = 0;
      var mixArray = [];
      angular.forEach(song.audio, function(value, key) {
        mixArray.push(value.url);
        tracks[i] = newHowl(value.url);
        addTrackToSlider(tracks[i], sliders[i]);
        i++;
      });
      playhead.playPause();

      i = 0;
    };

    // loads a track to the mixing board
    function addTrackToSlider(track, slider) {
      angular.element(document).on('mousemove', function() {
        track.volume(slider.value / 100);
      });
    };

    // used to display the current song
    mixerInterface.setCurrentSong = function(nowPlaying, song) {
      nowPlaying.artist = song.artist;
      nowPlaying.albumTitle = song.albumTitle;
      nowPlaying.songTitle = song.songTitle;
    }

    return mixerInterface

  }
]);
