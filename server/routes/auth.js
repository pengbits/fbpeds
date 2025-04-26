var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var crypto = require('crypto');
var User = require('../models/User')
var {Buffer} = require('node:buffer')

/* Configure password authentication strategy.
 *
 * The `LocalStrategy` authenticates users by verifying a username and password.
 * The strategy parses the username and password from the request and calls the
 * `verify` function.
 *
 * The `verify` function queries the database for the user record and verifies
 * the password by hashing the password supplied by the user and comparing it to
 * the hashed password stored in the database.  If the comparison succeeds, the
 * user is authenticated; otherwise, not.
 */
passport.use(new LocalStrategy(function verify(username, password, cb) {
  User.findByUsername(username)
    .then(rows => {
      const [row] = rows
      if (!row) { 
        return cb(null, false, { message: 'Incorrect username or password.' }); 
      }
      console.log(`found user ${username} in db`)
      return row
    })
    .then(row => {
      crypto.pbkdf2(password, row.salt, 310000, 32, 'sha256', function(err, hashedPassword) {
        if (err) { return cb(err); }
        // this is failing in all cases

        console.log(crypto.timingSafeEqual(row.hashed_password, hashedPassword))
        if (!crypto.timingSafeEqual(row.hashed_password, hashedPassword)) {
          console.log('bad password')
          return cb(null, false, { message: 'Incorrect username or password.' });
        }
        console.log('good password')
        return cb(null, row);
      });
    })
    .catch(e => {
      return cb(e);
    })
  
  
}));


passport.serializeUser(function(user, cb) {
  process.nextTick(function() {
    cb(null, { id: user.id, username: user.username });
  });
});

passport.deserializeUser(function(user, cb) {
  process.nextTick(function() {
    return cb(null, user);
  });
});


var router = express.Router();


router.get('/login', function(req, res, next) {
  res.render('login');
});

router.post('/login/password', passport.authenticate('local', {
  successReturnToOrRedirect: '/',
  failureRedirect: '/login',
  failureMessage: true
}));


router.post('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});


router.get('/signup', function(req, res, next) {
  res.render('signup');
});


router.post('/signup', function(req, res, next) {
  var salt = crypto.randomBytes(16);
  crypto.pbkdf2(req.body.password, salt, 310000, 32, 'sha256', function(err, hashedPassword) {
    if (err) { return next(err); }
    User.create({
      username: req.body.username,
      hashedPassword,
      salt
    }).then(([row]) => {
      console.log('inserted user', row)
      var user = {
        id: row.id,
        username: row.username
      };
      req.login(user, function(err) {
        if (err) { return next(err); }
        res.redirect('/');
      });
    }).catch(error => {
      return next(error) 
    })
  });
});

module.exports = router;
