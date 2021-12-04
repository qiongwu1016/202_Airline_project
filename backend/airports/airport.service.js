const config = require('config.json');
const db = require('_helpers/db');
const Airport = db.Airport;


module.exports = {
    create,
    getAll
};


async function create(param) {
    // validate
    if (await Airport.findOne({ airportCode: param.airportCode })) {
        throw 'Airport Code "' + param.ariportCode + '" is already taken';
    }
    const airport = new Airport(param);
    await airport.save();
    return {
        ...airport.toJSON()
    };
}

async function getAll() {
    return await Airport.distinct('airportCode');
}
