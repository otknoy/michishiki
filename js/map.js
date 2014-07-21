var map = null;

$(document).on('pageshow', '#map', function() {
    // draw the map once
    if (map == null) drawMap();
});

function drawMap() {
    $('#map_canvas').css('height', 500);

    var latlng = new google.maps.LatLng(-34.397, 150.644);
    var mapOptions = {
	center: latlng,
	zoom: 8,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
}