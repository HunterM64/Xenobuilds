var express = require('express');
var router = express.Router();

const party_data = require('../public/json/party_data.json')

/* GET search */
router.get('/', function(req, res, next) {
    res.send('try adding a /:id next time')
});

/* GET search using :id. */
router.get('/:id', function(req, res, next) {
    res.render('search', {title: party_data[req.params.id].party_name, data:party_data[req.params.id]});
});

module.exports = router;
