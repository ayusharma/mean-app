const express = require('express');
const morgan = require('morgan');
const comrepss = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const config = require('./config');

module.exports = function() {
  const app = express();

  // logging
  if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
  } else if (process.env.NODE_ENV === 'production') {
    app.use(comrepss());
  }

  // request parser
  app.use(bodyParser.urlencoded({extended: true }));
  app.use(bodyParser.json());

  // Extended methods PUT, DELETE
  app.use(methodOverride());

  // session
  app.use(session({
    saveUninitialized: true,
    resave: true,
    secret: config.sessionSecret
  }))

  // Templates
  app.set('views', './app/views');
  app.set('view engine', 'ejs');

  require('../app/routes/index.server.routes.js')(app);
  require('../app/routes/user.server.routes.js')(app);
  // Static server
  // Note how the express.static() middleware is placed below the call for the
  // routing file. This order matters because if it were above it, Express would
  // first try to look for HTTP request paths in the static files folder.
  // This would make the response a lot slower as it would have to wait for a
  // filesystem I/O operation.
  app.use(express.static('./public'));
  return app;
}
