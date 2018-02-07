//
// CHAT APP - VALIDATION UTILS TESTS
//

// LOAD IN MODULES
var expect = require('expect');

// LOAD IN PROJECT FILES
var {isRealString} = require('./validation');

// TEST CASES
describe('isRealString', () => {
    it('should reject non-string values',  () => {
        var name = 123;
        var room = 'Dev Room';
        var validation = isRealString(name, room);

        expect(validation).toBeFalsy();
    });

    it('should reject string with only spaces', () => {
        var name = '  ';
        var room = '  ';
        var validation = isRealString(name, room);

        expect(validation).toBeFalsy();
    });

    it('should allow string with non-space characters', () => {
        var name = 'Carol Higo';
        var room = 'NodeJS';
        var validation = isRealString(name, room);

        expect(validation).toBeTruthy();
    });
});