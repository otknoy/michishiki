var queryOption = null;

$(document).on('pageshow', '#query-setting', function() {
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

    var queryOption = new utils.QueryOptionBuilder();
    queryOption.setOrderBy($orderBy.text(), $order.text());
    queryOption.setLimit($limit.val());

    queryOption = queryOption.build();
}
