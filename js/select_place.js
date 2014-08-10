$(document).on('pageshow', '#select-place', function() {
    $('#select-place-map-canvas').css('height', 500);

    utils.getCurrentLocation()
	.done(function(location) {
	    createSelectPlaceMap(location.latitude, location.longitude);
	});
});

function createSelectPlaceMap(lat, lng) {
    var latlng = new google.maps.LatLng(lat, lng);
    var mapOptions = {
	center: latlng,
	zoom: 8,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var select_place_map = new google.maps.Map(document.getElementById('select-place-map-canvas'), mapOptions);

    // Get posts and create markers
    createMarker(select_place_map, 'Current Location', lat, lng);
}