# bookstore
Hi! <img src="public/images/wave.gif" width="30px">  Welcome to my bookstore repo.

I built the REST API with Node.js, Express, Pug, Swagger and MongoDB. It lists, adds, sells books and updates books price. Some operations are only allowed to be performed by the authenticated users with the right permissions.

The application is running on Heroku.

* https://jbh-express-bookstore.herokuapp.com/
* https://jbh-express-bookstore.herokuapp.com/books
* https://jbh-express-bookstore.herokuapp.com/ui/

The features are accessible via curl commands, any Rest Client or Swagger UI (the UI link above).

# Make requests to the API

### List all books:

`curl -X GET -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books'`

### Search a book by title:
`curl -X GET -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books?title=emma'`

### Sell a book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/sell' --data '{"title": "emma", "quantity": 2}'`

### Add a book
#### a existing book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/add' --data '{"title": "emma", "quantity": 10}`
#### a new book
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/add' --data '{"title": "my new book", "author": "someone", "price": 5.95, "quantity": 20}'`

### Update a book's price
`curl -X POST -k -H 'Content-Type: application/json' -i 'https://jbh-express-bookstore.herokuapp.com/books/update' --data '{"title": "emma", "price":25.00}`


# Run the app locally

To run it locally,
```
npm start
http://localhost:3000/
http://localhost:3000/books
http://localhost:3000/ui
```

# To do

- [ ] express-paginate
- [ ] redirect to v2 (302 found)
- [ ] express-cache-control middleware to set cache-control max-age
- [ ] test error cases, exceptions
- [ ] Jest
- [ ] Cucumber tests
- [ ] convert book-helper find & save to asynchronous 
- [ ] MongoDB Mongoose for Node.js for book lists
- [ ] restructure files folders 
- [ ] error handling
- [ ] authentication & Authorisation, MongoDB Mongoose  for users, node basic-auth/passport with a third party auth (google/facebook/github)
- [ ] self generated cert/key, https://localhost:3443
- [ ] react
- [ ] docker
- [ ] nginx

![](https://img.shields.io/badge/<Node.js>-<Swagger>-informational?style=flat&logo=<LOGO_NAME>&logoColor=white&color=2bbc8a)
