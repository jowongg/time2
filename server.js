const express = require('express');
const socketServer = require('socket.io');

/// SERVER ///

var app = express();
var server = app.listen(8080, listening);
app.use(express.static('public'));

function listening(){
    console.log('listening ...');
}

/// SOCKET ///

// run socket on this server
var io = socketServer(server);

io.on('connection', function(socket){
    // to check if website is connected to socket
    console.log('connected');
    // sending object to server in order to send object to every website that is connected to socket
    socket.on('text-to-server', function(newMemory){
        //console.log(newMemory + "backend");
        // send object to every socket
        io.sockets.emit('text-to-sockets', newMemory);
    });
    
})
