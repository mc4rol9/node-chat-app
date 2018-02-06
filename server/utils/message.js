//
// CHAT APP - MESSAGE UTILS
// 

// generate msg function
var generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: new Date().getTime()
    };
};

// generate location msg function
var generateLocationMessage = (from, latitude, longitude) => {
    return {
        from,
        url: `https://www.google.com/maps?q=${latitude},${longitude}`,
        createdAt: new Date().getTime()
    };
};

// export msg utils
module.exports = {generateMessage, generateLocationMessage};