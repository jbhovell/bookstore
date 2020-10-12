const fs = require('fs');
const { find, sell, add, update } = require('./book-helper')

const data = JSON.parse(fs.readFileSync('test/test.json'));
describe('book operations', () => {
    it('find a book by title', () => {
        expect(find('emma', data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 7.85, "quantity": 8616, "title": "Emma", "year_published": "1815" });
        expect(find('sth', data)).toBeUndefined()
    });
    it('sell a book', () => {
        expect(sell('emma', 10, data)).toBe(true)
        expect(find('emma', data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 7.85, "quantity": 8606, "title": "Emma", "year_published": "1815" });
    });

    it(' can not sell a book if the quantity is greater than the stock', () => {
        expect(sell('emma', 100000, data)).toBe(false)
    });
    it(' can not sell a book if the book is not in the stock', () => {
        expect(sell('something', 1, data)).toBe(false)
    });
    it('add an exisitng book to the stock', () => {
        add('emma', 50, 1, '', data)
        expect(find('emma', data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 7.85, "quantity": 8656, "title": "Emma", "year_published": "1815" });
    });
    it('add a new book to the stock', () => {
        add('new-title', 10, 1.99, 'author', data)
        expect(find('new-title', data)).toEqual({ "author": "author", "lowercase_title": "new-title", "price": 1.99, "quantity": 10, "title": "new-title" });
    });
    it('update a book\'s price', () => {
        expect(update('emma', 9.90, data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 9.90, "quantity": 8656, "title": "Emma", "year_published": "1815" });
    });

    it('can not update a book\'s price if the price is not positive', () => {
        expect(update('emma', -1, data)).toBe(false);
    });

});