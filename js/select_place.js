var Place = {};

$(document).on('pageshow', '#select-place', function() {
    $('#select-place-map').css('height', 500);

    utils.getCurrentLocation().done(function(location) {
	Place.map = Map.createMap('select-place-map',
				  location.latitude, location.longitude, 12);
	Place.currentLocation = Map.createMarker(Place.map, 'Current Location',
						 location.latitude, location.longitude, true);

	Place.setPostLocation();

	google.maps.event.addListener(Place.currentLocation, 'dragend', function() {
	    Place.setPostLocation();
	});
    });
});

Place.getMarkerLocation = function() {
    var pos =  Place.currentLocation.getPosition();
    var lat = pos.lat();
    var lng = pos.lng();
    return {"latitude": lat, "longitude": lng};
};

Place.setPostLocation = function() {
    var location = Place.getMarkerLocation();
    $('#post-lat').val(location.latitude);
    $('#post-lng').val(location.longitude);
};