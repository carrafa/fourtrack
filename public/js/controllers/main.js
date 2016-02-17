var ctrl = angular.module('mainController', []);

ctrl.controller('main', [
  '$scope',
  '$timeout',
  '$interval',
  'usersApi',
  'songsApi',
  '$cookies',
  function(
    $scope,
    $timeout,
    $interval,
    usersApi,
    songsApi,
    $cookies) {

    $scope.currentUser = {};

    $scope.cookie = $cookies.get('token');

    $scope.newSong = {};

    $scope.allSongs = [];

    $scope.nowPlaying = {};

    tracks = {};

    $scope.paused = false;

    // set sliders
    $scope.verticalSlider = [{
      value: 75,
      options: {
        floor: 0,
        ceil: 100,
        vertical: true,
        showSelectionBar: true
      }
    }, {
      value: 75,
      options: {
        floor: 0,
        ceil: 100,
        vertical: true,
        showSelectionBar: true
      }
    }, {
      value: 75,
      options: {
        floor: 0,
        ceil: 100,
        vertical: true,
        showSelectionBar: true
      }
    }, {
      value: 75,
      options: {
        floor: 0,
        ceil: 100,
        vertical: true,
        showSelectionBar: true
      }
    }];

    // moves the playhead when a song is playing
    playhead = $interval(function() {
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          var pos = tracks[i].pos();
          var duration = tracks[i]._duration;
          var progress = (pos / duration) * 100;
          $('#playhead').css('width', progress + '%')
        }
      }
    }, 100);

    // play button
    $scope.playPause = function() {
      if ((tracks[0].loaded === true) &&
        (tracks[1].loaded === true) &&
        (tracks[2].loaded === true) &&
        (tracks[3].loaded === true)
      ) {
        $scope.paused = !$scope.paused;
        for (i = 0; i < 4; i++) {
          if ($scope.paused === false) {
            tracks[i].pause();
          }
          if ($scope.paused === true) {
            tracks[i].play();
          }
        }
      }
    }

    // loads up a song to be mixed
    $scope.loadMixer = function($event) {
      $song = angular.element($event.target).parent();

      $('#play-pause').css('display', 'block');
      $('body').find('section').css('height', '0em');
      $('img').css('display', 'block');

      $song.find('section').css('height', '25em');
      $song.find('img').css('display', 'none');

      unloadTracks();
      setCurrentSong(this);
      loadTracks(this);
    };

    // unloads previously loaded tracks
    function unloadTracks() {
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          tracks[i].unload();
        }
        $scope.verticalSlider[i].value = 75;
        $timeout(function() {
          $scope.$broadcast('rzSliderForceRender');
        });
      }
      $scope.paused = false;
    }

    // creates a new audio object
    function newHowl(url) {
      var howl = new Howl({
        urls: [url],
        autoplay: false,
        buffer: true,
        onload: function() {
          this.loaded = true;
          $scope.playPause();
        }
      });
      return howl
    };

    // loads up a song
    function loadTracks(song) {
      var i = 0;
      var mixArray = [];
      angular.forEach(song.song.audio, function(value, key) {
        mixArray.push(value.url);
        tracks[i] = newHowl(value.url);
        addTrackToSlider(tracks[i], i);
        i++;
      });
      $scope.playPause();

      i = 0;
    };

    // loads a track to the mixing board
    addTrackToSlider = function(track, i) {
      angular.element(document).on('mousemove', function() {
        track.volume($scope.verticalSlider[i].value / 100);
      });
    };

    // used to display the current song
    function setCurrentSong(song) {
      $scope.nowPlaying.artist = song.song.artist;
      $scope.nowPlaying.albumTitle = song.song.albumTitle;
      $scope.nowPlaying.songTitle = song.song.songTitle;
    }

    // moves the playhead when a user clicks on the progress bar
    $scope.setPos = function($event) {
      var mousePos = $event.offsetX;
      var playbar = document.getElementById('progress-bar').clientWidth;
      var percentage = mousePos / playbar;

      for (i = 0; i < 4; i++) {
        if (tracks[i]) {
          tracks[i].pos(percentage * tracks[i]._duration);
        }
      }
    }


    // load songs from db
    $scope.loadSongs = function() {
      songsApi.getAll().then(function(response) {
        $scope.allSongs = response.data.songs
      })
    }

    // load current user
    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    }

    $scope.logout = function() {
      $cookies.remove('token');
      location.reload();
    }

    $scope.createSong = function() {
      songsApi.createSong($scope.newSong).then(function(response) {});
    }

    $scope.loadUser();
    $scope.loadSongs();

  }
]);
