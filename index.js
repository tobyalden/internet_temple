var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/about.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  socket.on('embed submission', function(embedCode) {
    io.emit('embed submission', embedCode);
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function(){
  console.log('listening on *:3000');
});
