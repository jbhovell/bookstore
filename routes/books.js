const express = require('express');
const fs = require('fs');
const {check, validationResult} = require('express-validator');
const {find, sell, add, update} = require('./book-helper');
const CacheControl = require('express-cache-control');
const cache = new CacheControl().middleware;

const router = express.Router();
const data = JSON.parse(fs.readFileSync('books.json'));

/* get all books listing or search by title */
router.get('/', cache('minutes', 5), (req, res, next) => {
  const title = req.query.title;
  if (title) {
    const item = find(title, data);
    if (item) {
      res.send(item);
    } else {
      res.send(`book ${title} is not in stock`);
    }
  } else {
    res.send(data['books']);
  }
});

/* update stock, show error if the book does not exist or the stock is lower, update total books are sold and sum */
router.post('/sell', [
  check('title').not().isEmpty().isString().isLength({min: 1}).withMessage('Title must have at least one character'),
  check('quantity', 'quantity must be positive integer').optional().isInt({gt: 0}),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const {title, quantity} = {title: req.body.title, quantity: req.body.quantity || 1};
  const success = sell(title, quantity, data);

  if (success) {
    res.send(`sold ${quantity} ${title}`);
    console.log(`sold ${quantity} ${title}`);
  } else {
    res.send(`${title} was not found or the stock is too low. The transaction failed.`);
  }
});

/* if the book exists, update stock, otherwise, add a new entry */
router.post('/add', [
  check('title').not().isEmpty().isString().isLength({min: 1}).withMessage('Title must have at least one character'),
  check('quantity', 'quantity must be positive integer').not().isEmpty().isInt({gt: 0}),
  check('price', 'price must be positive number').optional().isFloat({gt: 0}),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const {title, quantity, price, author} = {
    title: req.body.title, quantity: +req.body.quantity,
    price: +req.body.price, author: req.body.author,
  };

  add(title, quantity, price, author, data);
  console.log(`added ${quantity} ${title} to the stock`);
  res.send(`added ${quantity} ${title} to the stock`);
});


/* update a book's price, show errors if the price is 0 or negative */
router.post('/update', [
  check('title').not().isEmpty().isString().isLength({min: 1}).withMessage('Title must have at least one character'),
  check('price', 'price must be positive number').not().isEmpty().isFloat({gt: 0}),
], function(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).jsonp(errors.array());
  }
  const {title, price} = {title: req.body.title, price: req.body.price};
  const item = update(title, price, data);
  if (item) {
    res.send(item);
  } else {
    res.send(`${title} was not found. No price update was made for the request.`);
  }
});

module.exports = router;
