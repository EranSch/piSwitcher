var app = require('http').createServer(handler),
    io = require('socket.io').listen(app),
    fs = require('fs');

var pfio = ( process.env.NODE_ENV === 'production' ) ?
    require('piface-node') : require('./piface-stub');

process.on('SIGINT', function(){
	pfio.deinit();
	process.exit(0);
});

pfio.init();
app.listen(8080);

function handler (req, res) {
	console.dir(req.url);
	var request = (req.url === '/') ? '/index.html' : req.url;
	fs.readFile(__dirname + request,
	function (err, data) {
		if (err) {
			res.writeHead(404);
			return res.end('File not found');
		}
		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection', function (socket) {
	socket.emit('success', { 
		message: 'Live connection established' 
	});
	(function(){
		var outputPins = [0,0,0,0,0,0,0,0];
		for (var i = outputPins.length - 1; i >= 0; i--) {
			outputPins[i] = pfio.read_output(i);
		}
		socket.emit('fullStatus', {
			outputPins: outputPins
		});
	})();
	socket.on('switch', function(data){
		console.dir(data);
		pfio.digital_write(data.pin, data.set);
		var verb = (data.set === true) ? 'Activated' : 'Deactived';
		io.sockets.emit('setStatus', {
			message: 'Output: ' + data.pin + ' ' + verb,
			id: data.pin,
			state: data.set
		});
	});
});
