const { getAllPokemons,
  getPokemonById,
  addPokemonToDb,
  deletePokemon,
  updatePokemon } = require('../utils/Pokemon_utils');


async function getPokemons(req, res) {
  try {

    const pokemons = await getAllPokemons()

    // res.status(200).send(pokemons)
    res.status(200).render('pokemons/index', { pokemons })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

async function getPokemon(req, res) {
  try {
    const pokemon = await getPokemonById(req)
    // TODO - rendering
    if (pokemon.length == 0) {
      res.status(404).send({
        message: "Pokemon not found"
      })
    } else {
      res.status(200).send(pokemon)
    }
  } catch (error) {
    res.status(404).send({
      message: "ERROR: Page not found"
    })
  }
}

async function addPokemon(req, res) {
  try {
    const newPokemon = await addPokemonToDb(req).save()

    // TODO - rendering
    res.status(201).send(newPokemon)

  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

async function removePokemon(req, res) {

  try {
    const response = await deletePokemon(req)
    res.status(204).send({
      message: "Pokemon Deleted"
    })

  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

async function changePokemon(req, res) {
  try {
    const pokemon = await updatePokemon(req)
    res.status(200).send(pokemon)
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

module.exports = {
  getPokemons,
  getPokemon,
  addPokemon,
  removePokemon,
  changePokemon
}