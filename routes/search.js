var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

const party_data = require('../public/json/party_data.json')

/* GET search */
router.get('/', function(req, res, next) {
    res.send('try adding a /:id next time')
});

/* GET search using :id. */
router.get('/:id', async function(req, res, next) {
    if(!party_data[req.params.id]) {
        res.send("Party not found")
    }
    let jsonBlocksC
    try {
        var response = await fetch('https://hunterm64.github.io/data/xc3Class.json')
        jsonBlocksC = await response.json()
    } catch(e) {
        console.log(e);
    }
    res.render('search', {title: req.params.id, data:party_data[req.params.id], classes:jsonBlocksC});
});

module.exports = router;
