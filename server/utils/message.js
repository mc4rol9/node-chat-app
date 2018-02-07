//
// CHAT APP - MESSAGE UTILS
// 

// LOAD IN MODULES
const moment = require('moment');

// CREATE MESSAGE HANDLERS/MODULES
// generate msg function
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

// generate location msg function
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: moment().valueOf()
    };
};

// EXPORT MESSAGE MODULES
module.exports = {generateMessage, generateLocationMessage};