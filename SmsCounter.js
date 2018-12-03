const gsm7bitChars = "@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\\\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà";
const gsm7bitExChar = "\\^{}\\\\\\[~\\]|€";
const GSM_7BIT = 'GSM_7BIT';
const GSM_7BIT_EX = 'GSM_7BIT_EX';
const UTF16 = 'UTF16';

class SmsCounter {
    constructor() {
        this.messageLength = {
            GSM_7BIT: 160,
            GSM_7BIT_EX: 160,
            UTF16: 70
        };

        this.multiMessageLength = {
            GSM_7BIT: 153,
            GSM_7BIT_EX: 153,
            UTF16: 67
        };
    }

    get gsm7bitRegExp() {
        return RegExp('^[' + gsm7bitChars + ']*$');
    }

    get gsm7bitExRegExp() {
        return RegExp("^[" + gsm7bitChars + gsm7bitExChar + "]*$");
    }

    get gsm7bitExOnlyRegExp() {
        return RegExp("^[\\" + gsm7bitExChar + "]*$");
    }

    count(text) {
        let encoding, length, messages, per_message, remaining;
        encoding = this.detectEncoding(text);
        length = text.length;
        if (encoding === GSM_7BIT_EX) {
            length += this.countGsm7bitEx(text);
        }
        per_message = this.messageLength[encoding];
        if (length > per_message) {
            per_message = this.multiMessageLength[encoding];
        }
        messages = Math.ceil(length / per_message);
        remaining = (per_message * messages) - length;
        if (remaining === 0 && messages === 0) {
            remaining = per_message;
        }
        return {
            encoding: encoding,
            length: length,
            per_message: per_message,
            remaining: remaining,
            messages: messages
        };
    }

    detectEncoding(text) {
        switch (false) {
            case text.match(this.gsm7bitRegExp) == null:
                return GSM_7BIT;
            case text.match(this.gsm7bitExRegExp) == null:
                return GSM_7BIT_EX;
            default:
                return UTF16;
        }
    }

    countGsm7bitEx(text) {
        let char2, chars;
        chars = (function () {
            let _i, _len, _results;
            _results = [];
            for (_i = 0, _len = text.length; _i < _len; _i++) {
                char2 = text[_i];
                if (char2.match(this.gsm7bitExOnlyRegExp) != null) {
                    _results.push(char2);
                }
            }
            return _results;
        }).call(this);
        return chars.length;
    }

}

module.exports = new SmsCounter();