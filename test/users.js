// https://mochajs.org/
const supertest = require('supertest') //supertest : https://github.com/visionmedia/supertest
const app = require('../lib/app') //on a  besoin d'avoir nos routes pour les appeler durant les tests
const db = require('../lib/db')

describe('users', () => {

  beforeEach( async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Return an empty user list by default
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([])
  })

  it('list one element', async () => {
    // Create a user
    await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    // Ensure we list the users correctly
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([{
      //id: /^\w+-\w+-\w+-\w+-\w+$/,
      id: /^users:\w+-\w+-\w+-\w+-\w+$/,
      username: 'user_1'
    }])
  })

  it('add one element', async () => {
    // Create a user
    const {body: user} = await supertest(app)
    .post('/users')
    .send({username: 'user_1'})
    .expect(201)
    // Check its return value
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })

})
