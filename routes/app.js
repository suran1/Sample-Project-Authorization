var isLoggedIn = require ('../middleware/is-logged-in.mw');

module.exports = function (passport) {


var router = require('express').Router();

router.get('/', function (req, res) {
  res.status(200).sendFile(process.cwd()+ '/assets/index.html');
});
router.get('/login', passport.authenticate('github', { scope: ['user:email']}));

router.get(
  '/login/callback',
  passport.authenticate('gihub', { failureRedirect: '/'}),
  function (req, res) {
    res.redirect('/secrets');
  });
  router.get('/secrets', function (req, res) {
    res.status(200).sendFile(process.cwd() + '/assets/secrets');

  });

  router.get('/lohout', function (req, res) {
    req.logout();
    req.redirect('/');

  });

 return router;
};
