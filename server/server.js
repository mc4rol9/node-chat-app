//
// CHAT APP - ROOT
//

// LOAD IN MODULES
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

//LOAD IN PROJECT FILES
const {generateMessage, generateLocationMessage} = require('./utils/message');

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
    
    // welcome message
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
    
    // new user joined message
    socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user joined.'));

    // createMessage listener
    socket.on('createMessage', (message, callback) => {
        console.log('createMessage', message);
        // new message emitter
        io.emit('newMessage', generateMessage(message.from, message.text));
        callback();
    });

    // createLocationMessage listener
    socket.on('createLocationMessage', (coords) => {
        io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
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

