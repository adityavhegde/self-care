//comment: below line for browser test
let ipcRenderer = require('electron').ipcRenderer; 

$(document).ready( () => {

    $('[data-toggle="tooltip"]').tooltip(); 

    $('#edit-day-hours').click(function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-day-hours').fadeIn();
    });

    $('form').submit((e) => {
    	e.preventDefault();

    	//comment: below line for browser test
    	ipcRenderer.send('submitForm', getFormData(this));
    	
    	$('form').hide();
    	$('#edit-day-hours').fadeIn();
    	$('#statusMsgToUser').fadeIn();
    	$('#statusMsgToUser').addClass('alert-success');

    	window.setTimeout( () => {
  			$("#statusMsgToUser").fadeTo(500, 0).slideUp(500, () => {
    		$(this).hide(); 
  			});
		}, 3000);

    });

});

function getFormData(e) {
   var data = {};
   var dataArray = $(e).serializeArray();

   //#TODO: refactor using correct standards for the loop
   for(var i=0;i<dataArray.length;i++){
     	data[dataArray[i].name] = dataArray[i].value;
   }

   return data;
}

function statusMsgToUser() {

}
