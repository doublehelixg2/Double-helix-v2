var randomstring = require('randomstring')
var IP = require('ip')

module.exports.generateUnqiue = (length) => {
    return randomstring.generate({
        length : length,
        charset : 'hex'
    })
}

module.exports.billCalculator = (nb_relatives, perMinute) => {
    return "Yet to be implemented"
}

module.exports.otp_generator = () => {
    return randomstring.generate({
        length : 5
    })
}

module.exports.ip = () => {
    return IP.address()
}