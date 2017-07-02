$(document).ready( () => {
    
    $('[data-toggle="tooltip"]').tooltip(); 

    $('#edit-day-hours').click(function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-day-hours').fadeIn();
    });

});