var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', function($scope, usersApi) {

  $scope.newUser = {}

  $scope.createUser = function() {
    usersApi.createUser($scope.newUser).then(function() {})
    $scope.newUser = {};
  }

}]);
