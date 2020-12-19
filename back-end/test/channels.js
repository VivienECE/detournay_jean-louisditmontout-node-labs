
const supertest = require('supertest')
const app = require('../lib/app')
const db = require('../lib/db')

describe('channels', () => {
  
  beforeEach( async () => {
    await db.admin.clear()
  })
  
  describe( 'list', () => {
  
    it('list empty', async () => {
      // Return an empty channel list by default
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.eql([])
    })
    
    it('list one element', async () => {
      // Create a channel
      await supertest(app)
      .post('/channels')
      .send({name: 'channel 1'})
      // Ensure we list the channels correctly
      const {body: channels} = await supertest(app)
      .get('/channels')
      .expect(200)
      channels.should.match([{
        id: /^\w+-\w+-\w+-\w+-\w+$/,
        name: 'channel 1'
      }])
    })
    
  })
  
  it('create one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    .expect(201)
    // Check its return value
    channel.should.match({
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    })
    // Check it was correctly inserted
    const {body: channels} = await supertest(app)
    .get('/channels')
    channels.length.should.eql(1)
  })
  
  it('get channel', async () => {
    // Create a channel
    const {body: channel1} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Check it was correctly inserted
    const {body: channel} = await supertest(app)
    .get(`/channels/${channel1.id}`)
    .expect(200)
    channel.name.should.eql('channel 1')
  })
  
 it('get an user in channel', async () => {
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
    .send({email: "user_1"})
    // Create a message inside it
    const {body: user} = await supertest(app)
    .post(`/channels/${channel.id}/users`)
    .send({email: "user_1"})
    .send({id: "afdacea7-4a08-4905-8855-951f3f5f7394"})
    .expect(201)
    user.should.match({
      email: 'user_1',
      id: /^\w+-\w+-\w+-\w+-\w+$/,
    })
    // Check it was correctly inserted
    const {body: users} = await supertest(app)
    .get(`/channels/${channel.id}/users`)
    users.length.should.eql(1)
    users.should.match([{
      email: 'user_1',
      id: /^\w+-\w+-\w+-\w+-\w+$/
    }])
    
     const {body: channels} = await supertest(app)
    .get('/filtredchannels')
     .send({email: "user_1"})
    .expect(200)
    channels.should.match([{
      id: /^\w+-\w+-\w+-\w+-\w+$/,
      name: 'channel 1'
    }])
    
  })
  
})