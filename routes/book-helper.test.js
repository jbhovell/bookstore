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
    it('add a book', () => {
        add('emma', 50, 1, '', data)
        expect(find('emma', data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 7.85, "quantity": 8656, "title": "Emma", "year_published": "1815" });
    });

    it('update a book\'s price', () => {
        expect(update('emma', 9.90, data)).toEqual({ "author": "Jane Austen", "lowercase_title": "emma", "price": 9.90, "quantity": 8656, "title": "Emma", "year_published": "1815" });
    });

});