var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/perform', function(req, res) {
  res.sendFile(__dirname + '/perform.html');
});

io.on('connection', function(socket) {
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg);
  });
  socket.on('embed submission', function(embedCode) {
    io.emit('embed submission', embedCode);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
