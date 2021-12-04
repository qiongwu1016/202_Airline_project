const config = require('config.json');
const db = require('_helpers/db');
const Flight = db.Flight;
const Airport = db.Airport;
const Aircraft = db.Aircraft;


module.exports = {
    create,
    getByNum,
    getAll,
    getByDate,
    search,
    update
};


async function create(flightParam) {
    // validate
    if (await Flight.findOne({ flightNumer: flightParam.flightNumber })) {
        throw 'Flight Number "' + flightParam.flightNumber + '" is already taken';
    }
    
    if (!await Airport.findOne({ airportCode: flightParam.depAirport })) {
        throw 'Departure Airport Code "' + flightParam.depAirport + '" does not exist';
    }

    if (!await Airport.findOne({ airportCode: flightParam.arrAirport })) {
        throw 'Arrival Airport Code "' + flightParam.arrAirport + '" does not exist';
    }

    const aircraft = await Aircraft.findOne({airplaneId: flightParam.airplaneId});
    flightParam["flightId"] = flightParam.flightNumber + "@" + flightParam.depDateTime;
    flightParam['aircraft'] = aircraft;
    const flight = new Flight(flightParam);
    await flight.save();
    return flight.toJSON();
}

async function getByNum(flightNum) {
    return await Flight.findOne({flightNumber: flightNum});
} 

async function getAll() {
    return await Flight.find();
}

async function getByDate(date) {
    return await Flight.find({depDateTime: {$gte: date, $lte: date}});
}

async function search(param) {
    function getDateBoundary (inDate) {
        var lowerDate = new Date(inDate)
        lowerDate.setDate(lowerDate.getDate() - 3);
        lowerDate = lowerDate.getFullYear() + "-" + (lowerDate.getMonth()+1) + "-" + lowerDate.getDate()
        var upperDate = new Date(inDate)
        upperDate.setDate(upperDate.getDate() + 3);
        upperDate = upperDate.getFullYear() + "-" + (upperDate.getMonth()+1) + "-" + upperDate.getDate()
        return [lowerDate, upperDate]
    }
    var dateBoundary = getDateBoundary(param.departDate)
    const searchDepart = {
            'depDateTime': {$gte: dateBoundary[0], $lte: dateBoundary[1]},
            'depAirport': param.departAirport,
            'arrAirport': param.arrivalAirport
        }
    // return await Flight.find(searchDepart);
    const departFlights = await Flight.find(searchDepart);
    var returnFlights = []
    if (param.roundTrip) {
        dateBoundary = getDateBoundary(param.returnDate)
        const searchReturn = {
                'depDateTime': {$gte: dateBoundary[0], $lte: dateBoundary[1]},
                'depAirport': param.arrivalAirport,
                'arrAirport': param.departAirport
            }
        // return await Flight.find(searchReturn);
        returnFlights = await Flight.find(searchReturn);
    }
    const flightsResult = { departFlights: departFlights, returnFlights: returnFlights }
    return flightsResult
}

async function update(flightNum, param) {
    const flight = await Flight.findOne({flightNumber: flightNum});

    // validate
    if (!flight) throw 'Flight not found';

    // copy userParam properties to user
    Object.assign(flight, param);

    await flight.save();
}

