# bookstore
Hello! <img src="public/images/wave.gif" width="30px">  Welcome to my bookstore repo.

I built the Rest API with Node.js, Express, Pug, Swagger and SQLite. It lists, adds, sells books and updates books price.

It is running on Heroku.

* https://jbh-express-bookstore.herokuapp.com/
* https://jbh-express-bookstore.herokuapp.com/books
* https://jbh-express-bookstore.herokuapp.com/ui/

The features are accessible via curl commands, any Rest Client or Swagger UI (the UI link above).

# rquests to the API

### List all books:

`curl -X GET -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books'`

### Search a book by title:
`curl -X GET -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books?title=emma'`

### Sell a book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/sell' --data '{"title": "emma", "quantity": 2}'`

### Add a book
#### a existing book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/add' --data '{"title": "emma", "quantity": 10}'
#### a new book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/add' --data '{"title": "my new book", "author": "someone", "price": 5.95, "quantity": 20}'`

### Update a book's price
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/update' --data '{"title": "emma", "price":25.00}`


# run locally

To run it locally,
```
npm start
http://localhost:3000/
http://localhost:3000/books
http://localhost:3000/ui
```

# to do

- [ ] error handling
- [ ] authentication, roles permissions of view and edit
- [ ] react
- [ ] docker
- [ ] nginx

![](https://img.shields.io/badge/<Node.js>-<Swagger>-informational?style=flat&logo=<LOGO_NAME>&logoColor=white&color=2bbc8a)
