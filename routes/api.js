var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

const xc3_heroes = require("../public/json/xc3_heroes.json");

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('api_index', { title: 'API' });
});

router.get('/xc3', function(req, res, next) {
  res.render('xc3_api_index', {title: 'XC3 API'});
});

router.get('/xc3/hero', function(req, res, next) {
  var heroList = [];
  for(var i = 0; i < xc3_heroes.length; i++) {
    heroList.push(xc3_heroes[i].name);
  }
  res.render('xc3_api_hero_index', {title: 'XC3 API', data:heroList});
});

router.get('/xc3/hero/:name', function(req, res, next) {

  var heroFound = false;
  var i;
  for(i = 0; i < xc3_heroes.length; i++) {
    if (xc3_heroes[i].name.toLowerCase() == req.params.name.toLowerCase()) {
      heroFound = true;
      break;
    }
  }

  if(heroFound) {
    res.render('xc3_api_hero', {title: xc3_heroes[i].name, data: xc3_heroes[i]});
  } else {
    res.send("Hero not found!");
  }
  
});

router.get('/xc3/hero/:name/json', function(req, res, next) {

  var heroFound = false;
  var i;
  for(i = 0; i < xc3_heroes.length; i++) {
    if (xc3_heroes[i].name.toLowerCase() == req.params.name.toLowerCase()) {
      heroFound = true;
      break;
    }
  }

  if(heroFound) {
    res.send(xc3_heroes[i]);
  } else {
    res.send("Hero not found!");
  }
  
});

module.exports = router;
