const { app, server } = require('../app.js')
const supertest = require('supertest');
const mongoose = require('mongoose');
const dbName = 'test'
const request = supertest(app)
const Pokemon = require('../models/Pokemon_model')
const testData = require('./testData.json');

beforeAll(async (done) => {
  //closes the dev database collection before all the tests
  await mongoose.connection.close()

  // sets up a new database for testing
  const url = `mongodb://localhost/${dbName}`
  await mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  });

  // seeds the database with starting pokemons
  for (let i = 0; i < testData.length; i++) {
    const pokemon = testData[i]
    const defaultPokemon = new Pokemon(pokemon)
    await defaultPokemon.save(err => {
      if (err) {
        console.error(err)
      }
    })
  }

  done()
})


// Handle the done() callback and force the NodeJS process to close
// as it hangs open forever when you do server-related stuff in Jest
// "afterAll" is a magic built-in Jest function that will run when
// all tests & test suites have finished running.
afterAll(async (done) => {


  // Force our server reference to close:
  server.close();

  // Dumb hack to trick Jest into waiting a bit more before 
  // it freaks out over processes hanging open. 
  // Potentially because server.close() does not complete instantly? Not sure.
  // This has been an issue for ExpressJS & Jest devs 
  // for several years & solutions are vague.
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  // deletes the collection pokemons from the test database
  // TODO - uncomment below to clear collection after all tests
  await Pokemon.deleteMany({})

  // closes the test database collection after all tests
  await mongoose.connection.close()


  // Resolve the done() callback? Again not sure, as solutions are vague.
  done();
})

// HOMEPAGE

describe('App Homepage', () => {
  it('should exist', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(200)

    done()
  });
});

// POKEMON INDEX ROUTE

describe('Pokemon Index ', () => {

  it('should exist', async (done) => {
    const res = await request.get('/pokemons')
    expect(res.status).toBe(200)
    done()
  })

  it('should have all the default test data', async (done) => {
    const res = await request.get('/pokemons')
    const testPokeNames = ['bulbasaur', 'squirtle', 'charmander']
    const resPokeNames = []
    for (let i = 0; i < res.body.length; i++) {
      const pokemon = res.body[i];
      resPokeNames.push(pokemon.name)
    }
    expect(resPokeNames).toEqual(expect.arrayContaining(testPokeNames))
    done()
  });
});

// SHOW POKEMON ROUTE

describe('Show Pokemon', () => {
  const pokeId = 1

  it('should exist', async (done) => {
    const res = await request.get(`/pokemons/${pokeId}`)
    expect(res.status).toBe(200)
    done()
  });

  it('should find certain pokemon based on ID', async (done) => {
    const res = await request.get(`/pokemons/${pokeId}`)
    const expectedPokeName = 'bulbasaur'
    expect(res.body[0].name).toBe(expectedPokeName)
    done()
  });

  it('should return status 404 when no pokemon found based on ID', async (done) => {
    const res = await request.get('/pokemons/42069')
    expect(res.status).toBe(404)
    done()
  });

  it('should return status 500 when invalid pokemon ID is provided', async (done) => {
    const res = await request.get('/pokemons/69nice69')
    expect(res.status).toBe(500)
    done()
  });
});


// ADD POKEMON ROUTE

describe('Add Pokemon to Database', () => {
  it('should add a new pokemon to the database', async (done) => {
    const input = {
      name: 'pikachu',
      id: 99,
      sprites: {
        front_default: 'testurl.com'
      }
    }
    const expected = {
      name: 'pikachu',
      pokeId: 99,
      pokeImg: 'testurl.com'
    }
    const res = await request
      .post('/pokemons')
      .send(input)

    expect(res.status).toBe(201)
    expect(res.body).toEqual(expect.objectContaining(expected))
    done()
  });
});

// INVALID ROUTE