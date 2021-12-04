const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
//    _id: mongoose.SchemaTypes.ObjectId,
    username: { type: String, unique: true, required: true },
    hash: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    dateJoined: { type: Date, default: Date.now },
    dateOfBirth: { type: Date },
    passportId: String,
    passpportNationality: String,
    address: {
        streetAddress: String,
        city: String,
        state: String,
        country: String,
        zipcode: String
    },
    role: {
        customer: {
            mileagePoints: { type: Number, default: 0},
        },
        employee: {
            employeeId: {type: Number, min: 1, max:9999999},
        }
    }
});

// schema.set('toJSON', {
//     virtuals: true,
//     versionKey: false,
//     transform: function (doc, ret) {
//         delete ret._id;
//         delete ret.hash;
//     }
// });

module.exports = mongoose.model('User', schema);
