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

    Map.map = Map.createMap('map-canvas', 34.87728, 135.576798, 8); // kutc
    google.maps.event.addListener(Map.map, 'bounds_changed', function() {
	utils.fetchPosts(Map.buildOption()).done(Map.updateMarkers, michishiki.mode);
    });

    utils.getCurrentLocation().done(function(location) {
	var pos = new google.maps.LatLng(location.latitude,
					 location.longitude);
	Map.map.setCenter(pos);
	Map.currentLocation = Map.createMarker(Map.map, 'Current location',
					       location.latitude, location.longitude, false);

	Map.infoWindow = new google.maps.InfoWindow;
    });
};