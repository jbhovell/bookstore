const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const booksRouter = require('./routes/books');
const usersRouter = require('./routes/users');

const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');

const methodOverride = require('method-override');
const errorHandler = require('errorhandler');

const favicon = require('serve-favicon');
const mongoose = require('mongoose');
const auth = require('basic-auth');
const https = require('https');
const fs = require('fs');
const helmet = require('helmet');

const swaggerFile = path.join(__dirname, 'swagger.yaml');
const swaggerDocument = YAML.load(swaggerFile);


const app = express();

app.use(helmet());

app.use(favicon(path.join(__dirname, 'public/images', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));

app.use('/ui', (req, res, next) => {
  swaggerDocument.host = req.header('x-forwarded-host');
  req.swaggerDoc = swaggerDocument;
  next();
}, swaggerUi.serve, swaggerUi.setup());

const authUserSchema = new mongoose.Schema({
  username: {type: String, index: {unique: true}},
  password: String,
  role: String,
});

const AuthUser = mongoose.model('AuthUser', authUserSchema);

const adminUser = new AuthUser({
  username: 'admin',
  password: 'admin',
  role: 'Admin',
});

app.use(function(request, response, next) {
  const user = auth(request);
  if (user === undefined) {
    console.log('User information is not available in the request ');
    response.statusCode = 401;
    response.setHeader('WWW-Authenticate', 'Basic');
    response.end('Unauthorized');
  } else {
    authenticate(user, response, next);
  }
});

function authenticate(user, response, next) {
  const result = false;
  AuthUser.findOne({
    username: user['name'], password:
      user['pass'],
  },
  function(error, data) {
    if (error) {
      console.log(error);
      response.statusCode = 401;
      response.end('Unauthorized');
    } else {
      if (!data) {
        console.log('Unknown user');
        response.statusCode = 401;
        response.end('Unauthorized');
      } else {
        console.log(data.username + ' authenticated successfully');
        next();
      }
    }
  });
}

if ('development' == app.get('env')) {
  app.use(errorHandler());
}
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/books', booksRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

app.use('/ui', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
  console.error(err);
  res.status(500).json({error: 'Internal server error'});
});

app.use((req, res) => res.status(404).json({error: 'Not found'}));
app.use((req, res) => res.status(400).json({error: 'Bad request'}));

app.set('port', process.env.PORT || 3443);

const options = {
  key:
    fs.readFileSync('./bookstore.pem'),
  cert: fs.readFileSync('./bookstore.crt'),
};

https.createServer(options, app).listen(app.get('port'));

module.exports = app;
