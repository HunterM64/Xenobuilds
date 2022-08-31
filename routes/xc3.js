var express = require('express');
var router = express.Router();

var fs = require('fs');

const party_data = require('../public/json/party_data.json');

/* GET route */
router.get('/', function(req, res, next) {
  res.render('xc3', {title: 'XC3'});
});

router.post('/', function(req, res, next) {
  var party_id = party_data[party_data.length-1].id + 1
  var party_name = req.body.party_name

  const party = {
    id: party_id,
    name: party_name
  }
  party_data.push(party)
  const jsonParty = JSON.stringify(party_data)

  fs.writeFile(__dirname + '/../public/json/party_data.json', jsonParty, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  res.redirect('/search/' + party_id.toString())
});

module.exports = router;
