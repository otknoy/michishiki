var michishiki = {};

$(document).on('pageshow', '#main-map', function() {
    initMap();

    // navbar event
    $('div[data-role="navbar"] ul li a').on('click', function () {
	var clickedMode = $(this).text();

	Map.markers.map(function(marker, i) {
	    if (clickedMode == "地元") {
		if (marker.isLocal()) {
		    marker.setVisible(true);
		} else {
		    marker.setVisible(false);
		}
	    } else if (clickedMode == "両方") {
		marker.setVisible(true);
	    } else if (clickedMode == "観光") {
		if (marker.isLocal()) {
		    marker.setVisible(false);
		} else {
		    marker.setVisible(true);
		}
	    }

	    console.log(marker.data.localite);
	    console.log(marker.isLocal());
	});

	console.log($(this).text());
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
	    utils.fetchPosts(Map.buildOption()).done(Map.updateMarkers);
	});
    });
};