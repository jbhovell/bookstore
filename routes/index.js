const express = require('express');

const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {title: 'JBH Express Bookstore (Est. 2020)'});
});

module.exports = router;
