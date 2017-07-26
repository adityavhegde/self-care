var instance;

var ipcMain = require('electron').ipcMain;
var BrowserWindow = require('electron').BrowserWindow;
var alertPagePath = require('path').join(__dirname + './../alert.html');

var win;

ipcMain.on('close-modal', (event, data) => {
	win.close();
	win = undefined;
});

var Scheduler = function() {
	this.schedule = [];

	//default user-config and intervals
	this.userConfig = {
		'wakeTimeHH': 7, 
		'wakeTimeMM': 0,
		'sleepTimeHH': 21,
		'sleepTimeMM': 0
	}

	this.interval = 1;

	this.IdToClearInterval;

}

Scheduler.prototype.updateUserConfig = function(config) {
	console.log('user config updated:');
	this.userConfig.wakeTimeHH = parseInt(config.wakeTimeHH);
	this.userConfig.wakeTimeMM = parseInt(config.wakeTimeMM);
	this.userConfig.sleepTimeHH = parseInt(config.sleepTimeHH);
	this.userConfig.sleepTimeMM = parseInt(config.sleepTimeMM);
	console.log(config);

};

Scheduler.prototype.updateInterval = function(interval) {
	this.interval = interval;
	console.log('interval updated: ' + interval);
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
			console.log('fire modal');
			
			//close any previous window running
			if(win !== null && win!== undefined) {
				win.show();
			}
			else {
				win = new BrowserWindow({
							'width': 600, 
							'height': 185, 
							'title': 'Walky',
							'frame': false,
							'resizeable': false
						});
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
