$(function() {
    $('#post_form').bind('submit', function(e) {
	e.preventDefault();

	var $form = $('#post_form');
	var $button = $form.find('#post_button');
	console.log($button);
	$.ajax({
            url: $form.attr('action'),
            type: $form.attr('method'),
            data: $form.serialize(),
	    timeout: 10000,

	    beforeSend: function(xhr, settings) {
		$button.attr('disabled', true);
	    },

	    complete: function(xhr, textStatus) {
		$button.attr('disabled', false);
	    },

	    success: function(data, textStatus, xhr) {
		$form[0].reset();

		// 
	    },

	    error: function(xhr, textStatus, error) {
		alert('error');
		console.log(error);
            }
	});
    });
});
