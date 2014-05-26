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
	socket.emit('success', { message: 'Live connection established' });
	socket.on('switch', function(data){
		console.dir(data);
		if(data.turnOn){
			pfio.digital_write(data.turnOn,1);
			socket.emit('toast', {message: 'Switch ' + data.turnOn + ' actived.'});
		}else{
			pfio.digital_write(data.turnOff,0);
			socket.emit('toast', {message: 'Switch ' + data.turnOff + ' deactived.'});
		}
	});

});
