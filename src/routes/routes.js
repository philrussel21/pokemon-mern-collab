const express = require('express')
const router = express.Router()
const {
  getPokemons,
  getPokemon,
  addPokemon,
  removePokemon,
  changePokemon
} = require('../controllers/Pokemons_controller')

// Returns all Pokemons
router.get('/', getPokemons)

// Returns one Pokemon with given id
router.get('/:id', getPokemon)

// Adds a new Pokemon
router.Pokemon('/', addPokemon)

// Deletes a Pokemon with given id
router.delete('/:id', removePokemon)

// Updates a Pokemon with given id
router.patch('/:id', changePokemon)

modules.exports = { router }