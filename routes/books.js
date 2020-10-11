var express = require('express');
const { check, validationResult } = require('express-validator');
const fs = require('fs');
const { data, find, sell, add } = require('./book-helper')

var router = express.Router();
/* GET all books listing. */
router.get('/', (req, res, next) => {
  const title = req.query.title;
  if (title) {
    const item = find(req.query.title);
    if (item)
      res.send(item);
    else
      res.send(`book ${title} is not in stock`);
  }
  else {
    res.send(data['books']);
  }
});

/* add error handler */
/* update stock, show error if the book does not exist or the stock is lower, update total books are sold and sum */
router.post('/sell', [
  check('title').not().isEmpty().isString().isLength({ min: 1 }).withMessage('Title must have at least one character'),
  check('quantity', 'quantity must be positive integer').optional().isInt({ gt: 0 })
], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const { title, quantity } = { title: req.body.title, quantity: req.body.quantity || 1 }
  const success = sell(title, quantity);

  if (success) {
    res.send(`sold ${quantity} ${title}`);
    console.log(`sold ${quantity} ${title}`);
  }
  else {
    res.send(`${title} was not found or the stock is too low. The transaction failed.`)
  }
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', [
  check('title').not().isEmpty().isString().isLength({ min: 1 }).withMessage('Title must have at least one character'),
  check('quantity', 'quantity must be positive integer').not().isEmpty().isInt({ gt: 0 }),
  check('price', 'price must be positive number').optional().isFloat({ gt: 0 })
], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const { title, quantity, price, author } = {
    title: req.body.title, quantity: +req.body.quantity,
    price: +req.body.price, author: req.body.author
  };

  add(title, quantity, price, author);
  console.log(`added ${quantity} ${title} to the stock`);
  res.send(`added ${quantity} ${title} to the stock`);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', [
  check('title').not().isEmpty().isString().isLength({ min: 1 }).withMessage('Title must have at least one character'),
  check('price', 'price must be positive number').not().isEmpty().isFloat({ gt: 0 })
], function (req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const title = req.body.title;
  const price = req.body.price;
  const item = find(title);
  if (item) {
    item.price = price;
    fs.writeFileSync('books.json', JSON.stringify(data))
    res.send(item);
  }
  else {
    res.send(`${title} was not found. No price update was made for the request.`)
  }
});

module.exports = router;
