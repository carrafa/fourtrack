var ctrl = angular.module('mainController', []);

ctrl.controller('main', [
  '$scope',
  '$timeout',
  'playhead',
  'mixer',
  'usersApi',
  'songsApi',
  '$cookies',
  function(
    $scope,
    $timeout,
    playhead,
    mixer,
    usersApi,
    songsApi,
    $cookies
  ) {

    $scope.currentUser = {};

    $scope.cookie = $cookies.get('token');

    $scope.newSong = {};

    $scope.allSongs = [];

    $scope.nowPlaying = {};

    tracks = {};

    $scope.paused = true;

    // sliders!
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

    // start the playhead
    playhead.startPlayhead();

    // set position of playhead
    $scope.setPos = playhead.setPos;

    // play/pause button
    $scope.playPause = function() {
      playhead.playPause();
      $scope.paused = !$scope.paused;
    };

    // load mixer
    $scope.loadMixer = function(event, sliders, song) {
      $timeout(function() {
        $scope.$broadcast('rzSliderForceRender');
      });
      mixer.setCurrentSong($scope.nowPlaying, song);
      mixer.loadMixer(event, sliders, song);
      playhead.unpause();
    };


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
