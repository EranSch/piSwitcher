var outPins = [0,0,0,0,0,0,0,0];

module.exports = {
	init: function(){ 
		console.dir('PIFACE: PiFace Inititalized'); 
	},
	deinit: function(){ 
		console.dir('PIFACE: PiFace Deinitialized'); 
	},
	digital_write: function(pin, set){ 
		outPins[pin] = set;
		console.dir('PIFACE: Set pin: ' + pin + ' to ' + outPins[pin]); 
	},
	read_output: function(pin){
		return outPins[pin];
	}
};