// const users = require('../controllers/user.server.controller');
//
// module.exports = function(app) {
//   app.route('/users')
//     .post(users.create)
//     .get(users.list);
//
//   app.route('/user/:userId').get(users.read)
//   .put(users.update)
//   .delete(users.delete);
//
//   app.param('userId', users.userById);
// };
//
const users = require('../../app/controllers/user.server.controller');
const passport = require('passport');

module.exports = function(app) {
  app.route('/signup')
     .get(users.renderSignup)
     .post(users.signup);

  app.route('/signin')
     .get(users.renderSignin)
     .post(passport.authenticate('local', {
       successRedirect: '/',
       failureRedirect: '/signin',
       failureFlash: true
     }));

  app.get('/signout', users.signout);

  app.get('/oauth/facebook', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }));

  app.get('/oauth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin',
    successRedirect: '/'
  }));
};
