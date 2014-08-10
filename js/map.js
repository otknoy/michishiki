var Map = {};
Map.map = null;
Map.markers = null;

$(document).on('pageshow', '#map', function() {
    initMap();
});

function initMap() {
    Map.markers = [];

    $('#map-canvas').css('height', 500);
    Map.map = Map.createMap('map-canvas', 34.87728, 135.576798); // kutc

    utils.fetchPosts().done(function(json) {
	for (var i = 0; i < json.length; i++) {
	    var marker = Map.createMarker(Map.map, json[i].title,
					  json[i].latitude, json[i].longitude);
	    Map.markers.push(marker);
	}
    });

    utils.getCurrentLocation().done(function(location) {
	var pos = new google.maps.LatLng(location.latitude,
					 location.longitude);

	var marker = Map.createMarker(Map.map, 'Current location',
				      location.latitude, location.longitude);
	Map.markers.push(marker);
    });
}

Map.createMap = function(id, lat, lng) {
    var mapOptions = {
	center: new google.maps.LatLng(lat, lng),
	zoom: 8,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById(id), mapOptions);
    return map;
};

Map.createMarker = function(map, title, lat, lng) {
    var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat, lng),
	map: map,
	title : title
    });
    return marker;
};