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
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

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
// new users instance
var users = new Users();

// config express static middleware
app.use(express.static(publicPath));

// listen for new connection events
io.on('connection', (socket) => {
    console.log('New user connected');

    // join listener
    socket.on('join', (params, callback) => {
        // validate params name and room
        if (!isRealString(params.name) || !isRealString(params.room)) {
            return callback('Name and room are required.');
        }

        // user join a room
        socket.join(params.room);
        // remove user from previous room
        users.removeUser(socket.id);
        // add user to new room
        users.addUser(socket.id, params.name, params.room);

        // updateUserList emitter 
        io.to(params.room).emit('updateUserList', users.getUserList(params.room));

        // welcome message to all users no matter the room
        socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app.'));
        
        // broadcast msg to all users from specific room - params.room
        socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));
        callback();
    });

    // createMessage listener
    socket.on('createMessage', (message, callback) => {
        // find user
        var user = users.getUser(socket.id);

        if (user && isRealString(message.text)) {
            // new message emitter
            io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
        };
        
        callback();
    });

    // createLocationMessage listener
    socket.on('createLocationMessage', (coords) => {
        // find user
        var user = users.getUser(socket.id);

        if (user) {
            // new geolocation msg emitter
            io.to(user.room).emit('newLocationMessage', 
                                  generateLocationMessage(user.name, coords.latitude, coords.longitude));
        };
    });

    // disconnection listener
    socket.on('disconnect', () => {
        var user = users.removeUser(socket.id);

        if (user) {
            // update the users list
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            // emit a message the users at room
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left`));
        }
    });
});

// startup the server
server.listen(port, () => {
    console.log(`Server is up on port ${port}`);
});

