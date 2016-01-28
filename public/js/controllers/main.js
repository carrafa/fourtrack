var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', '$cookies', function($scope,
  usersApi, $cookies) {

  $scope.credentials = {}

  $scope.newUser = {}

  $scope.createUser = function() {
    usersApi.createUser($scope.newUser).then(function() {})
    $scope.newUser = {};
  }

  $scope.logIn = function() {
    usersApi.logIn($scope.credentials).then(function(response) {
      console.log(response);
      var token = response.data.token
      console.log('token???', token);
      $cookies.put('token', token);
      $scope.credentials = {}
    })
  }

}]);
