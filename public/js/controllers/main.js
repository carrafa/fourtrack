var ctrl = angular.module('mainController', []);

ctrl.controller('main', ['$scope', 'usersApi', '$cookies', '$location',
  function(
    $scope,
    usersApi,
    $cookies,
    $location) {

    $scope.currentUser = {}

    $scope.cookie = $cookies.get('token');


    $scope.loadUser = function() {
      usersApi.loadUser($scope.cookie).then(function(response) {
        console.log(response.data);
        $scope.currentUser = response.data.user[0]
      });
    }

    $scope.loadUser();

  }
]);
