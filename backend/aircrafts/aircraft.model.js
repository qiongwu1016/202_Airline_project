const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const seatSchema = new Schema({
    rowNumber: {type: String},
    positionNumber: {type: String},
    seatClass: {type: String},
    status: {type: String, enum : ['booked','available'], default: 'available'},
    userId: {type: String}
})

const schema = new Schema({
    airplaneID: {type: String},
    numberOfSeats: {type: Number},
    seats: [seatSchema]
})


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Aircraft', schema);

