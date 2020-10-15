const Pokemon = require('../models/Pokemon_model');
const axios = require('axios');

function getAllPokemons() {
  return Pokemon.find()
}

function getPokemonById(req) {
  const pokeId = req.params.id
  return Pokemon.find({ pokeId: pokeId })
}

function addPokemonToDb(req) {
  return new Pokemon(req.body)
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

function getPokeData(pokeId) {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${pokeId}`)
}

module.exports = {
  getAllPokemons,
  getPokemonById,
  getPokeData,
  addPokemonToDb,
  deletePokemon,
  updatePokemon
}