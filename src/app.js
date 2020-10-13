const express = require('express')
// REMOVE WHEN DOING WITH REACT
const path = require('path');
const exphbs = require('express-handlebars');
const app = express()
const mongoose = require('mongoose')
const pokeRoutes = require('./routes/pokeRoutes')

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

// REMOVE FOR REACT
app.set('views', (__dirname + '/views'));
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// had to be declared outside the code block above for testing export
const server = app.listen(port, () => {
  console.log('listening on port:' + port)
})



app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// // use means its a middle ware
// app.use((req, res, next) => {
//   console.log('Middle-ware running.')
//   next()
// })




app.get('/', (req, res) => {
  res.status(200).render('home')
})

app.use('/pokemons', pokeRoutes)

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