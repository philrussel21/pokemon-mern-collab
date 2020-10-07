const Pokemon = require('../models/Pokemon_model');

function getAllPokemons() {
  return Pokemon.find()
}

function getPokemonById(req) {
  const pokeId = req.params.id
  return Pokemon.find({ pokeId: pokeId })
}

function addPokemonToDb(req) {
  const pokeData = req.body

  const newPokemon = {}
  newPokemon.name = pokeData.name
  newPokemon.pokeId = pokeData.id
  newPokemon.pokeImg = pokeData.sprites.front_default

  return new Pokemon(newPokemon)
}

function deletePokemon(req) {
  const pokeId = req.params.id

  return Pokemon.findOneAndDelete({ pokeId: pokeId })
}

function updatePokemon(req) {
  const pokeId = req.params.id
  const updatedInfo = req.body

  return Pokemon.findOneAndUpdate({ pokeId: pokeId }, updatedInfo, { new: true })
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  addPokemonToDb,
  deletePokemon,
  updatePokemon
}