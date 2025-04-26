var express = require('express');
var router = express.Router();
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;


router.get('/portal', ensureLogIn(), function(req, res, next) {
  if (!req.user) { return res.render('home'); }
  next();
}, function(req, res) {
  res.render('index', { user: req.user });
});

router.get('/user', function(req, res, next) {
  if (!req.user) { 
    res.json({user:null})
  }
  next();
}, function(req, res) {
    res.json({user:req.user})
});

router.get('/logout-user', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.json({user:null})
  });
});



module.exports = router