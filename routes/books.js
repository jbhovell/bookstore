var express = require('express');
const fs = require('fs');

var router = express.Router();
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

/* update stock, show error if the book does not exist or the stock is lower, update total books are sold and sum */
router.post('/sell', function (req, res, next) {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', function (req, res, next) {
  console.log('Got body:', req.body);
  res.sendStatus(200);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', function (req, res, next) {
  console.log('Got body:', req.body);
  res.sendStatus(200);

});

module.exports = router;
