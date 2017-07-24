/*working sample small
setInterval( () => {
	if(new Date().getMinutes() == 39 && new Date().getSeconds() == 50) {
		console.log('start time hit');
	}
}, 1000);
setInterval( () => {}, 2000); */

//#TODO: turn into singleton
var ipcRenderer = require('electron').ipcRenderer;

var Scheduler = function() {
	this.schedule = [];
	
	//default user-config and intervals
	this.userConfig = {
		wakeTimeHH: 7, 
		wakeTimeMM: 0,
		sleepTimeHH: 23,
		sleepTimeMM: 0
	}

	this.interval = 1;

	this.IdToClearInterval = "";

}

Scheduler.prototype.updateUserConfig = function(userConfig) {
	this.userConfig = userConfig;
}

Scheduler.prototype.updateInterval = function(interval) {
	this.interval = interval;
}

Scheduler.prototype.calculateRemindTimes = function() {
	var schedule = this.schedule;

	var wakeTimeHH = this.userConfig.wakeTimeHH;
	var sleepTimeHH = this.userConfig.sleepTimeHH;
	var interval = this.interval;

	var currTime = wakeTimeHH;
	while(true) {
		if( (currTime + interval)%24 > sleepTimeHH ) 
			break;
		else {
			schedule.push(currTime + interval);
			currTime = currTime + interval;
		}

	}

}

Scheduler.prototype.startTimer = function() {

	this.IdToClearInterval = setInterval( function() {
		//use interprocess communication to send alerts
		//start alerts from app.js
	if(!(undefined == this.schedule.find( function(hour) {
		return new Date().getHours() == hour;
	})) && (new Date().getMinutes() == wakeTimeMM) && (new Date().getSeconds() == 0)){
		//ipc to app.js to open up a modal that alerts user
		ipcRenderer.send('alert-user', {});
	} //if ends

	}, 1000);
}

Scheduler.prototype.stopTimer = function() {
	clearInterval(this.IdToClearInterval);
}

module.exports = new Scheduler();

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