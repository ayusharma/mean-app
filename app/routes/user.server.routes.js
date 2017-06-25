const users = require('../controllers/user.server.controller');

module.exports = function(app) {
  app.route('/users')
    .post(users.create)
    .get(users.list);

  app.route('/user/:userId').get(users.read);
  app.param('userId', users.userById);
};
