
const supertest = require('supertest')
const app = require('../lib/env_test_app')
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
    users.should.eql([])
  })
  
  it('list one element', async () => {
    // Create a user
    await supertest(app)
    .post('/users')
    .send({email: 'user_1'})
    // Ensure we list the users correctly
    const {body: users} = await supertest(app)
    .get('/users')
    .expect(200)
    users.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      email: 'user_1'
    }])
  })
  
  it('add one element', async () => {
    // Create a user
    const {body: user} = await supertest(app)
    .post('/users')
    .send({email: 'user_1'})
    .expect(201)
    // Check its return value
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get('/users')
    users.length.should.eql(1)
  })
  
  it('get user', async () => {
    // Create a user
    const {body: user1} = await supertest(app)
    .post('/users')
    .send({email: 'user_1'})
    // Check it was correctly inserted
    const {body: user} = await supertest(app)
    .get(`/users/${user1.id}`)
    .expect(200)
    user.email.should.eql('user_1')
  })
  
    it('add user in channel', async () => {
    await supertest(app)
    .post('/users')
    .send({email: 'user_1'})
    // Ensure we list the users correctly
    const {body: user1} = await supertest(app)
    .get('/users')
    .expect(200)
    user1.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      email: 'user_1'
    }])
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: user} = await supertest(app)
    .post(`/channels/${channel.id}/users`)
    .send({email: "user_1"})
    .expect(201)
    user.should.match({
      email: 'user_1',
      id: /^\w+-\w+-\w+-\w+-\w+$/,
    })
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get(`/channels/${channel.id}/users`)
    users.length.should.eql(1)
  })
  
  it('get user in channel', async () => {
    await supertest(app)
    .post('/users')
    .send({email: 'user_1'})
    // Ensure we list the users correctly
    const {body: user1} = await supertest(app)
    .get('/users')
    .expect(200)
    user1.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      email: 'user_1'
    }])
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: user} = await supertest(app)
    .post(`/channels/${channel.id}/users`)
    .send({email: "user_1"})
    .expect(201)
    user.should.match({
      email: 'user_1',
      id: /^\w+-\w+-\w+-\w+-\w+$/,
    })
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get(`/channels/${channel.id}/users`)
    .send({email: "user_1"})
    users.length.should.eql(1)
    users.should.match([{
      email: 'user_1',
      id: /^\w+-\w+-\w+-\w+-\w+$/
    }])

  })
  
  
})
