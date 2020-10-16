const { getAllPokemons,
  getPokemonById,
  getPokeData,
  addPokemonToDb,
  deletePokemon,
  updatePokemon } = require('../utils/Pokemon_utils');


async function getPokemons(req, res) {
  try {
    const pokemons = await getAllPokemons()
    res.status(200).render('pokemons/index', { pokemons })
  } catch (error) {
    res.status(500).send({
      error
    })
  }
}

async function getPokemon(req, res) {
  try {
    let pokemonDb = await getPokemonById(req)
    // TODO - rendering
    if (pokemonDb.length == 0) {
      res.status(404).render('pokemons/404poke', {
        message: "Pokemon not found"
      })
    } else {
      const { data: pokemonAPI } = await getPokeData(pokemonDb[0].pokeId)
      res.status(200).render('pokemons/show', { pokemonDb, pokemonAPI })
    }
  } catch (error) {
    console.log(error)
    res.status(404).render('pokemons/404poke', {
      message: "ERROR: Page not found"
    })
  }
}

async function addPokemon(req, res) {
  try {
    const newPokemon = await addPokemonToDb(req).save()
    // TODO - rendering
    res.status(201).send({ newPokemon, redirectUrl: '/pokemons/' })
    // res.status(201).redirect('/pokemons/')


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