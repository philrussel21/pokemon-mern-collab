// if on dev environment, extracts info from the env file
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const express = require('express')
// REMOVE WHEN DOING WITH REACT
const path = require('path');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')
const mongoose = require('mongoose')
// Passport components
const flash = require('express-flash');
const session = require('express-session')
const passport = require('passport');
const initPassport = require('./config/passport');

const MongoStore = require('connect-mongo')(session)
const app = express()

// require middlewares
const { checkAuthenticated } = require('./middlewares/auth');




// ROUTES
const pokeRoutes = require('./routes/pokeRoutes')
const userRoutes = require('./routes/userRoutes')

const port = process.env.PORT || 3000
// change here for when deployed
const mongoDB = 'mongodb://localhost/pokemons'

// Set three properties to avoid deprecation warnings:
mongoose.connect(mongoDB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err)
    console.log('Error connecting to database', err)
  else
    console.log('Connected to database!')
  // listen here because its successful
  // const server = app.listen(port, () => {
  //   console.log('listening on port:' + port)
  // })
})


// had to be declared outside the code block above for testing export
const server = app.listen(port, () => {
  console.log('listening on port:' + port)
})

// accessing public directory that has styelsheets and scripts
app.use(express.static('src/public'))

// REMOVE FOR REACT
// fix for rendering issues due to code being in the src dir
app.set('views', (__dirname + '/views'));
app.engine('handlebars', exphbs({
  handlebars: allowInsecurePrototypeAccess(Handlebars)
}));
app.set('view engine', 'handlebars');



app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// AUTH and PASSPORT COMPONENTS HERE
// Passport Component from config file
initPassport(passport)
app.use(session({
  secret: process.env.SECRET_SESSION,
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { expires: 600000 }
}))
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
  res.status(200).render('home')
})
app.get('/dashboard', checkAuthenticated, (req, res) => {
  console.log(req.user)
  const user = req.user
  res.status(200).render('dashboard', { user })
})

app.use('/pokemons', pokeRoutes)
app.use('/users', userRoutes)

app.use((req, res) => {
  // res.status(404).send({
  //   message: "ERROR: Page not found"
  // })
  res.status(404).render('404')
})

// //Set up default mongoose connection
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

module.exports = { app, server }