var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET users listing. */
router.get('/', function (req, res, next) {
  let rawdata = fs.readFileSync('books.json');
  let books = JSON.parse(rawdata);
  console.log(books);
  res.send(JSON.stringify(books, null, '\t'));
});

module.exports = router;
