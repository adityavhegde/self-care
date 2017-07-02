$(document).ready( () => {
    
    //#TODO: this works in a desktop browser, but not in electron app
    $('[data-toggle="tooltip"]').tooltip(); 

    //#TODO: this works in a desktop browser, but not electron in electron app
    $('#edit-day-hours').click(function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-day-hours').fadeIn();
    });

});