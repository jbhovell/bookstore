var express = require('express');
var router = express.Router();
const fs = require('fs');

const data = fs.readFileSync('books.json');
const books = JSON.parse(data);

/* GET all books listing. */
router.get('/', function (req, res, next) {
  if (req.query.title) {
    const title = req.query.title;
    for (const item of books) {
      if (item.title === title)
        res.send(item)
    }
  }
  else {
    res.send(JSON.stringify(books, null, '\n'));
  }
});

/* update stock, show error if quantity is greater than stock, update total books are sold and sum */
router.post('/sell', function (req, res, next) {
  const title = req.query.title;
  const quantity = req.query.qunantity;

});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', function (req, res, next) {
  const book = req.query.book;
});


/* update a book's price */
router.post('/update', function (req, res, next) {
  const title = req.query.title;
  const price = req.query.price;

});

module.exports = router;
