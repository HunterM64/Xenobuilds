var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

var fs = require('fs');

const party_data = require('../public/json/party_data.json');

/* GET route */
router.get('/', async function(req, res, next) {
  let jsonBlocksH;
  let jsonBlocksC
  try {
    var response1 = await fetch('https://hunterm64.github.io/data/xc3HeroList.json')
    jsonBlocksH = await response1.json();
    var response2 = await fetch('https://hunterm64.github.io/data/xc3Class.json')
    jsonBlocksC = await response2.json()
  } catch (e) {
    console.error(e)
  }
  res.render('xc3', {title: 'XC3', heroes:jsonBlocksH, classes:jsonBlocksC});
});

/* POST route */
router.post('/', function(req, res, next) {
  var party_id = party_data[party_data.length-1].id + 1

  const party = {
    id: party_id,
    name: req.body.partyName,
    noah: {
      class: req.body.noahClass,
      classArts: [req.body.noahClassArtOne, req.body.noahClassArtTwo, req.body.noahClassArtThree],
      masterArts: [req.body.noahMasterArtOne, req.body.noahMasterArtTwo, req.body.noahMasterArtThree],
      talentArt: req.body.noahTalentArt,
      masterSkills: [req.body.noahMasterSkillOne, req.body.noahMasterSkillTwo, req.body.noahMasterSkillThree],
      accessories: [req.body.noahAccessoryOne, req.body.noahAccessoryTwo, req.body.noahAccessoryThree],
      gems: [req.body.noahGemOne, req.body.noahGemTwo, req.body.noahGemThree]
    },
    mio: {
      class: req.body.mioClass,
      classArts: [req.body.mioClassArtOne, req.body.mioClassArtTwo, req.body.mioClassArtThree],
      masterArts: [req.body.mioMasterArtOne, req.body.mioMasterArtTwo, req.body.mioMasterArtThree],
      talentArt: req.body.mioTalentArt,
      masterSkills: [req.body.mioMasterSkillOne, req.body.mioMasterSkillTwo, req.body.mioMasterSkillThree],
      accessories: [req.body.mioAccessoryOne, req.body.mioAccessoryTwo, req.body.mioAccessoryThree],
      gems: [req.body.mioGemOne, req.body.mioGemTwo, req.body.mioGemThree]
    },
    eunie: {
      class: req.body.eunieClass,
      classArts: [req.body.eunieClassArtOne, req.body.eunieClassArtTwo, req.body.eunieClassArtThree],
      masterArts: [req.body.eunieMasterArtOne, req.body.eunieMasterArtTwo, req.body.eunieMasterArtThree],
      talentArt: req.body.eunieTalentArt,
      masterSkills: [req.body.eunieMasterSkillOne, req.body.eunieMasterSkillTwo, req.body.eunieMasterSkillThree],
      accessories: [req.body.eunieAccessoryOne, req.body.eunieAccessoryTwo, req.body.eunieAccessoryThree],
      gems: [req.body.eunieGemOne, req.body.eunieGemTwo, req.body.eunieGemThree]
    },
    taion: {
      class: req.body.taionClass,
      classArts: [req.body.taionClassArtOne, req.body.taionClassArtTwo, req.body.taionClassArtThree],
      masterArts: [req.body.taionMasterArtOne, req.body.taionMasterArtTwo, req.body.taionMasterArtThree],
      talentArt: req.body.taionTalentArt,
      masterSkills: [req.body.taionMasterSkillOne, req.body.taionMasterSkillTwo, req.body.taionMasterSkillThree],
      accessories: [req.body.taionAccessoryOne, req.body.taionAccessoryTwo, req.body.taionAccessoryThree],
      gems: [req.body.taionGemOne, req.body.taionGemTwo, req.body.taionGemThree]
    },
    lanz: {
      class: req.body.lanzClass,
      classArts: [req.body.lanzClassArtOne, req.body.lanzClassArtTwo, req.body.lanzClassArtThree],
      masterArts: [req.body.lanzMasterArtOne, req.body.lanzMasterArtTwo, req.body.lanzMasterArtThree],
      talentArt: req.body.lanzTalentArt,
      masterSkills: [req.body.lanzMasterSkillOne, req.body.lanzMasterSkillTwo, req.body.lanzMasterSkillThree],
      accessories: [req.body.lanzAccessoryOne, req.body.lanzAccessoryTwo, req.body.lanzAccessoryThree],
      gems: [req.body.lanzGemOne, req.body.lanzGemTwo, req.body.lanzGemThree]
    },
    sena: {
      class: req.body.senaClass,
      classArts: [req.body.senaClassArtOne, req.body.senaClassArtTwo, req.body.senaClassArtThree],
      masterArts: [req.body.senaMasterArtOne, req.body.senaMasterArtTwo, req.body.senaMasterArtThree],
      talentArt: req.body.senaTalentArt,
      masterSkills: [req.body.senaMasterSkillOne, req.body.senaMasterSkillTwo, req.body.senaMasterSkillThree],
      accessories: [req.body.senaAccessoryOne, req.body.senaAccessoryTwo, req.body.senaAccessoryThree],
      gems: [req.body.senaGemOne, req.body.senaGemTwo, req.body.senaGemThree]
    },
    hero: {
      name: req.body.heroName,
      arts: [req.body.heroArtOne, req.body.heroArtTwo, req.body.heroArtThree],
      accessories: [req.body.heroAccessoryOne, req.body.heroAccessoryTwo, req.body.heroAccessoryThree]
    }
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

  res.redirect('/search/xc3/' + party_id.toString())
});

module.exports = router;
