//
// CHAT APP - USERS UTILS
//
 
// CREATE USERS HANDLERS/MODULES
// ES6 class to users
class Users {
    // CONSTRUCTOR
    constructor () {
        this.usersArray = [];
    }
    // USER METHODS
    // add new user to array
    addUser (id, name, room) {
        var user = {id, name, room};
        this.usersArray.push(user);
        return user;
    }
    // remove the user from array
    removeUser (id) {
        var user = this.usersArray.filter((user) => user.id === id)[0];

        if (user) {
            this.usersArray = this.usersArray.filter((user) => user.id !== id);
        }

        return user;
    }
    // get an user by id from array
    getUser (id) {
        // [0] returns the first and only item or undefined if not found
        return this.usersArray.filter((user) => user.id === id)[0];
    }
    // get the users from specific room
    getUserList (room) {
        var users = this.usersArray.filter((user) => user.room === room);
        var namesArray = users.map((user) => user.name);
        
        return namesArray;
    }
}

// EXPORT USERS CLASS
module.exports = {Users};