
var GitHubStrategy = require('passport-github2').Strategy;

var User = require('../models/user.model');

var githubAuth = {
  clientID: '9e4dfbdd7a65c2a41080',
  clientSecret: 'aba06d5e322b0de99510fdb34610d8e2a1a23421',
  callbackURL: 'http://localhost:8080/login/callback'
};

module.exports = function (passport) {
  passport.serializeUser(function (user, done) {
    done(null, user);
  });

  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });

  passport.use(new GitHubStrategy(githubAuth, findOrCreateUser));

  function findOrCreateUser (accessToken, refreshToken, profile, done) {
    var query = { 'github.id': profile.id };
    var updates = {
      $setOnInsert: {
        'github.username': profile.username,
        'github.publicRepos': profile._json.public_repos
      }
    };
    var options = { upsert: true, new: true };

    return User.findOneAndUpdate(query, updates, options)
      .then(function (result) {
        return done(null, result);
      })
      .catch(function (err) {
        return done(err, null);
      });
  }
};
