var express = require('express');
var router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('books.json');
const books = JSON.parse(data);

/* GET all books listing. */
router.get('/', function (req, res, next) {
  res.send(JSON.stringify(books, null, '\n'));
});

router.get('/search', function (req, res, next) {
  const title = req.query.title;
  for (const item of books) {
    if (item.title === title)
      res.send(item)
  }
});

module.exports = router;
