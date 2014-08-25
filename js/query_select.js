var queryOption = null;

$(document).on('pageinit', '#post-list', function() {
    updateQuery();

    $('#order-by').change(function() {
	updateQuery();
    });
    
    $('#order').change(function() {
	updateQuery();
    });
    
    $('#limit').change(function() {
	updateQuery();
    });
});

function updateQuery() {
    var $orderBy = $('#order-by option:selected');
    var $order   = $('#order option:selected');
    var $limit   = $('#limit');

    queryOption = new utils.QueryOptionBuilder()
	.setOrderBy($orderBy.val(), $order.val())
	.setLimit($limit.val())
	.build();;
}