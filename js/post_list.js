$(document).on('pageshow', '#post-list', function() {
    initPostList();
});

function initPostList() {
    var api_uri = 'http://amateras.wsd.kutc.kansai-u.ac.jp/~otsuka/michishiki_api_server/select.py?order_by=created_at&order=descend';
    $.getJSON(api_uri, function(json) {
	for (var i = 0; i < json.length; i++) {
	    var $li = createListItem(json[i].title, json[i].comment, json[i].posted_by);
	    $('#post_list').append($li);
	}
	$('#post_list').listview('refresh');
    });
}

function createListItem(title, comment, posted_by) {
    var $title = $('<h2>').text(title);
    var $comment = $('<p>').text(comment);
    var $posted_by = $('<p>').text(posted_by);
    var $li = $('<li>').append($title).append($comment).append($posted_by);
    return $li;
}