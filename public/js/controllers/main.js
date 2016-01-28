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

    $scope.loadMixer = function() {
      console.log('clicked.');
      // var mixArray = [];
      // mixArray.push(this.song.audio.track01);
      // mixArray.push(this.song.audio.track02);
      // mixArray.push(this.song.audio.track03);
      // mixArray.push(this.song.audio.track04);
      mixArray = ["http://localhost:8080/songs/default_song/drums.mp3",
        "http://localhost:8080/songs/default_song/guitar.mp3",
        "http://localhost:8080/songs/default_song/keys.mp3",
        "http://localhost:8080/songs/default_song/lead.mp3"
      ]
      createTracks(mixArray);
    }

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

    console.log('hi, nosy person')

    $(function() {

    })

    var tracks = [
      'audio/drums.mp3',
      'audio/keys.mp3',
      'audio/guitar.mp3',
      'audio/lead.mp3'
    ];

    function newHowl(url) {
      var howl = new Howl({
        urls: [url],
        autoplay: false,
        buffer: true
      });
      return howl
    };

    function createTracks(tracks) {
      var $pos = $('<input type="range">').attr('id', 'pos');
      $('.controls').append($pos);
      for (i = 0; i < tracks.length; i++) {

        var $trackLabel = $('<div>').text('track' + i);
        var $sliderContainer = $('<div>').addClass("slider-container");
        var $track = $('<input type="range">').addClass("slider").attr('id',
          'track' + i);

        $($sliderContainer).append($track);
        $($sliderContainer).append($trackLabel);
        $('.mixer').append($sliderContainer);

        var howl = newHowl(tracks[i]);

        $pos.attr('max', howl);
        addTrackToSlider($track, howl);
        addTrackToControls(howl);

      };
    };

    function addTrackToControls(howl) {
      $('#play').on('click', function() {
        if (howl.paused === false) {
          console.log('no');
        } else {
          howl.play();
          console.log('play');
        }
      });
      $('#pause').on('click', function() {
        howl.pause();
      });
      $('#stop').on('click', function() {
        howl.stop();
      });
      $('#pos').on("change", function() {
        howl.pos($(this).val());
      });

    };

    function addTrackToSlider(input, howl) {
      input.on("mousemove", function() {
        howl.volume($(this).val() / 100);
      });
    };

  }
]);
