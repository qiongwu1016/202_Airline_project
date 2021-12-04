const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    airportName: {type: String},
    airportCode: {type: String, required:true},
    address: {type: String},
    phone: {type: String}
})


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
        delete ret.hash;
    }
});

module.exports = mongoose.model('Airport', schema);