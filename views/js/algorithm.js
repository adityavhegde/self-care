/*working sample small
setInterval( () => {
	if(new Date().getMinutes() == 39 && new Date().getSeconds() == 50) {
		console.log('start time hit');
	}
}, 1000);
setInterval( () => {}, 2000); */

var ipcRenderer = require('electron').ipcRenderer;

var instance;

var Scheduler = function() {
	this.schedule = [];
	
	//default user-config and intervals
	this.userConfig = {
		'wakeTimeHH': 7, 
		'wakeTimeMM': 0,
		'sleepTimeHH': 21,
		'sleepTimeMM': 0
	}

	this.interval = 3;

	this.IdToClearInterval = "";

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
		//use interprocess communication to send alerts
		//start alerts from app.js
		if(!(undefined == schedule.find( function(hour) {
			return new Date().getHours() 
		})) && (new Date().getMinutes() == wakeTimeMM) && (new Date().getSeconds() == 0)){
			//ipc to app.js to open up a modal that alerts user
			ipcRenderer.send('alert-user', {});
		} //if ends

	}, 1000);
	console.log('scheduler started: ' + new Date());
};

Scheduler.prototype.stopTimer = function() {
	clearInterval(this.IdToClearInterval);
};


function getInstance() {
	if(instance == null) 
		return instance = new Scheduler();
	else return instance;
};

module.exports = getInstance();

/*
OLD LOGIC; runs scheduler
module.exports = function(userConfig, interval) {
	//#TODO: handle null checks as form validations
	//#TODO: possibly the 2 setIntervals can be merged

	//Below are 2 intervals that run with an interval of 1 sec
	var intervalID;
	var resetID1, resetID2; //used to reset timers 
	
	//Below setInterval runs to check if the current time matches the user's wake time
	//If so, it runs a setInterval with the interval specified by the user
	setInterval( () => {

		if(new Date().getHours() == userConfig.wakeTimeHH && new Date().getMinutes == userConfig.wakeTimeMM 
			&& new Date().getSeconds == 0){
				intervalID = setInterval( () => console.log('code for modal'), parseInt(interval*60*1000)); 
		}

	}, 1000);

	//Below setInterval is meant to catch the system time
	//And match it to the user's end wake time

	setInterval( () => {
		
		if(new Date().getHours() == userConfig.sleepTimeHH && new Date().getMinutes == userConfig.sleepTimeMM 
			&& new Date().getSeconds == 0){
				clearInterval(intervalID);
		}


	}, 2000);

}
*/