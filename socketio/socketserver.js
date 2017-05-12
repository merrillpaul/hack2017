var fs = require('fs');
var https = require('https');
var options = {
  key: fs.readFileSync('./file.pem'),
  cert: fs.readFileSync('./file.crt')
};
var serverPort = 8443;
var app = require('express')();
var server = https.createServer(options, app);
var io = require('socket.io')(server);
var topic = io.of('/topic');
server.listen(serverPort);

app.get('/', function (req, res) {
 // res.sendfile(__dirname + '/index.html');
// console.log(req);
// let product = req.param['product'];
// let patientId = req.param['patientId'];
// topic.emit(product, {patientId: patientId});
 res.writeHead(200);
 res.end(JSON.stringify({success: 'ok'}, null, 5));
});

app.get('/callback', function (req, res) {
	let product = req.query['product'];
	let patientId = req.query['patientID'];
	let score = req.query['score'];
	let clazz = req.query['class'];
	topic.emit('bdi', {patientId: patientId, score: score, clazz: clazz});
 	console.log('tester', req.query);
	res.writeHead(200);
 	res.end(JSON.stringify({success: 'ok', patientId: patientId, score: score, clazz: clazz}, null, 5));
});

io.on('connection', function (socket) {
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.log(data);
  });
});
