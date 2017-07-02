$(document).ready( () => {
    
    //#TODO: this works in a desktop browser, but not electron
    $('[data-toggle="tooltip"]').tooltip(); 

    $('#edit-day-hours').click(function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-day-hours').fadeIn();
    });

});