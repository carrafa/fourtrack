var ctrl = angular.module('profileController', []);

ctrl.controller('profile', ['$scope', 'usersApi', 'songsApi', '$cookies',

  function($scope,
    usersApi, songsApi, $cookies) {

    $scope.credentials = {}

    $scope.currentUser = {}

    $scope.userSongs = {}

    $scope.editSong = {}

    $scope.editUser = {
      username: false,
      artist: false,
      hometown: false
    }


    $scope.cookie = $cookies.get('token');

    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0];
        $scope.loadUserSongs();
      });
    };

    $scope.updateUser = function(key) {
      usersApi.updateUser($scope.currentUser).then(function(response) {});
      $scope.editUser[key] = false;
    };

    $scope.loadUserSongs = function() {
      var user_id = $scope.currentUser._id
      songsApi.getUserSongs(user_id).then(function(
        response) {
        $scope.userSongs = response.data.songs;
      });
    };

    $scope.deleteSong = function(id) {
      songsApi.delete(id).then(function() {
        $scope.loadUserSongs();
      })
    };

    $scope.updateSong = function(id) {
      var song = $scope.editSong
      songsApi.updateSong(id, song).then(function(response) {
        $scope.loadUserSongs();
      });
    }

    $scope.editSongFormToggle = function($event) {
      var forms = angular.element(document).find('form');
      var form = angular.element($event.target).parent().parent().find(
        'form');
      $scope.editSong = {};
      forms.addClass('invisible');
      form.toggleClass('invisible');
    }

    $scope.loadUser();

  }

]);
