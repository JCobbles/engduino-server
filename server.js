var express = require('express');
var app = express();

var server = app.listen(process.env.port || 3000, function() {
  console.log('App listening');
});

var io = require('socket.io').listen(server);

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.sendfile('index.html');
});

// Endpoint used to update the data used in the graphs
app.use('/update/:data', function(req, res) {
    console.log(req.params);
    io.sockets.emit('update', { data: req.params.data });
    res.json({ success: true });
});

io.on('connection', function(socket) {
    console.log("connected");
});
