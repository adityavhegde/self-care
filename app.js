const menubar = require('menubar');
const BrowserWindow = require('electron').BrowserWindow;
const ipcMain = require('electron').ipcMain;
const path = require('path')
const schedulerInstance = require('./views/js/algorithm');
//pass the options to create the necessary menu
//menubar returned object already creates an app instance

/*
#TODO: add context menu
*/
const iconPath = path.join(__dirname, '/resources/icon.png');
const indexPage = path.join(__dirname, '/views/index.html');
var alertPage = path.join(__dirname, '/views/alert.html');

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
	schedulerInstance.stopTimer();
	schedulerInstance.updateUserConfig(data);
	schedulerInstance.calculateRemindTimes();
	schedulerInstance.startTimer();
});

ipcMain.on('update-interval', (event, data) => {
	schedulerInstance.stopTimer();
	schedulerInstance.updateInterval(parseInt(data));
	schedulerInstance.calculateRemindTimes();
	schedulerInstance.startTimer();
});

var win;

ipcMain.on('alert-user', (event, data) => {
	//#TODO: code for modal
	win = new BrowserWindow({
		'width': 600, 
		'height': 185, 
		'title': 'Walky',
		'frame': false,
		'resizeable': false
	});
	win.setMenu(null);
	win.loadURL(alertPage);


	win.on('closed', () => {
	  win = null
	})

	console.log("alert");
});

ipcMain.on('close-modal', (event, data) => {
	if(win !== null)
		win.close();
});


var menuInstance = new menubar(options);
