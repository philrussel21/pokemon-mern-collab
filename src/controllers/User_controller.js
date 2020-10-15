const User = require('../models/User_model');

function getRegister(req, res) {
  res.render('users/register')
}

async function addUser(req, res) {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    res.redirect('/')
  } catch (error) {
    console.log(error)
  }

}

function getLogin(req, res) {
  res.render('users/login', { error: req.flash('error') })
}

module.exports = {
  getRegister,
  addUser,
  getLogin
}