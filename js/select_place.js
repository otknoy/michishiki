var Place = {};

$(document).on('pageshow', '#select-place', function() {
    $('#select-place-map').css('height', 450);

    var pos = Map.map.getCenter();
    Place.map = Map.createMap('select-place-map', pos.lat(), pos.lng(), 14); // kutc

    Place.currentLocation = Map.createMarker(Place.map, 'Current Location',
					     pos.lat(), pos.lng(), true);
    Place.setPostLocation();

    google.maps.event.addListener(Place.currentLocation, 'dragend', function() {
	Place.setPostLocation();
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