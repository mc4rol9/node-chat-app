//
// CHAT APP - CLIENT SIDE JS
//

var socket = io();
// connection listener
socket.on('connect', function() {
    console.log('Connected to server');

    // createMessage emitter
    socket.emit('createMessage', {
        from: 'Carol',
        text: 'Hello there!'
    });
});

// disconnection listener
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// newMessage listener
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
});