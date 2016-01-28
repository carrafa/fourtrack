var api = angular.module('songsApiFactory', []);

api.factory('songsApi', ['$http', function($http) {

  var baseUrl = 'http://localhost:8080/api/songs';

  var songsInterface = {}

  songsInterface.getAll = function() {
    return $http.get(baseUrl);
  }

  songsInterface.createSong = function(newSong) {
    var payload = {
      song: newSong
    };
    console.log("NEW SONG PAYLOAD", payload);
    return $http.post(baseUrl, payload);
  }

  songsInterface.delete = function(id) {
    return $http.delete(baseUrl + "/" + id)
  }

  return songsInterface

}]);
