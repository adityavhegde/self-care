/*working sample small
setInterval( () => {
	if(new Date().getMinutes() == 39 && new Date().getSeconds() == 50) {
		console.log('start time hit');
	}
}, 1000);
setInterval( () => {}, 2000); */


module.exports = function(userConfig, interval) {
	//#TODO: handle null checks as form validations
	//#TODO: possibly the 2 setIntervals can be merged

	//Below are 2 intervals that run with an interval of 1 sec
	var intervalID;
	var resetID1, resetID2; //used to reset timers 
	
	/*Below setInterval runs to check if the current time matches the user's wake time
	If so, it runs a setInterval with the interval specified by the user*/
	setInterval( () => {

		if(new Date().getHours() == userConfig.wakeTimeHH && new Date().getMinutes == userConfig.wakeTimeMM 
			&& new Date().getSeconds == 0){
				intervalID = setInterval( () => console.log('code for modal'), parseInt(interval*60*1000)); 
		}

	}, 1000);

	/*Below setInterval is meant to catch the system time
	And match it to the user's end wake time*/

	setInterval( () => {
		
		if(new Date().getHours() == userConfig.sleepTimeHH && new Date().getMinutes == userConfig.sleepTimeMM 
			&& new Date().getSeconds == 0){
				clearInterval(intervalID);
		}


	}, 2000);

}
