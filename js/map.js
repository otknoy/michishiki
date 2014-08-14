var Map = {};
Map.map = null;
Map.markers = [];

$(document).on('pageshow', '#map', function() {
    Map.initMap();
});

Map.initMap = function() {
    $('#map-canvas').css('height', 500);
    Map.map = Map.createMap('map-canvas', 34.87728, 135.576798); // kutc

    utils.getCurrentLocation().done(function(location) {
	var pos = new google.maps.LatLng(location.latitude,
					 location.longitude);

	Map.currentLocation = Map.createMarker(Map.map, 'Current location',
					       location.latitude, location.longitude, false);
    });

    Map.infoWindow = new google.maps.InfoWindow;

    google.maps.event.addListener(Map.map, 'bounds_changed', function() {
	var options = Map.createMapRegionQuery(Map.map);
	console.log(options);

	utils.fetchPosts(options).done(function(json) {
	    // remove existing markers
	    Map.markers.forEach(function(marker, i) {
		marker.setMap(null);
	    });

	    Map.markers = Map.createMarkers(Map.map, json);
	    Map.addEventToMakers(Map.markers);
	});
    });
};

Map.createMap = function(id, lat, lng) {
    var mapOptions = {
	center: new google.maps.LatLng(lat, lng),
	zoom: 8
    };
    var map = new google.maps.Map(document.getElementById(id), mapOptions);
    return map;
};

Map.createMapRegionQuery = function(map) {
    var mapBounds = map.getBounds();
    var sw = mapBounds.getSouthWest();
    var ne = mapBounds.getNorthEast();
    var options = {
	'lat1': sw.lat(), 'lng1': sw.lng(),
	'lat2': ne.lat(), 'lng2': ne.lng()
    };
    return options;
};

Map.createMarker = function(map, title, lat, lng, draggable) {
    var marker = new google.maps.Marker({
	position: new google.maps.LatLng(lat, lng),
	map: map,
	title : title,
	draggable: draggable
    });
    return marker;
};

Map.createMarkers = function(map, json) {
    var markers = [];
    for (var i = 0; i < json.length; i++) {
	var marker = Map.createMarker(map, json[i].title,
				      json[i].latitude, json[i].longitude, false);
	marker.data = json[i];
	markers.push(marker);
    }
    return markers;
};

Map.addEventToMakers = function(markers) {
    markers.forEach(function(m, i) {
	google.maps.event.addListener(m, 'click', function() {
	    var content = Map.jsonToContent(this.data);
	    Map.infoWindow.setContent(content);
	    Map.infoWindow.open(this.getMap, this);
	});
    });
};

Map.jsonToContent = function(json) {
    var title = json.title;
    var created_at = json.created_at;
    var posted_by = json.posted_by;
    var comment = json.comment;

    var content =
	    '<div>' +
	    '<h1>' + title + '</h1>' +
	    '<h2>' + created_at + '</h2>' +
	    '<h2>' + posted_by + '</h2>' +
	    '<p>' + comment + '</p>' +
	    '</div>';

    return content;
};