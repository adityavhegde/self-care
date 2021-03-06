const menubar = require('menubar');
const ipcMain = require('electron').ipcMain;
const {shell} = require('electron');
const path = require('path');
const schedulerInstance = require('./views/js/algorithm');
const loadDefaultConfig = require('./loadDefaultConfig');
//pass the options to create the necessary menu
//menubar returned object already creates an app instance

//const iconPath = path.join(__dirname, '/resources/icon.png');
const indexPage = path.join(__dirname, '/views/index.html');
const productURL = 'https://github.com/adityavhegde/self-care';

const options = {
	'index': indexPage,
	'tooltip': 'Walk reminder',
	'width': 300,
	'height': 250,
	/*'icon': iconPath*/
}

var menuInstance = new menubar(options);
var app = menuInstance.app;


//Start the scheduler
schedulerInstance.initUserConfig();
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

ipcMain.on('update-notific-message', (event, data) => {
	schedulerInstance.updateUserMsg(data);
});

ipcMain.on('user-msg', (event, data) => {
	event.returnValue = schedulerInstance.userMsg;
});

ipcMain.on('auto-fill-day-hours', (event, data) => {
	event.returnValue = schedulerInstance.userConfig;
});

ipcMain.on('auto-fill-interval', (event, data) => {
	event.returnValue = schedulerInstance.interval;
});


ipcMain.on('close-app', (event, data) => {
	app.quit();
});

ipcMain.on('open-info', (event, data) => {
	shell.openExternal(productURL);
});
