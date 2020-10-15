const User = require('../models/User_model');

function getRegister(req, res) {
  res.render('users/register')
}

function addUser(req, res) {
  console.log(req.body)
  res.send('ADDED')
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