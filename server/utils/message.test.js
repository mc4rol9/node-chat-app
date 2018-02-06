//
// CHAT APP - MESSAGE UTILS TESTS
//

// LOAD IN MODULES
var expect = require('expect');

//LOAD IN PROJECT FILES
var {generateMessage} = require('./message');

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