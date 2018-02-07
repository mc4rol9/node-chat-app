//
// CHAT APP - VALIDATION UTILS
//

// CREATE VALIDATION HANDLERS/MODULES
// validate string type and no empty string
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length > 0;
};

// EXPORT VALIDATION MODULES
module.exports = {isRealString};