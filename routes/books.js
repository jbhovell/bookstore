var express = require('express');
const fs = require('fs');

var router = express.Router();
const data = JSON.parse(fs.readFileSync('books.json'));
/* GET all books listing. */
router.get('/', function (req, res, next) {
  if (req.query.title) {
    const item = findBook(req.query.title);
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
  const item = findBook(title);
  if (item && item.quantity >= quantity) {
    item.price = price;
    item.quantity -= quantity;
    fs.writeFileSync('books.json', JSON.stringify(data))
    res.send(`sold ${quantity} ${title}`);
    console.log(`sold ${quantity} ${title}`);
  }
  else {
    res.send(`${title} was not found or the stock is too low. The transaction failed.`)
  }
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', function (req, res, next) {
  const title = req.body.title;
  const quantity = req.body.quantity;
  const item = findBook(title);
  if (item) {
    item.quantity += quantity;
    fs.writeFileSync('books.json', JSON.stringify(data))
  }
  else {
    const price = req.body.price;
    const author = req.body.author;
    const newItem = { title: title, lowercase_title: title.toLowerCase(), author: author, price: price, quantity: quantity }
    data.books.push(newItem);
    fs.writeFileSync('books.json', JSON.stringify(data))
  }
  console.log(`added ${quantity} ${title} to the stock`);
  res.send(`added ${quantity} ${title} to the stock`);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', function (req, res, next) {
  const title = req.body.title;
  const price = req.body.price;
  const item = findBook(title);
  if (item) {
    item.price = price;
    fs.writeFileSync('books.json', JSON.stringify(data))
    res.send(item);
  }
  else {
    res.send(`${title} was not found. No price update was made for the request.`)
  }
});

const findBook = title => data.books.find(b => b.lowercase_title === title.toLowerCase());

module.exports = router;
