const express = require('express');
const morgan = require('morgan');
const comrepss = require('compression');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

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

  require('../app/routes/index.server.routes.js')(app);
  return app;
}
