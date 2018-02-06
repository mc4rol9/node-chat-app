//
// CHAT APP - MESSAGE UTILS TESTS
//

// LOAD IN MODULES
var expect = require('expect');

//LOAD IN PROJECT FILES
var {generateMessage, generateLocationMessage} = require('./message');

// TEST CASES
describe('generateMessage', () => {
    it('should generate the correct msg object', () => {
        var from = 'Carol';
        var text = 'Text message';
        var message = generateMessage(from, text);

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, text});
    });
});

describe('generateLocationMessage', () => {
    it('should generate correct location object', () => {
        var from = 'Ana';
        var lat = '15';
        var long = '19';
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, lat, long)

        expect(typeof message.createdAt).toBe('number');
        expect(message).toMatchObject({from, url});
    });
});