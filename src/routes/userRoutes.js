const express = require('express');
const router = express.Router()
const passport = require('passport')
const { getRegister,
  addUser,
  getLogin,
} = require('../controllers/User_controller')

// login page
router.get('/login', getLogin)

// add log in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  // set to true first to figure out behaviour
  failureFlash: true
}))

// register page
router.get('/register', getRegister)

// add new user
router.post('/register', addUser)



module.exports = router