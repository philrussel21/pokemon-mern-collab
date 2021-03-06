const User = require('../models/User_model');

function getRegister(req, res) {
  // assigns the 'error' stored in the flash req.flash from passport
  // authentication to var error if there's any
  const error = req.flash('error') || null
  res.render('users/register', { error })
}

async function addUser(req, res) {
  try {
    const user = await User.findOne({ email: req.body.email })
    if (user) {
      // stores the error msg to req.flash('error')
      req.flash('error', "Email has been taken. Please try another")
      res.redirect('/users/register')
    }
    else {
      const newUser = await User.create(req.body)
      res.redirect('/')
    }

  } catch (error) {
    console.log(error)
  }

}

function getLogin(req, res) {
  const error = req.flash('error') || null
  res.render('users/login', { error })
}

async function getUserProfile(req, res) {
  try {
    const user = await User.findOne({ email: req.params.email })
    if (!user) {
      return res.render('404', { message: 'User not found' })
    }
    return res.render('users/profile', { user })
  } catch (error) {
    console.log(error)
    return res.render('500')
  }

}

module.exports = {
  getRegister,
  addUser,
  getLogin,
  getUserProfile
}