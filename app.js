const menubar = require('menubar');
const ipcMain = require('electron').ipcMain;
const path = require('path')
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

var userConfig;

var wakeTimeHH = 7; 
var wakeTimeMM = 0;
var sleepTimeHH = 23;
var sleepTimeMM = 0;

ipcMain.on('submitForm', (event, data) => {
	userConfig = data;
	console.log(userConfig);
});



var menuInstance = new menubar(options);
