//
// CHAT APP - ROOT
//

// LOAD IN MODULES
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

// CONFIG MODULES
const publicPath = path.join(__dirname, '../public');
// define port to work both local or online
const port = process.env.PORT || 3000;
// express server
var app = express();
// http server
var server = http.createServer(app);
// config the server to use socketIO
var io = socketIO(server);

// config express static middleware
app.use(express.static(publicPath));

// listen for new connection events
io.on('connection', (socket) => {
    console.log('New user connected');

    // createMessage listener
    socket.on('createMessage', (message) => {
        console.log('createMessage', message);
        // newMessage emitter
        io.emit('newMessage', {
            from: message.from,
            text: message.text,
            cretadedAt: new Date().getTime()
        });
    });

    // disconnection listener
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

// startup the server
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

