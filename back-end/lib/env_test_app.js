
const db = require('./db')
const express = require('express')
const cors = require('cors')
const authenticator = require('./authenticator')

const app = express()
const authenticate = authenticator({
  jwks_uri: 'http://127.0.0.1:5556/dex/keys'
})

app.use(require('body-parser').json())
app.use(cors())


app.get('/', (req, res) => {
  res.send([
    '<h1>ECE DevOps Chat</h1>'
  ].join(''))
})

// Channels

app.get('/channels', async (req, res) => {
  const channels = await db.channels.list()
  res.json(channels)
})

app.get('/filtredchannels', async (req, res) => {
  const channels = await db.channels.list(req.body.email)
  res.json(channels)
})

app.post('/channels', async (req, res) => {
  const channel = await db.channels.create(req.body)
  res.status(201).json(channel)
})

app.get('/channels/:id', async (req, res) => {
  const channel = await db.channels.get(req.params.id)
  res.json(channel)
})

app.put('/channels/:id', async (req, res) => {
  const channel = await db.channels.update(req.params.id, req.body)
  res.json(channel)
})
app.delete('/channels/:id', async (req, res) => {
  await db.channels.delete(req.params.id, req.body)
  res.status(200)
})

// Messages

app.get('/channels/:id/messages', async (req, res) => {
  const messages = await db.messages.list(req.params.id)
  res.json(messages)
})

app.post('/channels/:id/messages', async (req, res) => {
  const message = await db.messages.create(req.params.id, req.body)
  res.status(201).json(message)
})

app.delete('/channels/:id/messages/:creation', async (req, res) => {
  const messages = await db.messages.delete(req.params.creation, req.params.id)
  res.status(200)
})

app.put('/channels/:id/messages/:creation', async (req, res) => {
  const message = await db.messages.update(req.params.creation, req.params.id, req.body)
  res.status(200).json(message)
})

// Users

app.get('/users', async (req, res) => {
  const users = await db.users.list()
  res.json(users)
})

app.post('/users', async (req, res) => {
  const user = await db.users.create(req.body)
  res.status(201).json(user)
})

app.get('/users/:id', async (req, res) => {
  const user = await db.users.get(req.params.id)
  res.json(user)
})

app.put('/users/:id', async (req, res) => {
  const user = await db.users.update(req.body)
  res.json(user)
})

//Users in channel
app.get('/channels/:id/users', async (req, res) => {
  const users = await db.users.channellist(req.params.id)
  res.json(users)
  console.log(users)
})


app.get('/channels/:channelId/users/:userId', async (req, res) => {
  const users = await db.users.channelget(req.params.channelId,req.params.userId)
  res.json(users)
  console.log(users)
})

app.post('/channels/:id/users', async (req, res) => {
  const user = await db.users.channelcreate(req.params.id, req.body)
  res.status(201).json(user)
})

app.delete('/channels/:id/users/:userId', async (req, res) => {
  const users = await db.users.channeldelete(req.params.id, req.params.userId)
  res.status(200)
})

app.put('/channels/:id/users/:userId', async (req, res) => {
  const user = await db.users.channelupdate(req.params.id, req.params.userId, req.body)
  res.status(200).json(user)
})



module.exports = app
