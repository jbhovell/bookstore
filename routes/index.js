var express = require('express');

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'My Express Bookstore (EST 2020)' });
});

module.exports = router;
