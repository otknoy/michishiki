var utils = {};

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

    var api_uri = 'http://amateras.wsd.kutc.kansai-u.ac.jp/~otsuka/michishiki_api_server/get_post.py';
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

utils.utcToString = function(utc_ms) {
    var date_obj = new Date(utc_ms);
    var year = date_obj.getFullYear();
    var month = date_obj.getMonth()+1;
    var date = date_obj.getDate();
    var day = ['日', '月', '火', '水', '木', '金', '土'][date_obj.getDay()];
    var hour = date_obj.getHours();
    var minute = date_obj.getMinutes();
    if (month < 10) month = "0" + month;
    if (date < 10) date = "0" + date;
    if (hour < 10) hour = "0" + hour;
    if (minute < 10) minute = "0" + minute;

    var date_str = year + '/' +
	    month + '/' +
	    date + '(' + day + ') ' +
	    hour + ':' + minute;

    return date_str;
};