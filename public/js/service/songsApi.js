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
    return $http.post(baseUrl, payload);
  }

  songsInterface.getUserSongs = function(user_id) {
    return $http.get(baseUrl + "/user" + "/" + user_id);
  }

  songsInterface.updateSong = function(id, song) {
    var song = {
      song: song
    };
    return $http.patch(baseUrl + "/" + id, song)
  }

  songsInterface.delete = function(id) {
    return $http.delete(baseUrl + "/" + id)
  }

  return songsInterface

}]);
