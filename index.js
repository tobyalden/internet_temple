var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var Moniker = require('moniker');

currentEmbed = "https://www.youtube.com/embed/DOvy38gU4Ls?showinfo=0&autoplay=1&rel=0&controls=0&modestbranding=0&disablekb=1";

app.use(express.static('public'));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/about', function(req, res) {
  res.sendFile(__dirname + '/about.html');
});

io.on('connection', function(socket) {
  socket.on('request current embed', function() {
    socket.emit('send current embed', {'currentEmbed': currentEmbed, 'newUsername': Moniker.choose()});
  });
  socket.on('embed submission', function(embedCode) {
    currentEmbed = embedCode;
    io.emit('embed submission', currentEmbed);
  });
  socket.on('send chat message', function(message) {
    console.log('message recieved: ' + message);
    io.emit('get chat message', message);
  });
});

var port = process.env.PORT || 3000;
http.listen(port, function() {
  console.log('listening on *:3000');
});
