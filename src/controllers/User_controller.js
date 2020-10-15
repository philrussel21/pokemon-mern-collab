const User = require('../models/User_model');

function getRegister(req, res) {
  res.render('users/register')
}

async function addUser(req, res) {
  try {
    const newUser = await User.create(req.body)
    console.log(newUser)
    res.send('ADDED')
  } catch (error) {
    console.log(error)
  }

}

function getLogin(req, res) {
  res.render('users/login')
}

function addLogin(req, res) {
  console.log(req.body)
  res.send('LOGGED')
}

module.exports = {
  getRegister,
  addUser,
  getLogin,
  addLogin
}