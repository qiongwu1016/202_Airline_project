const express = require('express');
const router = express.Router();
//var app = express()
const airportService = require('./airport.service');

// routes
router.post('/add', create);
router.get('/', getAll);

module.exports = router;
function create(req, res, next) {
    airportService.create(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    airportService.getAll()
        .then(airports => res.json(airports))
        .catch(err => next(err));
}