var michishiki = {};
michishiki.map = null;
michishiki.markers = [];

$(document).on('pageshow', '#main-map', function() {
    michishiki.initMainMap();

    // navbar event
    $('div[data-role="navbar"] ul li a').on('click', function () {
	var mode = $(this).attr('id');

	var markers = michishiki.markers;
	var l_markers = markers.filter(function(m) {
	    return m.isLocal();
	});
	var t_markers = markers.filter(function(m) {
	    return !m.isLocal();
	});

	if (mode == 'both') {
	    l_markers.forEach(function(m) { m.setMap(michishiki.map); });
	    t_markers.forEach(function(m) { m.setMap(michishiki.map); });
	 } else if (mode == 'local') {
	    l_markers.forEach(function(m) { m.setMap(michishiki.map); });
	    t_markers.forEach(function(m) { m.setMap(null); });
	 } else if (mode == 'tourism') {
	    l_markers.forEach(function(m) { m.setMap(null); });
	    t_markers.forEach(function(m) { m.setMap(michishiki.map); });
	}
    });
});

$(document).on('pageshow', '#select-place', function() {
    michishiki.initPlaceSelectMap();
});

$(document).on('pageinit', '#post', function() {
    $('#post_form').submit(function(e) {
	e.preventDefault();

	var $form = $('#post_form');
	var $button = $form.find('#post_button');
	$.ajax({
            url: michishiki.api.uri + 'post.py',
            type: 'post',
            data: $form.serialize(),
	    timeout: 10000,

	    beforeSend: function(xhr, settings) {
		$button.attr('disabled', true);
	    },

	    complete: function(xhr, textStatus) {
		$button.attr('disabled', false);
	    },

	    success: function(data, textStatus, xhr) {
		$form[0].reset();
	    },

	    error: function(xhr, textStatus, error) {
		alert('error');
		console.log(error);
            }
	});
    });
});

michishiki.initMainMap = function() {
    $('#map-canvas').css('height', 450);

    michishiki.map = Map.createMap('map-canvas', 34.705895, 135.494474, 12);
    michishiki.api.getPost().done(function(json) {
	michishiki.markers = Map.createMarkers(michishiki.map, json);
    });
};

michishiki.initPlaceSelectMap = function() {
    $('#select-place-map').css('height', 450);

    var pos = michishiki.map.getCenter();
    var map = Map.createMap('select-place-map', pos.lat(), pos.lng(), 14);
    var marker = Map.createMarker(map, 'Current Location',
				  pos.lat(), pos.lng(), true);

    $('#post-lat').val(pos.lat());
    $('#post-lng').val(pos.lng());
};