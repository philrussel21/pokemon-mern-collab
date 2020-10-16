// sets up the strategy to be used from the passport module
const LocalStrategy = require('passport-local').Strategy
const User = require('../models/User_model')

// initializes the passport model to follow this config
// messages would be stored in req.flash(message)
function initialize(passport) {
  // defining the funtion to authenticate the user below
  const authenticateUser = (email, password, done) => {
    User.findOne({ email }, async (err, user) => {
      if (err) { return done(err) }
      if (!user) {
        // done() accepts three args, first being the error (in this case null),
        // second being the user (in this case false since we didn't find it)
        // and third (optional) is what gets stored in flash
        return done(null, false, { message: "Invalid Email" })
      }
      // because we encrypted the password field, we get to have the
      // verifyPassword method that would compare this password to the
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

  // where passport is passed what strategy it is defining
  // LocalStrategy accepts optional params as args. First being an object as to
  // what corresponds to usernameField and passwordField which defaults to username and password
  // second arg is the authenticate callback
  passport.use(new LocalStrategy({
    usernameField: 'email'
  }, authenticateUser))
  // serializeUser just stores the user.id in the session rather than the whole document
  passport.serializeUser((user, done) => done(null, user.id))
  // deserializeUser retrieves the whole document from the db using the stored user.id in the session
  // this retrieved user would then be stored in req.user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user)
    })
  })
}

module.exports = initialize