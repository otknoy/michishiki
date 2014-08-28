$(document).on('pageshow', '#post-list', function() {
    initPostList();
});

function initPostList() {
    utils.fetchPosts(queryOption).done(function(json) {
	$('#post_list').empty();
	for (var i = 0; i < json.length; i++) {
	    var $li = createListItem(json[i].title,
				     json[i].posted_by,
				     utils.utcToString(json[i].created_at),
				     json[i].comment);
	    $('#post_list').append($li);
	}
	$('#post_list').listview('refresh');
    });
}

function createListItem(title, writer, date, comment) {
    var $title = $('<h2>').text(title);
    var $writer = $('<p>').text(writer);
    var $date = $('<p>').text(date);
    var $comment = $('<p>').text(comment);
    return $('<li>')
	.append($title)
	.append($writer)
	.append($date)
	.append($comment);
}