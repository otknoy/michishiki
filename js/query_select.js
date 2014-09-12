var queryOption = null;

$(document).on('pageinit', '#post-list', function() {
    updateQuery();

    $('#order-by, #order, #limit').change(function() {
	updateQuery();
    });
});

function updateQuery() {
    var orderBy = $('#order-by option:selected').val();
    var order   = $('#order option:selected').val();
    var limit   = $('#limit').val();

    queryOption = new QueryOptionBuilder()
	.setOrderBy(orderBy, order)
	.setLimit(limit)
	.build();
}