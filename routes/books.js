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

/* add express validator and error handler */
/* update stock, show error if the book does not exist or the stock is lower, update total books are sold and sum */
router.post('/sell', function (req, res, next) {
  console.log(`sold ${req.body.quantity} ${req.body.title}`);
  res.send(`sold ${req.body.quantity} ${req.body.title}`);
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', function (req, res, next) {
  console.log(`added ${req.body.quantity} ${req.body.title} to the stock`);
  res.send(`added ${req.body.quantity} ${req.body.title} to the stock`);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', function (req, res, next) {
  console.log(`updated ${req.body.title} price to ${req.body.price}`);
  res.send(`updated ${req.body.title} price to ${req.body.price}`);

});

module.exports = router;
