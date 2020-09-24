var express = require('express');
const fs = require('fs');

var router = express.Router();
const data = JSON.parse(fs.readFileSync('books.json'));
/* GET all books listing. */
router.get('/', function (req, res, next) {
  if (req.query.title) {
    const item = data.books.find(b => b.title === req.query.title);
    res.send(item);
  }
  else {
    res.send(data['books']);
  }
});

/* add express validator and error handler */
/* update stock, show error if the book does not exist or the stock is lower, update total books are sold and sum */
router.post('/sell', function (req, res, next) {
  const title = req.body.title;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const item = data.books.find(b => b.title === req.query.title);
  if (item && item.quantity >= quantity) {
    item.price = price;
    res.send(`sold ${req.body.quantity} ${req.body.title}`);
    console.log(`sold ${req.body.quantity} ${req.body.title}`);
  }
  else {
    res.send(`${title} was not found or the stock is too low. The transaction failed.`)
  }
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', function (req, res, next) {
  console.log(`added ${req.body.quantity} ${req.body.title} to the stock`);
  res.send(`added ${req.body.quantity} ${req.body.title} to the stock`);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', function (req, res, next) {
  const title = req.body.title;
  const price = req.body.price;
  const item = data.books.find(b => b.title === req.query.title);
  if (item) {
    item.price = price;
    res.send(book);
  }
  else {
    res.send(`${title} was not found. No price update was made for the request.`)
  }
});

module.exports = router;
