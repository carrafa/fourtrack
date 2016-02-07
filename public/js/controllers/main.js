var ctrl = angular.module('mainController', []);

ctrl.controller('main', [
  '$scope',
  '$timeout',
  'usersApi',
  'songsApi',
  '$cookies',
  function(
    $scope,
    $timeout,
    usersApi,
    songsApi,
    $cookies) {

    $scope.currentUser = {};

    $scope.cookie = $cookies.get('token');

    $scope.newSong = {};

    $scope.allSongs = [];

    tracks = {};

    var vm = this;

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

    addTrackToSlider = function(track, i) {
      angular.element(document).on('mousemove', function() {
        track.volume($scope.verticalSlider[i].value / 100);
      })
    };

    $scope.loadMixer = function($event) {
      $song = angular.element($event.target).parent()
      $('body').find('section').css('height', '0em');
      $song.find('section').css('height', '20em');
      var mixArray = [];
      for (i = 0; i < 4; i++) {
        if (tracks[i] != undefined) {
          tracks[i].unload();
          $scope.verticalSlider[i].value = 75;
        }
      }
      var i = 0;
      angular.forEach(this.song.audio, function(value, key) {
        mixArray.push(value);
        tracks[i] = newHowl(value);
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

    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    }

    $scope.logout = function() {
      $cookies.remove('token');
      location.reload();
    }

    $scope.loadSongs = function() {
      songsApi.getAll().then(function(response) {
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

  }
]);
