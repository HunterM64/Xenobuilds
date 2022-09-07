var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

var fs = require('fs');

const party_data = require('../public/json/party_data.json');

/* GET route */
router.get('/', async function(req, res, next) {
  let jsonBlocks;
  try {
    var response = await fetch('https://hunterm64.github.io/data/xc3HeroList.json')
    jsonBlocks = await response.json();
    console.log(jsonBlocks);
  } catch (e) {
    console.error(e)
  }
  res.render('xc3', {title: 'XC3', heroes:jsonBlocks});
});

router.post('/', function(req, res, next) {
  var party_id = party_data[party_data.length-1].id + 1
  var partyName = req.body.partyName
  var heroName = req.body.heroName

  const party = {
    id: party_id,
    name: partyName,
    heroName: heroName
  }
  party_data.push(party)
  const jsonParty = JSON.stringify(party_data)

  fs.writeFileSync(__dirname + '/../public/json/party_data.json', jsonParty, err => {
    if (err) {
      console.log('Error writing file', err)
    } else {
      console.log('Successfully wrote file')
    }
  })

  res.redirect('/search/' + party_id.toString())
});

module.exports = router;
