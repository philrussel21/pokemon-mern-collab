const { app, server } = require('../app.js')
const supertest = require('supertest');
const mongoose = require('mongoose');
const dbName = 'test'
const request = supertest(app)

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

  done()
})


// Handle the done() callback and force the NodeJS process to close
// as it hangs open forever when you do server-related stuff in Jest
// "afterAll" is a magic built-in Jest function that will run when
// all tests & test suites have finished running.
afterAll(async (done) => {
  // Force our server reference to close:
  await server.close();

  // Dumb hack to trick Jest into waiting a bit more before 
  // it freaks out over processes hanging open. 
  // Potentially because server.close() does not complete instantly? Not sure.
  // This has been an issue for ExpressJS & Jest devs 
  // for several years & solutions are vague.
  await new Promise(resolve => setTimeout(() => resolve(), 500));

  // closes the test database collection after all tests
  mongoose.connection.close()
  // Resolve the done() callback? Again not sure, as solutions are vague.
  done();
})

describe('App Homepage', () => {
  it('should exist', async (done) => {
    const res = await request.get('/')
    expect(res.status).toBe(200)

    done()
  });
});

