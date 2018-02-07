//
// CHAT APP - USERS UTILS TESTS
//

// LOAD IN MODULES
var expect = require('expect');

// LOAD IN PROJECT FILES
var {Users} = require('./users');

// TEST CASES
describe('Users', () => {
    // create dummy array for testing
    var users;

    beforeEach(() => {
        users = new Users();
        users.usersArray = [{
            id: '1',
            name: 'Carol',
            room: 'Node Class'
        }, {
            id: '2',
            name: 'Ana',
            room: 'React Class'
        }, {
            id: '3',
            name: 'Van',
            room: 'Node Class'
        }]
    });

    describe('#addUser', () => {
        it('should add new user', () => {
            // create a new instance of users
            var usersNew = new Users();
            // make a new user
            var user = {
                id: '123',
                name: 'Carol',
                room: 'Node Class'
            }
          
            // call method add user
            var resUser = usersNew.addUser(user.id, user.name, user.room);
            // expect the new instance of the usersArray to have just the user created here
            expect(usersNew.usersArray).toEqual([user]);
        });
    });
   
    describe('#removeUser', () => {
        it('should remove a user', () => {
            // choose an id from dummy user
            var userId = '2';
            // pass the id to remove user method
            var user = users.removeUser(userId);
            // expect the user.id to be the same
            expect(user.id).toBe(userId);
            // // expect the users array length to be 2 now
            expect(users.usersArray).toHaveLength(2);
        });
    
        it('should not remove a user', () => {
            // choose an id that doesn't exist in dummt users
            var userId = '10';
            // pass the id to remove user method
            var user = users.removeUser(userId);
    
            // expect the user to not exist, undefined
            expect(user).toBeUndefined();
            // expect the users array length to be still 3
            expect(users.usersArray).toHaveLength(3);
        });
    });

    describe('#getUser', () => {
        it('should find user', () => {
            // choose an id from dummy users
            var userId = '2';
            // pass the id to getUser methid
            var user = users.getUser(userId);
    
            expect(user.id).toBe(userId);
        });
    
        it('should not find user', () => {
            // create an id that doesn't exist in dummy users
            var userId = '5';
            // pass the id to getUser method
            var user = users.getUser(userId);
            // expect to return undefined
            expect(user).toBeUndefined();
        });
    });

    describe('#getUserList', () => {
        it('should return names for node class room', () => {
            // get users from dummy object from Node Course room
            var userList = users.getUserList('Node Class');
            // it should return just the users name from the room
            expect(userList).toEqual(['Carol', 'Van']);
        });
    
        it('should return names for react class room', () => {
            // get users from dummy object from Node Course room
            var userList = users.getUserList('React Class');
            // it should return just the users name from the room
            expect(userList).toEqual(['Ana']);
        });
    });
});