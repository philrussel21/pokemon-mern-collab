const express = require('express')
const app = express()
const mongoose = require('mongoose')
const router = require('./routes/routes')

const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// use means its a middle ware
app.use((req, res, next) => {
  console.log('Middle-ware running.')
  next()
})

app.use('/', router)

app.get('/', (req, res) => {
  res.send('Hello World!')
})

const dbConnection = 'mongodb://localhost:' + port + '/'
// Set three properties to avoid deprecation warnings:
mongoose.connect(dbConnection, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}, (err) => {
  if (err)
    console.log('Error connecting to database', err)
  else
    console.log('Connected to database!')
  // listen here because its successful
  const server = app.listen(port, () => {
    console.log('listening on port:' + port)
  })
})
