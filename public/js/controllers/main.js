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

    var paused = false;

    $scope.newSong = {};

    $scope.allSongs = [];

    tracks = {};

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

    playhead = $interval(function() {
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          var progress = tracks[i].pos();
          $('#playhead').css('width', progress + '%')
        }
      }
    }, 100);

    addTrackToSlider = function(track, i) {
      angular.element(document).on('mousemove', function() {
        track.volume($scope.verticalSlider[i].value / 100);
      })
    };

    $scope.playPause = function() {
      for (i = 0; i < 4; i++) {
        if (angular.isDefined(tracks[i])) {
          if (paused === false) {
            tracks[i].pause();
          }
          if (paused === true) {
            tracks[i].play();
            paused - false;
          }
        }
      }
      paused = !paused;
      $('#pause').toggle();
      $('#play').toggle();
    }

    $scope.loadMixer = function($event) {
      $song = angular.element($event.target).parent()
      $('#play-pause').css('display', 'block');
      $('body').find('section').css('height', '0em');
      $('img').css('display', 'block');
      $song.find('section').css('height', '20em');
      $song.find('img').css('display', 'none');
      var mixArray = [];
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          tracks[i].unload();
        }
        $scope.verticalSlider[i].value = 75;
        $timeout(function() {
          $scope.$broadcast('rzSliderForceRender');
        })
      }
      paused = false;
      $('#pause').css('display', 'block');
      $('#play').css('display', 'none');
      var i = 0;
      angular.forEach(this.song.audio, function(value, key) {
        mixArray.push(value.url);
        tracks[i] = newHowl(value.url);
        addTrackToSlider(tracks[i], i);
        tracks[i].play()
        i++;
      });

      i = 0;
    };

    function newHowl(url) {
      var howl = new Howl({
        urls: [url],
        autoplay: false,
        buffer: true
      });
      return howl
    };

    $scope.loadSongs = function() {
      songsApi.getAll().then(function(response) {
        $scope.allSongs = response.data.songs
      })
    }

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
      songsApi.createSong($scope.newSong).then(function(response) {
        console.log(response.data);
      });
    }

    $scope.loadUser();
    $scope.loadSongs();

  }
]);
