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

// export msg utils
module.exports = {generateMessage};