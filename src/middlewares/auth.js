function checkAuthenticated(req, res, next) {
  // .isAuthenticated is passport-given method that returns a bool
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('users/login')
  }
}

function checkNotAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/dashboard')
  }
}

module.exports = {
  checkAuthenticated,
  checkNotAuthenticated
}