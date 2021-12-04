const express = require('express');
const router = express.Router();
// var app = express()
const flightService = require('./flight.service');

// routes
router.post('/add', create);
router.get('/:flightNum', searchNum);
router.get('/', getAll)
router.post('/search', search)
router.get('/date/:date', dateSearch)
router.put('/:flightNum', update)

module.exports = router;

function create(req, res, next) {
    flightService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function searchNum(req, res, next) {
    flightService.getByNum(req.params.flightNum)
        .then(flight => flight ? res.json(flight) : res.sendStatus(404))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    flightService.getAll()
        .then(flights => res.json(flights))
        .catch(err => next(err));
}
function dateSearch(req, res, next) {
    flightService.getByDate(req.params.date)
        .then(flight => flight ? res.json(flight) : res.sendStatus(404))
        .catch(err => next(err));

}

function search(req, res, next) {
    flightService.search(req.body)
        .then(flight => flight ? res.json(flight) : res.status(400).json({ message: 'Sorry, no matching flight found.' }))
        .catch(err => next(err));
}

function update(req, res, next) {
    flightService.update(req.params.flightNum, req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

