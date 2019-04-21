var credentials = {
    "COUNTRY" : 91,
    "SENDER" : "SIHTES",
    "ROUTE" : 4,
    "AUTH_KEY" : "263509AMoDWqDn5c6a74e8"
}

var sms = require('msg91')(credentials.AUTH_KEY, credentials.SENDER, credentials.ROUTE)

module.exports.sendSMS = (phone, message, callback) => {
    sms.send(phone, message, (error, resp) => {
        if(!error) callback(resp)
    })
}

