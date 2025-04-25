var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

// index/homepage is just an entrypoint for authenticating
// but we need it as a destination in order for redirects to work
router.get('/', function(req, res, next) {
  if (!req.user) { return res.render('home'); }
  next();
}, function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/wibble', ensureLogIn('/login'), function(req, res){
  res.render('index')
})

module.exports = router