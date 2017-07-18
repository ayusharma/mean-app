module.exports = {
  sessionSecret: 'developmentSessionSecret',
  db: 'mongodb://localhost/mean-book',
  facebook: {
    clientID: '<client-id-here>',
    clientSecret: '<client-secret-here>',
    callbackURL: 'http://localhost:3000/oauth/facebook/callback'
  }
}
