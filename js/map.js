var api_uri = 'http://mpmc.dip.jp/~otknoy/michishiki_api_server/select.py';

var map = null;
var markers = null;

$(document).on('pageshow', '#map', function() {
    markers = [];
    map = createMap();

    updateCurrentLocation();
});

function createMap() {
    $('#map-canvas').css('height', 500);

    var mapOptions = {
	zoom: 8,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

    // Get posts and create markers
    $.getJSON(api_uri, function(json) {
	for (var i = 0; i < json.length; i++) {
	    var marker = createMarker(map, json[i].title, json[i].latitude, json[i].longitude);
	    markers.push(marker);
	}
    });

    return map;
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

function updateCurrentLocation() {
    if(!navigator.geolocation) {
	console.log('Geolocation API is unavalable.');
	return ;
    }
    
    navigator.geolocation.getCurrentPosition(function(position) {
	var pos = new google.maps.LatLng(position.coords.latitude,
					 position.coords.longitude);
	map.setCenter(pos);
    }, function() {
	console.log('getCurrentPosition faild');
    });
}