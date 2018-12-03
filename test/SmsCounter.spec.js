const smsCounter = require('../index');

describe('SmsCounter', () => {
    it('should count simple message', () => {
        const message = 'Hello, this is a simple SMS message!';

        expect(smsCounter.count(message)).toEqual({
            encoding: 'GSM_7BIT',
            length: 36,
            per_message: 160,
            remaining: 124,
            messages: 1,
        });
    });

    it('should count message with emoji', () => {
        const message = 'Cool story bro 😂😂😂';

        expect(smsCounter.count(message)).toEqual({
            encoding: 'UTF16',
            length: 21,
            per_message: 70,
            remaining: 49,
            messages: 1,
        });
    });

    it('should count Polish message', () => {
        const message = 'Wysyłam zdanie po polsku.';

        expect(smsCounter.count(message)).toEqual({
            encoding: 'UTF16',
            length: 25,
            per_message: 70,
            remaining: 45,
            messages: 1,
        });
    });
});