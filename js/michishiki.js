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

michishiki.initMainMap = function() {
    $('#map-canvas').css('height', 450);

    michishiki.map = Map.createMap('map-canvas', 34.705895, 135.494474, 12);
    michishiki.api.getPost().done(function(json) {
	michishiki.markers = Map.createMarkers(michishiki.map, json);
    });
};