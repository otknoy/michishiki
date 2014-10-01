var michishiki = {};
michishiki.map = null;
michishiki.markers = [];
michishiki.mode = null;

$(document).on('pageshow', '#main-map', function() {
    // Init map
    $('#map-canvas').css('height', 450);
    michishiki.map = Map.createMap('map-canvas', 34.705895, 135.494474, 12);
    michishiki.api.getPost().done(function(json) {
	michishiki.markers = Map.createMarkers(michishiki.map, json);
    });

    // Initi mode
    michishiki.mode = $('div[data-role="navbar"] ul li a.ui-btn-active').attr('id');

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

	michishiki.mode = mode;
    });
});

$(document).on('pageshow', '#select-place', function() {
    // Init map based on center position of main map
    $('#select-place-map').css('height', 450);
    var pos = michishiki.map.getCenter();
    var map = Map.createMap('select-place-map', pos.lat(), pos.lng(), 14);
    var marker = Map.createMarker(map, 'Current Location',
				  pos.lat(), pos.lng(), true);

    // next button in select place page
    $('a[href="#post"]').click(function() {
	// Set latitude and longitude in form
	var p = marker.getPosition();
	$('#post-lat').val(p.lat());
	$('#post-lng').val(p.lng());

	// Set radio button state
	if (michishiki.mode == 'local') {
	    $('#localite-local').attr("checked", true).checkboxradio('refresh');
	    $('#localite-tourism').attr("checked", false).checkboxradio('refresh');
	} else if (michishiki.mode == 'tourism') {
	    $('#localite-local').attr("checked", false).checkboxradio('refresh');
	    $('#localite-tourism').attr("checked", true).checkboxradio('refresh');
	} else if (michishiki.mode == 'both') {
	    $('#localite-local').attr("checked", false).checkboxradio('refresh');
	    $('#localite-tourism').attr("checked", false).checkboxradio('refresh');
	}
    });
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