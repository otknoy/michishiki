michishiki.api = {};
michishiki.api.uri = 'http://amateras.wsd.kutc.kansai-u.ac.jp/~otsuka/michishiki_api_server/';

michishiki.api.getPost = function(options) {
    var dfd = $.Deferred();

    var api_uri = michishiki.api.uri + 'get_post.py';
    var query_string = michishiki.api.utils.optionsToQueryString(options);
    $.getJSON(api_uri + query_string, function(json) {
	dfd.resolve(json);
    });

    return dfd.promise();
};

michishiki.api.post = function(posted_by, title, comment, localite, latitude, longitude) {
    var dfd = $.Deferred();

    var api_url = michishiki.api.uri + 'post.py';
    var options = {
	'posted_by': posted_by,
	'title': title,
	'comment': comment,
	'localite': localite,
	'latitude': latitude,
	'longitude': longitude
    };
    var query_string = michishiki.api.utils.optionsToQueryString(options);
    $.getJSON(api_uri + query_string, function(json) {
	dfd.resolve(json);
    });

    return dfd.promise();
};


michishiki.api.utils = {};

michishiki.api.utils.optionsToQueryString = function(options) {
    var querys = [];
    for (var key in options) {
	var q = key + '=' + options[key];
	querys.push(q);
    }
    return '?' + querys.join('&');
};