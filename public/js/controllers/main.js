var ctrl = angular.module('mainController', []);

ctrl.controller('main', [
  '$scope',
  'usersApi',
  'songsApi',
  '$cookies',
  function(
    $scope,
    usersApi,
    songsApi,
    $cookies) {

    $scope.currentUser = {};

    $scope.cookie = $cookies.get('token');

    $scope.newSong = {}

    $scope.allSongs = []

    $scope.loadMixer = function($event) {
      $song = angular.element($event.target).parent()
      $('.mixer').remove();
      $('.controls').remove();
      var mixArray = [];
      angular.forEach(this.song.audio, function(value, key) {
        console.log(value);
        mixArray.push(value);
      });
      console.log()

      $song.append(createTracks(mixArray));
    }

    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    }

    $scope.loadSongs = function() {
      songsApi.getAll().then(function(response) {
        console.log('songsss?? ', response.data.songs);
        $scope.allSongs = response.data.songs
      })
    }

    $scope.createSong = function() {
      songsApi.createSong($scope.newSong).then(function(response) {
        console.log(response.data);
      });
    }

    $scope.loadUser();
    $scope.loadSongs();

    function newHowl(url) {
      var howl = new Howl({
        urls: [url],
        autoplay: false,
        buffer: true
      });
      return howl
    };

    function createTracks(tracks) {
      var $pos = $('<input type="range">').attr('id', 'pos');
      $mixer = $('<div>').addClass('mixer');
      $controls = makeControls();
      $controls.append($pos);
      $mixer.append($controls);
      for (i = 0; i < tracks.length; i++) {

        var $trackLabel = $('<div>').text('track' + i);
        var $sliderContainer = $('<div>').addClass("slider-container");
        var $track = $('<input type="range">').addClass("slider").attr('id',
          'track' + i);

        $($sliderContainer).append($track);
        $($sliderContainer).append($trackLabel);
        $mixer.append($sliderContainer);

        var howl = newHowl(tracks[i]);

        $pos.attr('max', howl);
        addTrackToSlider($track, howl);
        addTrackToControls(howl, $controls);

      };
      return $mixer
    };

    function makeControls() {
      $controls = $('<div>').addClass('controls')
      $play = $('<div>').attr('id', 'play').text('PLAY')
      $pause = $('<div>').attr('id', 'pause').text('PAUSE')
      $stop = $('<div>').attr('id', 'stop').text('STOP')
      $controls.append($play)
      $controls.append($pause)
      $controls.append($stop)
      return $controls
    }

    function addTrackToControls(howl, $controls) {
      $controls.find('#play').on('click', function() {
        if (howl.paused === false) {
          console.log('no');
        } else {
          howl.play();
          console.log('play');
        }
      });
      $controls.find('#pause').on('click', function() {
        howl.pause();
      });
      $controls.find('#stop').on('click', function() {
        howl.stop();
      });
      $controls.find('#pos').on("change", function() {
        howl.pos($(this).val());
      });

    };

    function addTrackToSlider(input, howl) {
      input.on("mousemove", function() {
        howl.volume($(this).val() / 100);
      });
    };

  }
]);
