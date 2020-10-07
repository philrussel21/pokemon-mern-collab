const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Define Pokemon schema
const Pokemon = new Schema({
  name: {
    type: String,
    required: true,
  },
  create_date: {
    type: Date,
    required: true
  },
  modified_date: {
    type: Date,
    required: true
  }
})

module.exports = mongoose.model('Pokemon', Pokemon)