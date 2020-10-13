// https://mochajs.org/
const supertest = require('supertest') //supertest : https://github.com/visionmedia/supertest
const app = require('../lib/app') //on a  besoin d'avoir nos routes pour les appeler durant les tests
const db = require('../lib/db')

describe('messages', () => {

  beforeEach( async () => {
    await db.admin.clear()
  })

  it('list empty', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([])
  })

  it('list one message', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // and a message inside it
    await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({content: 'Hello ECE'})
    .send({creation: Date.now()})
    .send({id_channel: channel.id})
    // Get messages
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    .expect(200)
    messages.should.match([{
      creation: (it) => it.should.be.approximately(Date.now(), 1000),
      content: 'Hello ECE',
      id_channel: /^\w+-\w+-\w+-\w+-\w+$/
    }])
  })

  it('add one element', async () => {
    // Create a channel
    const {body: channel} = await supertest(app)
    .post('/channels')
    .send({name: 'channel 1'})
    // Create a message inside it
    const {body: message} = await supertest(app)
    .post(`/channels/${channel.id}/messages`)
    .send({content: 'Hello ECE'})
    .send({creation: Date.now()})
    .send({id_channel: channel.id})
    .expect(201)
    message.should.match({
      creation: (it) => it.should.be.approximately(Date.now(), 1000),
      content: 'Hello ECE',
      id_channel: channel.id
    })
    // Check it was correctly inserted
    const {body: messages} = await supertest(app)
    .get(`/channels/${channel.id}/messages`)
    messages.length.should.eql(1)
  })

})