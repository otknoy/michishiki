var utils = {};

// 使い方
// utils.getCurrentLocation()
//     .done(function(location) {
// 	// success
//     })
//     .fail(function() {
// 	// faile
//     });
utils.getCurrentLocation = function() {
    var dfd = $.Deferred();

    if(!navigator.geolocation) {
	alert('Geolocation API is unavalable.');
	dfd.reject();
    }

    navigator.geolocation.getCurrentPosition(function(position) {
	console.log(position.coords);
	var location = {"latitude" : position.coords.latitude,
			"longitude": position.coords.longitude};
	dfd.resolve(location);
    }, function(error) {
	alert('ERROR(' + error.code + '): ' + error.message);
	dfd.reject();
    });

    return dfd.promise();
};