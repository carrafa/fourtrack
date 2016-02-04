var ctrl = angular.module('profileController', []);

ctrl.controller('profile', ['$scope', 'usersApi', '$cookies',

  function($scope,
    usersApi, $cookies) {

    $scope.credentials = {}

    $scope.currentUser = {}

    $scope.edit = {
      username: false,
      artist: false,
      hometown: false
    }

    $scope.cookie = $cookies.get('token');

    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        $scope.currentUser = response.data.user[0]
      });
    };

    $scope.updateUser = function(key) {
      usersApi.updateUser($scope.currentUser).then(function(response) {});
      $scope.edit[key] = false;
    };

    $scope.loadUser();

  }


]);
