var Map = {};
Map.markers = [];

Map.buildOption = function() {
    var bounds = Map.getMapBounds(Map.map);
    var options = new QueryOptionBuilder()
	    .setMapBounds(bounds.lat1, bounds.lng1,
			  bounds.lat2, bounds.lng2)
	    .setOrderBy('created_at', 'descend')
	    .setLimit(100)
	    .build();
    return options;
};

Map.updateMarkers = function(json) {
    Map.removeMarkers(Map.markers);
    Map.markers = Map.createMarkers(Map.map, json);
    Map.addEventToMakers(Map.markers);
};


Map.createMap = function(id, lat, lng, zoom) {
    var mapOptions = {
	center: new google.maps.LatLng(lat, lng),
	zoom: zoom
    };
    var map = new google.maps.Map(document.getElementById(id), mapOptions);
    return map;
};

Map.getMapBounds = function(map) {
    var mapBounds = map.getBounds();
    var sw = mapBounds.getSouthWest();
    var ne = mapBounds.getNorthEast();
    var bounds = {
	'lat1': sw.lat(), 'lng1': sw.lng(),
	'lat2': ne.lat(), 'lng2': ne.lng()
    };
    return bounds;
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

Map.removeMarkers = function(markers) {
    markers.forEach(function(marker, i) {
	marker.setMap(null);
    });
};

Map.addEventToMakers = function(markers) {
    markers.forEach(function(m, i) {
	google.maps.event.addListener(m, 'click', function() {
	    var content = Map.jsonToContent(this.data);
	    Map.infoWindow.setContent(content);
	    Map.infoWindow.open(this.getMap(), this);
	});
    });
};

Map.jsonToContent = function(json) {
    var title = json.title;
    var created_at = utils.utcToString(json.created_at);
    var posted_by = json.posted_by;
    var comment = json.comment;

    var content =
	    '<div>' +
	    '<h2>' + title + '</h2>' +
	    '<h3>' + created_at + '</h3>' +
	    '<h3>' + posted_by + '</h3>' +
	    '<p>' + comment + '</p>' +
	    '</div>';

    return content;
};