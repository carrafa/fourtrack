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

    $scope.allSongs = [{
      title: 'SONG ONE',
      audioSource: {
        track01: 'defaultUrl'
      },
      artwork: 'deaultArtwork'
    }, {
      title: "SONG TWO",
      audioSource: {
        track01: 'defaultUrl',
        track02: 'defaultUrl'
      },
      artwork: 'defaultArtwork'
    }, {}]


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

  }
]);
