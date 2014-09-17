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

michishiki.api.post = function(options) {
    var api_url = michishiki.api.uri + 'post.py';

    // 
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