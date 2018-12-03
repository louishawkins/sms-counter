SMS Counter
=============================

Character counter for SMS messages.


Usage
----------

```javascript
const smsCounter = require('sms-counter');

smsCounter.count('The message to be counted...');
```

This will return the following object:

```javascript
{
	encoding: "GSM_7BIT",
	length: 28,
	messages: 1,
	per_message: 160,
	remaining: 132
}
```


TODO
----

- Better docs


Known Issue
----

(none)


Other Languages
----

- PHP: [https://github.com/acpmasquerade/sms-counter-php](https://github.com/acpmasquerade/sms-counter-php)


## License

SMS Counter is released under the [MIT License](LICENSE.txt).
