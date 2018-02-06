//
// CHAT APP - CLIENT SIDE JS
//

var socket = io();
// connection listener
socket.on('connect', function() {
    console.log('Connected to server');
});

// disconnection listener
socket.on('disconnect', function() {
    console.log('Disconnected from server');
});

// newMessage listener
socket.on('newMessage', function(message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);

    jQuery('#messages').append(li);
});

// newLocationMessage listener
socket.on('newLocationMessage', function (message) {
    var li = jQuery('<li></li>');
    var a = jQuery('<a target="_blank">My current location</a>');

    li.text(`${message.from}: `);
    a.attr('href', message.url);
    li.append(a);

    jQuery('#messages').append(li);
});

// add submit event listener to form
jQuery('#message-form').on('submit', function (e) {
    e.preventDefault();

    var messageTextbox = jQuery('[name=message]');

    socket.emit('createMessage', {
        from: 'User',
        text: messageTextbox.val()
    }, function () {
        messageTextbox.val('')
    });
});

// add click listener event for geolocation 
var locationButton = jQuery('#send-location');
locationButton.on('click', function() {
    if (!navigator.geolocation) {
        return alert('Geolocation not supported by your browser.');
    }
    // disable the location button while processing
    locationButton.attr('disabled', 'disabled').text('Sending location...');

    navigator.geolocation.getCurrentPosition(function(position) {
        // enable the location button after success
        locationButton.removeAttr('disabled').text('Send Location');
        // createLocationMessage emitter
        socket.emit('createLocationMessage',  {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function () {
        // enable the location button after alert message
        locationButton.removeAttr('disabled').text('Send Location');
        alert('Unable to fetch location.');
    });
});
