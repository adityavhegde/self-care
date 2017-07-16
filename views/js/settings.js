//comment: below line for browser test
//let ipcRenderer = require('electron').ipcRenderer; 

$(document).ready( () => {

    $('[data-toggle="tooltip"]').tooltip(); 

    setUpListeners();
    setUpFormActions();

});


function setUpListeners() {

	$('#edit-day-hours').on('click', function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-day-hours').fadeIn();
    });

    $('#edit-interval').on('click', function() {
    	$(this).hide();
    	$(this).next().fadeIn();
    	$('#input-interval').fadeIn();
    });

    $('#discard-1').on('click', function() {
    	$('#form-1').hide();
    	$('#edit-day-hours').fadeIn();
    });

    $('#discard-2').on('click', function() {
    	$('#form-2').hide();
    	$('#edit-interval').fadeIn();
    });

}

function setUpFormActions() {

    $('#form-1').on('submit', (e) => {
    	e.preventDefault();
    	//comment: below line for browser test
    	//ipcRenderer.send('submitForm-1', getFormData(this));
    	console.log(getFormData(this));
    	$('#form-1').hide();
    	$('#statusMsgToUser-1').html("");
    	$('#edit-day-hours').fadeIn();

    	$('#statusMsgToUser-1').append('<span class="glyphicon glyphicon-ok"></span> Hours edited succesfully!');
    	$('#statusMsgToUser-1').fadeIn();
    	$('#statusMsgToUser-1').addClass('alert-success');

    	setTimeout( () => $('#statusMsgToUser-1').css('display','none'), 3000);

    });


    $('#form-2').on('submit', (e) => {
    	e.preventDefault();
    	//comment: below line for browser test
    	//ipcRenderer.send('submitForm-2', getFormData(this));
    	
    	$('#form-2').hide();
    	//clear html and then reset
    	$('#statusMsgToUser-2').html("");
    	$('#edit-interval').fadeIn();
    	$('#statusMsgToUser-2').append('<span class="glyphicon glyphicon-ok"></span> Interval edited succesfully!');
    	$('#statusMsgToUser-2').fadeIn();
    	$('#statusMsgToUser-2').addClass('alert-success');

    	setTimeout( () => $('#statusMsgToUser-2').css('display','none'), 3000);

    });
}

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

