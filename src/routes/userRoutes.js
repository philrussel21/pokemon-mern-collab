const express = require('express');
const router = express.Router()
const { getRegister,
  addUser,
  getLogin,
  addLogin } = require('../controllers/User_controller')

// login page
router.get('/', getLogin)

// add log in
router.post('/login', addLogin)

// register page
router.get('/register', getRegister)

// add new user
router.post('/register', addUser)



module.exports = router