var Patient = require('./default').Patient
var generate = require('../utils/utils').generateUnqiue
var Bed = require('./Bed')

class PatientObject {
    addPatient(object, callback) {
        var patientID = generate(10)

        object.patientID = patientID

        console.log(object)

        var patient = new Patient({
            patientID: object.patientID,
            phone: object.phone,
            billing: object.billing,
            diseaseType: object.diseaseType,
            name: object.name,
            roomID: object.roomID,
            bedID: object.bedID
        })

        patient.save((err, result) => {
            if (err) {
                throw err
                return callback({ error: true, "Message": "Patient not added" })
            } else {
                new Bed().updateHasPatient(object.bedID, true, (result) => { return })
                return callback({ error: false, "Message": "Patient added" })
            }
        })
    }

    getPatients(callback) {
        Patient.find({}).exec((error, results) => {
            if (!error) callback({ error: false, objects: results })
        })
    }

    deletePatient(patientID, bedID, callback) {
        console.log(patientID, bedID)
        Patient.findOneAndDelete({ patientID: patientID }).exec((err, result) => {
            console.log(result)
            if (err) callback({ error: true })
            else {
                new Bed().updateHasPatient(bedID, false, (result) => { return })
                callback({ error: false })
            }
        })
    }
}

module.exports = PatientObject