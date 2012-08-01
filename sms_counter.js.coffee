window.SmsCounter = class SmsCounter

  @gsm7bitChars = "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà"
  @gsm7bitExChar = "^{}\\[~]|€"

  @gsm7bitRegExp = RegExp("^[#{RegExp.escape(@gsm7bitChars)}]*$")
  @gsm7bitExRegExp = RegExp("^[#{RegExp.escape(@gsm7bitChars)}#{RegExp.escape(@gsm7bitExChar)}]*$")
  @gsm7bitExOnlyRegExp = RegExp("^[\\#{RegExp.escape(@gsm7bitExChar)}]*$")

  @GSM_7BIT = 'GSM_7BIT'
  @GSM_7BIT_EX = 'GSM_7BIT_EX'
  @UTF16 = 'UTF16'

  @messageLength =
    GSM_7BIT: 160
    GSM_7BIT_EX: 160
    UTF16: 70

  @multiMessageLength =
    GSM_7BIT: 153
    GSM_7BIT_EX: 153
    UTF16: 67

  @count: (text) ->
    encoding = @detectEncoding(text)

    length = text.length
    length += @countGsm7bitEx(text) if encoding == @GSM_7BIT_EX

    per_message = @messageLength[encoding]
    per_message = @multiMessageLength[encoding] if length > per_message

    messages = Math.ceil(length / per_message)
    remaining = (per_message * messages) - length

    count =
      encoding: encoding
      length: length
      per_message: per_message
      remaining: remaining
      messages: messages

  @detectEncoding: (text) ->
    switch
      when text.match(@gsm7bitRegExp)? then @GSM_7BIT
      when text.match(@gsm7bitExRegExp)? then @GSM_7BIT_EX
      else @UTF16

  @countGsm7bitEx: (text) ->
    chars = (char for char in text when char.match(@gsm7bitExOnlyRegExp)?)
    chars.length

if jQuery?
  $ = jQuery
  $.fn.countSms = (target) ->
    input = @
    target = $(target)

    count_sms = ->
      count = SmsCounter.count(input.val())
      for k, v of count
        target.find(".#{k}").text(v)

    @.on 'keyup.countSms', count_sms
    count_sms()