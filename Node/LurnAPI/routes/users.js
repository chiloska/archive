var express = require('express');
var router = express.Router();
var user = require('../models/users');
var jwt = require('jsonwebtoken');
var passport = require('passport');

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/:email', passport.authenticate('jwt', { session: false }), function (req, res, next) {

  user.findUserByEmail(req.params.email, function (err, emailUser) {
    if (err) {
      res.json({ success: false, message: err })
    }

    if (emailUser == null) {
      res.json({ success: false, message: emailUser })
    }
    else {
      res.json({ success: true, data: emailUser })
    }
  });
})

router.post('/create', function (req, res, next) {
  if (!req.body.email && !req.body.password) {
    res.json({ success: false, message: 'Please provide User and Password' })
  }

  var newUser = {
    email: req.body.email,
    password: req.body.password
  }

  user.createUser(newUser, function (err, user) {
    if (err) {
      res.json({ success: false, message: err })
    }
    res.json({ success: true, message: 'User Created', data: user })
  })


})

router.post('/login', function (req, res, next) {
  if (!req.body.email && !req.body.password) {
    res.json({ success: false, message: 'Please provide User and Password' })
  }

  var newUser = {
    email: req.body.email,
    password: req.body.password
  }

  user.login(newUser, function (err, u) {
    console.log(u);

    if (u != null) {
      var token = jwt.sign(u, process.env.SECRET, { expiresIn: 10080 });
      res.json({ success: true, token: 'bearer ' + token });
    }
    else {
      res.json({ success: false, message: 'Authentication failed. Please verify email or password.' })
    }
  })

})


module.exports = router;
