var 	app = require('http').createServer(handler),
			io = require('socket.io').listen(app),
			fs = require('fs'),
			pfio = require('piface-node');

process.on('SIGINT', function(){
	pfio.deinit();
});

pfio.init();
app.listen(8080);

function handler (req, res) {
	fs.readFile(__dirname + '/index.html',
	function (err, data) {
		if (err) {
			res.writeHead(500);
			return res.end('Error loading index.html');
		}

		res.writeHead(200);
		res.end(data);
	});
}

io.sockets.on('connection', function (socket) {
	socket.emit('connect', { message: 'hello' });
	socket.on('switch', function(data){
		console.dir(data);
		if(data.turnOn){
			pfio.digital_write(data.turnOn,1);
		}else{
			pfio.digital_write(data.turnOff,0);
		}	
	});
});
