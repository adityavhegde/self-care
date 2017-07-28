var instance;

var ipcMain = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;
var fs = require('fs');

var alertPagePath = require('path').join(__dirname + './../alert.html');
var errorPagePath = require('path').join(__dirname + './../error.html');

var win;
var browserWindowOptions = {
	'width': 600, 
	'height': 185, 
	'title': 'Walky',
	'frame': false,
	'resizable': false,
	'alwaysOnTop': true
}

ipcMain.on('close-modal', (event, data) => {
	win.close();
	win = undefined;
});

var Scheduler = function() {
	this.schedule = [];

	this.userConfig;

	this.interval;

	this.IdToClearInterval;

}

/*
Configurations are read from file.
However, this happens only when the application loads.
When configs are updated, they are also written to config.json.
However, updated configs are read directly from the Scheduler Object's variables.
*/

Scheduler.prototype.initUserConfig = function() {
	var data = fs.readFileSync('./config.json');
	var userConfigObj;
	
	userConfigObj = JSON.parse(data);
	//#TODO: add try-catch block for error handling
	console.log('INFO: succesfully read user-config from config.json: ');
	console.log(JSON.stringify(userConfigObj));
	
	this.userConfig = userConfigObj.hours;
	this.interval = userConfigObj.interval;		
}

Scheduler.prototype.updateUserConfig = function(config) {
	this.userConfig.wakeTimeHH = parseInt(config.wakeTimeHH);
	this.userConfig.wakeTimeMM = parseInt(config.wakeTimeMM);
	this.userConfig.sleepTimeHH = parseInt(config.sleepTimeHH);
	this.userConfig.sleepTimeMM = parseInt(config.sleepTimeMM);
	console.log('INFO: user day-hours config updated:');
	console.log(JSON.stringify(config));
	
	//write updated config to config.json
	var hours = this.userConfig;

	var updatedConfig = { 
		hours, 
		'interval': this.interval
	};

	var data = JSON.stringify(updatedConfig);

	fs.writeFile('./config.json', data, function(err) {
		if(err) {
			console.log('ERROR: there was problem updating config in config.json');
		}
		console.log('INFO: succesfully updated user day-hours in config.json');
	});

};

Scheduler.prototype.updateInterval = function(interval) {
	this.interval = interval;
	console.log('INFO: interval updated: ' + interval);

	//write updated interval to config.json
	var hours = this.userConfig;

	var updatedConfig = {
		hours,
		'interval': interval
	};

	var data = JSON.stringify(updatedConfig);

	fs.writeFile('./config.json', data, function(err) {
		if(err) {
			console.log('ERROR: there was problem updating config in config.json');
		}
		console.log('INFO: succesfully updated user Interval in config.json');
	});

};

Scheduler.prototype.calculateRemindTimes = function() {
	this.schedule = [];
	var schedule = [];

	var wakeTimeHH = this.userConfig.wakeTimeHH;
	var sleepTimeHH = this.userConfig.sleepTimeHH;
	var interval = this.interval;

	var currTime = wakeTimeHH;
	var numSchedules;

	if(wakeTimeHH < sleepTimeHH){
		numSchedules = parseInt((sleepTimeHH - wakeTimeHH)/this.interval);
	}
	else {
		var hours = (24-wakeTimeHH) + sleepTimeHH;
		numSchedules = parseInt(hours/this.interval);
	}

	var i = 0;
	while(true) {
		if(i >= numSchedules) {
			break;
		}
		else {
			if(!((currTime + interval)%24 == sleepTimeHH)){
			schedule.push((currTime + interval)%24);
			currTime = currTime + interval;
			}
		}
		i = i + 1;

	}
	this.schedule = schedule;
	console.log('alarm times calculated: '+ new Date());
	console.log('schedule ring times: ' + schedule);
};

Scheduler.prototype.startTimer = function() {

	var schedule = this.schedule;
	var wakeTimeMM = this.userConfig.wakeTimeMM;

	this.IdToClearInterval = setInterval( function() {
		if(!(undefined == schedule.find( function(hour) {
			return new Date().getHours() == hour; 
		})) && (new Date().getMinutes() == wakeTimeMM) && (new Date().getSeconds() == 0)){
			console.log('INFO: firing modal');
			
			//close any previous window running
			if(win !== null && win!== undefined) {
				win.show();
			}
			else {
				win = new BrowserWindow(browserWindowOptions);
				win.setMenu(null);
				win.loadURL(alertPagePath);

			}
		} //if-ends

	}, 1000);

	console.log('scheduler started: ' + new Date());
};

Scheduler.prototype.stopTimer = function() {
	clearInterval(this.IdToClearInterval);
	console.log('setTimeout cleared');

};

function getInstance() {
	if(instance == null) {
		return instance = new Scheduler();
	}
	else return instance;
};

module.exports = getInstance();
