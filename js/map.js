var Map = {};

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

	// data binding
	marker.data = json[i];

	marker.isLocal = function() {
	    var threshold = 50;
	    return this.data.localite > threshold;
	};

	// set icon
	var chartApi = 'http://chart.apis.google.com/chart';
	if (marker.isLocal()) {
	    marker.setIcon(chartApi + '?chst=d_map_pin_letter&chld=|6464FF|');
	} else {
	    marker.setIcon(chartApi + '?chst=d_map_pin_letter&chld=|FF6464|');
	}

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

        '<a href="#dialog" onclick="showMoreInfo()">詳細情報を見る</a>'+
        '<div id="dialog">'+
        '<h4>' + posted_by + '</h4>'+
        '<p>' + comment + '</p>'+
        '</div>'+
	    '</div>';

    return content;
};

function showMoreInfo(){
    $('#dialog').toggleClass('active');
    $('.gm-style-iw').toggleClass('active');
    $('.gm-style-iw').parent().toggleClass('modal');
}