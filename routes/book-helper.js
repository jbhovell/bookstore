
const fs = require('fs');

const data = JSON.parse(fs.readFileSync('books.json'));

const find = title => data.books.find(b => b.lowercase_title === title.toLowerCase());

const sell = (title, quantity) => {
    const item = find(title);
    if (item && item.quantity >= quantity) {
        item.quantity -= quantity;
        save(data)
        return true;
    }
    else return false;
}

const add = (title, quantity, price=1, author='no_name') => {
    const item = find(title);
    if (item) {
        item.quantity += quantity;
    }
    else {
        const newItem = { title: title, lowercase_title: title.toLowerCase(), author: author, price: price, quantity: quantity }
        data.books.push(newItem);
    }
    save(data)
}

const save = data => fs.writeFileSync('books.json', JSON.stringify(data))

module.exports = { data, find, sell, add }