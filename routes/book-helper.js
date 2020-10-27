const fs = require('fs');

const find = (title, data) => data.books.find((b) => b.lowercase_title === title.toLowerCase());

const sell = (title, quantity, data) => {
  const item = find(title, data);
  if (item && item.quantity >= quantity) {
    item.quantity -= quantity;
    save(data);
    return true;
  }
  return false;
};

const add = (title, quantity, price = 1, author = 'no_name', data) => {
  const item = find(title, data);
  if (item) {
    item.quantity += quantity;
  } else {
    const newItem = {title: title, lowercase_title: title.toLowerCase(), author: author, price: price, quantity: quantity};
    data.books.push(newItem);
  }
  save(data);
};

const update = (title, price, data) => {
  if (price <=0 ) {
    return false;
  }
  const item = find(title, data);
  if (item) {
    item.price = price;
    save(data);
    return item;
  }
};
const save = (data) => fs.writeFileSync('books.json', JSON.stringify(data));

module.exports = {find, sell, add, update};
