const express = require('express');
const router = express.Router()
const passport = require('passport')
const { getRegister,
  addUser,
  getLogin,
} = require('../controllers/User_controller')

// require middleware
const { checkNotAuthenticated, checkAuthenticated } = require('../middlewares/auth')

// login page
router.get('/login', checkNotAuthenticated, getLogin)

// add log in
router.post('/login', passport.authenticate('local', {
  successRedirect: '/dashboard',
  failureRedirect: '/users/login',
  // set to true first to figure out behaviour
  failureFlash: true
}))

// register page
router.get('/register', checkNotAuthenticated, getRegister)

// add new user
router.post('/register', addUser)

// logout
router.get('/logout', checkAuthenticated, (req, res) => {
  req.logout()
  req.flash('message', "Successfully Logged out!")
  res.redirect('/')
})



module.exports = router