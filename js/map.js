var map = null;

$(document).on('pageshow', '#map', function() {
    // Draw the map once
    if (map == null) initMap();
});

function initMap() {
    $('#map_canvas').css('height', 500);

    var latlng = new google.maps.LatLng(34.87728, 135.576798); // kutc
    var mapOptions = {
	center: latlng,
	zoom: 8,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);

    // Get posts and create markers
    var api_uri = 'http://mpmc.dip.jp/~otknoy/michishiki_api_server/select.py';
    $.getJSON(api_uri, function(json) {
	for (var i = 0; i < json.length; i++) {
	    createMarker(map, json[i].title, json[i].latitude, json[i].longitude);
	}
    });
}

function createMarker(map, title, latitude, longitude) {
    var latlng = new google.maps.LatLng(latitude, longitude);
    var marker = new google.maps.Marker({
	position: latlng,
	map: map,
	title : title
	});
    return marker;
}