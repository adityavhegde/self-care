const menubar = require('menubar');
const ipcMain = require('electron').ipcMain;
const path = require('path')
const schedulerInstance = require('./views/js/algorithm');
//pass the options to create the necessary menu
//menubar returned object already creates an app instance

/*
#TODO: add context menu
*/
const iconPath = path.join(__dirname, '/resources/icon.png');
const indexPage = path.join(__dirname, '/views/index.html')

const options = {
	'index': indexPage,
	'tooltip': 'Walk reminder',
	'width': 300,
	'height': 250,
	'icon': iconPath
}

//Start the scheduler
schedulerInstance.calculateRemindTimes();
schedulerInstance.startTimer();


ipcMain.on('update-user-config', (event, data) => {
	schedulerInstance.updateUserConfig(data);
	schedulerInstance.calculateRemindTimes();
	schedulerInstance.startTimer();
});

ipcMain.on('update-interval', (event, data) => {
	schedulerInstance.updateInterval(parseInt(data.interval));
	schedulerInstance.calculateRemindTimes();
	schedulerInstance.startTimer();
});

ipcMain.on('alert-user', (event, data) => {
	//#TODO: code for modal
	console.log(data);
});


var menuInstance = new menubar(options);
