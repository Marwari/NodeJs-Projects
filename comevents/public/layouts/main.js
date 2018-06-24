$(document).ready(function() {
	$('#deleteEvent').on('click', function(e){
		deleteId = $('#deleteEvent').data('detete');
		$.ajax({
			url: '/events/delete/'+deleteId,
			type:'DELETE',
			success: function(result){

			}
		});
		window.location = '/events';
	});
});