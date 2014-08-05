// 使い方
// getCurrentLocation()
//     .done(function(location) {
// 	// success
//     })
//     .fail(function() {
// 	// faile
//     });

function getCurrentLocation() {
    var dfd = $.Deferred();

    if(!navigator.geolocation) {
	alert('Geolocation API is unavalable.');
	dfd.reject();
    }

    navigator.geolocation.getCurrentPosition(function(position) {
	var location = {"latitude" : position.coords.latitude,
		   "longitude": position.coords.longitude};
	dfd.resolve(location);
    }, function(error) {
	alert('ERROR(' + error.code + '): ' + error.message);
	dfd.reject();
    });

    return dfd.promise();
}