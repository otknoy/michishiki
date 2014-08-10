var Place = {};

$(document).on('pageshow', '#select-place', function() {
    $('#select-place-map-canvas').css('height', 500);

    utils.getCurrentLocation().done(function(location) {
	Place.map = Map.createMap('select-place-map-canvas',
				  location.latitude, location.longitude);
	Place.currentLocation = Map.createMarker(Place.map, 'Current Location',
						 location.latitude, location.longitude, true);
    });
});