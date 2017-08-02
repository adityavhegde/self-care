let ipcRenderer = require('electron').ipcRenderer; 

$(document).ready( () => {

    $('[data-toggle="tooltip"]').tooltip(); 

    setUpListeners();
    setUpFormActions();

});


function setUpListeners() {

	$('#dayhours').bind('click', function() {

        var data = ipcRenderer.sendSync('auto-fill-day-hours', {});
        $('#wakeTimeHH').val(data.wakeTimeHH);
        $('#wakeTimeMM').val(data.wakeTimeMM);
        $('#sleepTimeHH').val(data.sleepTimeHH);
        $('#sleepTimeMM').val(data.sleepTimeHH);

    });

    $('#intervals').bind('click', function() {
        var data = ipcRenderer.sendSync('auto-fill-interval', {});
        $('#userInterval').val(data);

    });

    $('#userMsg').bind('click', function() {
        var data = ipcRenderer.sendSync('user-msg', {});
        $('#userMsg').val(data);

    });


    $('#close-app-btn').on('click', function() {
        ipcRenderer.send('close-app', {});
    });

    $('#info-btn').on('click', function() {
        ipcRenderer.send('open-info', {});
    });
}

function setUpFormActions() {

	$('#submit-1').bind('click', function() {
		var data = {};
        var statusHtml = '<div style="text-align:center"><b><span class="glyphicon glyphicon-ok-circle"></span> Hours edited succesfully</b></div>';

		data.wakeTimeHH = $('#wakeTimeHH').val();
		data.wakeTimeMM = $('#wakeTimeMM').val();
		data.sleepTimeHH = $('#sleepTimeHH').val();
		data.sleepTimeMM = $('#sleepTimeMM').val();

        ipcRenderer.send('update-user-config', data);

        //$('#form-1').hide();
        //$('#edit-day-hours').fadeIn();

        $('#statusMsgToUser-1').append(statusHtml);
        $('#statusMsgToUser-1').fadeIn();
        $('#statusMsgToUser-1').addClass('alert-success');

        setTimeout( () => {
            $('#statusMsgToUser-1').children().remove();
            $('#statusMsgToUser-1').empty();
            $('#statusMsgToUser-1').css('display','none');

        }, 5000);        

		console.log(data);
	});  

    $('#submit-2').bind('click', function() {
        var interval;
        var statusHtml = '<div style="text-align:center"><b><span class="glyphicon glyphicon-ok-circle"></span> Interval edited succesfully</b></div>';

        interval = $('#userInterval').val();

        ipcRenderer.send('update-interval', interval);

        //$('#form-2').hide();
        //$('#edit-interval').fadeIn();

        $('#statusMsgToUser-2').append(statusHtml);
        $('#statusMsgToUser-2').fadeIn();
        $('#statusMsgToUser-2').addClass('alert-success');

        setTimeout( () => {
            $('#statusMsgToUser-2').children().remove();
            $('#statusMsgToUser-2').empty();
            $('#statusMsgToUser-2').css('display','none');

        }, 5000);        

        console.log(data);
    });  

    $('#submit-3').bind('click', function() {
        
        var statusHtml = '<div style="text-align:center"><b><span class="glyphicon glyphicon-ok-circle"></span> Interval edited succesfully</b></div>';

        var data = $('#userMsg').val();
        ipcRenderer.send('update-notific-message', data);

        $('#statusMsgToUser-3').append(statusHtml);
        $('#statusMsgToUser-3').fadeIn();
        $('#statusMsgToUser-3').addClass('alert-success');

        setTimeout( () => {
            $('#statusMsgToUser-3').children().remove();
            $('#statusMsgToUser-3').empty();
            $('#statusMsgToUser-3').css('display','none');

        }, 5000);        

        console.log(data);


    }); 


    $('#discard-1').bind('click', function() {
        var statusHtml = '<div style="text-align:center"><b><span class="glyphicon glyphicon-remove-circle"></span> Changes Discarded</b></div>';

        //$('#form-1').hide();
        //$('#edit-day-hours').fadeIn();

        $('#statusMsgToUser-1').children().remove();
        $('#statusMsgToUser-1').empty();
        $('#statusMsgToUser-1').fadeIn();

        $('#statusMsgToUser-1').append(statusHtml);
        $('#statusMsgToUser-1').addClass('alert-danger');

        setTimeout( () => {
            $('#statusMsgToUser-1').children().remove();
            $('#statusMsgToUser-1').empty();
            $('#statusMsgToUser-1').css('display','none');
            $('#statusMsgToUser-1').removeClass('alert-danger');

        }, 5000);      

    });

    $('#discard-2').bind('click', function() {
        var statusHtml = '<div style="text-align:center"><b><span class="glyphicon glyphicon-remove-circle"></span> Changes Discarded</b></div>';

        //$('#form-2').hide();
        //$('#edit-interval').fadeIn();

        $('#statusMsgToUser-2').children().remove();
        $('#statusMsgToUser-2').empty();
        $('#statusMsgToUser-2').fadeIn();

        $('#statusMsgToUser-2').append(statusHtml);
        $('#statusMsgToUser-2').addClass('alert-danger');

        setTimeout( () => {
            $('#statusMsgToUser-2').children().remove();
            $('#statusMsgToUser-2').empty();
            $('#statusMsgToUser-2').css('display','none');
            $('#statusMsgToUser-2').removeClass('alert-danger');

        }, 5000);      

    });

}
