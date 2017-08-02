var fs = require('fs');

	/*
	Create default config on first load 
	Load data from config.json on future calls
	*/

var defaultUserConfig = {
	'hours': {
	'wakeTimeHH': 6, 
	'wakeTimeMM': 0,
	'sleepTimeHH': 23,
	'sleepTimeMM': 0
	},
	'interval': 1,
	'userMsg': "Looks like you've been working hard today. Time to stretch out"
};

var data = JSON.stringify(defaultUserConfig);

if(!fs.existsSync('./config.json')){
	fs.writeFile('./config.json', data, function(err) {
		if (err) {
	  	console.log('There has been an error saving your configuration data.');
	  	console.log(err.message);
		}
		console.log('Configuration saved successfully.');
	});
}


