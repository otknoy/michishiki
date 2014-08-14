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
	var location = {"latitude" : position.coords.latitude,
			"longitude": position.coords.longitude};
	dfd.resolve(location);
    }, function(error) {
	alert('ERROR(' + error.code + '): ' + error.message);
	dfd.reject();
    });

    return dfd.promise();
};

utils.fetchPosts = function(options) {
    var dfd = $.Deferred();

    var api_uri = 'http://amateras.wsd.kutc.kansai-u.ac.jp/~otsuka/michishiki_api_server/select.py';
    var query_string = utils.optionsToQueryString(options);
    $.getJSON(api_uri + query_string, function(json) {
	dfd.resolve(json);
    });

    return dfd.promise();
};

utils.optionsToQueryString = function(options) {
    var querys = [];
    for (var key in options) {
	var q = key + '=' + options[key];
	querys.push(q);
    }
    return '?' + querys.join('&');
};