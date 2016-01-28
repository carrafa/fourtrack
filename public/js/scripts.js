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

function doesThisWork() {
  console.log('dos it???');
}
