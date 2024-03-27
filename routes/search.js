var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

const party_data = require('../public/json/party_data.json')

/* GET search */
router.get('/', function(req, res, next) {

    res.render('search_index', { title: 'Xenobuilds'});
});

/* GET search using :id. */
router.get('/xc3/:id', async function(req, res, next) {
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
    res.render('xc3_build', {title: req.params.id, data:party_data[req.params.id], classes:jsonBlocksC});
});

router.get('/xc3', function(req, res, next) {
    
    // Get every team id from JSON file
    var idList = [];
    for (var i = 1; i < party_data.length; i++) {
        var obj = {
                "id":party_data[i].id,
                "name":party_data[i].name
        }
        idList.push(obj);
    }
    console.log("idList:");
    console.log(idList);

    res.render('search_results', { title: 'Xenobuilds', data:idList});
});

module.exports = router;
