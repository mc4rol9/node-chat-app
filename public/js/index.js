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
    // format time with moment
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // render mustache template
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
        text: message.text,
        from: message.from,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

// newLocationMessage listener
socket.on('newLocationMessage', function (message) {
    // format time with moment
    var formattedTime = moment(message.createdAt).format('h:mm a');
    // render mustache template
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: formattedTime
    });

    jQuery('#messages').append(html);
});

// submit event listener to form
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

// on click listener event for geolocation 
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
