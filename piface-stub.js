var outPins = [0,0,0,0,0,0,0,0];

module.exports = {
	init: function(){ 
		console.dir('PIFACE: PiFace Inititalized'); 
	},
	deinit: function(){ 
		console.dir('PIFACE: PiFace Deinitialized'); 
	},
	digital_write: function(pin, set){ 
		outPins[pin] = (set) ? 1 : 0;
		console.dir('PIFACE: Set pin: ' + pin + ' to ' + outPins[pin]); 
	},
	read_output: function(pin){
		var outputState = parseInt(outPins.join(''), 2);
		console.dir('PIFACE: Output pin state: [' + outPins + '] => ' + outputState);
		return outputState;
	}
};