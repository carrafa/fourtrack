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

    $scope.songs = [{
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
        console.log(response.data);
        $scope.currentUser = response.data.user[0]
      });
    }

    $scope.createSong = function() {
      songsApi.createSong($scope.newSong).then(function(response) {
        console.log(response.data);
      });
    }

    $scope.loadUser();

  }
]);
