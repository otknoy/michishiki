var michishiki = {};
michishiki.mode = null;

$(document).on('pageshow', '#main-map', function() {
    initMap();

    // navbar event
    $('div[data-role="navbar"] ul li a').on('click', function () {
	var clickedMode = $(this).text();
	michishiki.mode = {"両方": "both", "地元": "local", "観光": "tourism"}[clickedMode];
	Map.changeVisibleMarkersByMode(michishiki.mode);
    });
});

var initMap = function() {
    $('#map-canvas').css('height', 450);

    utils.getCurrentLocation().done(function(location) {
	Map.map = Map.createMap('map-canvas', location.latitude, location.longitude, 8);
	Map.currentLocation = Map.createMarker(Map.map, 'Current location',
					       location.latitude, location.longitude, false);

	Map.infoWindow = new google.maps.InfoWindow;

	google.maps.event.addListener(Map.map, 'bounds_changed', function() {
	    utils.fetchPosts(Map.buildOption()).done(Map.updateMarkers, michishiki.mode);
	});
    });
};