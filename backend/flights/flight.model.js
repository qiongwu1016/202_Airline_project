const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const schema = new Schema({
    flightNumber: { type: String, required: true },
    flightId: {type: String},
    airline: { type: String, required: true },
    depDateTime: { type: Date, required: true },
    arrDateTime: { type: Date, required: true },
    depAirport: {type: String},
    arrAirport: {type: String},
    price: {type: Schema.Types.Decimal128},
    aircraft: {type: Object}
});



schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Flight', schema);
