var express = require('express');
var fetch = require('node-fetch');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new_index', { title: 'Xenobuilds' });
});

module.exports = router;
