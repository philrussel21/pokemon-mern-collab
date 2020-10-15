const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User_model')

function initialize(passport) {
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        return done(null, false, { message: "Invalid Email" })
      }
      // because we encrypted the password field, we get to have the
      // veryPassword method that would compare this password to the
      // one we have in the db
      // user.verifyPassword(password)
      //   .then(isValid => {
      //     if (isValid) {
      //       return done(null, user)
      //     }
      //     return done(null, false, { message: "Invalid Password" })
      //   })
      try {
        const isValid = await user.verifyPassword(password)
        if (isValid) {
          return done(null, user)
        }
        else {
          return done(null, false, { message: "Invalid Password" })
        }
      } catch (error) {
        return done(error)
      }

    })
  }


  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = initialize