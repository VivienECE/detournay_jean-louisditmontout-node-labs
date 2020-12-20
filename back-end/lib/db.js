
const {v4: uuid} = require('uuid')
const {clone, merge} = require('mixme')
const microtime = require('microtime')
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: { //CHANNEL
    create: async (channel) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify({
        name: channel.name,
      }
        ))
      return merge(channel, {id: id})
    },
    createWithUser: async (channel,user) => {
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify({
        name: channel.name,
      }
        ))
      await db.put(`channelusers:${id}:${user.id}`, JSON.stringify(user))
      return merge(channel, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channels:${id}`)
      const channel = JSON.parse(data)
      return merge(channel, {id: id})
    },
     list: async () => {
      return new Promise( (resolve, reject) => {
        const channels = []
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    listfiltred: async (currentUser) => {
        const channels = []
        const users = []
        return new Promise( (resolve, reject) => {
        db.createReadStream({
          gt: "channels:",
          lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          channel = JSON.parse(value)
          channel.id = key.split(':')[1]
          db.createReadStream({
          gt: `channelusers:${channel.id}:`,
          lte: `channelusers:${channel.id}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          if(currentUser.email = user.email) channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {})
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
       	 resolve(channels)
        })
      })
    },
    update: async (id, channel) => {
      await db.put(`channels:${id}`, JSON.stringify({
       name: channel.name,
      }))
    },
    delete: async (id) => {
      await db.del(`channels:${id}`)
    },
  },
  messages: { //MESSAGES
    create: async (channelId, message) => {
      if(!channelId) throw Error('Invalid channel')
      if(!message.author) throw Error('Invalid message')
      if(!message.content) throw Error('Invalid message')
      creation = microtime.now()
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
      }))
      return merge(message, {channelId: channelId, creation: creation})
    },
    list: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: `messages:${channelId}:`,
          lte: `messages:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          const [, channelId, creation] = key.split(':')
          message.channelId = channelId
          message.creation = creation
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    update: async (creation, channelId, message) => {
      await db.put(`messages:${channelId}:${creation}`, JSON.stringify({
        author: message.author,
        content: message.content
    }))
    },
    delete: async (creation, channelId) => {
      await db.del(`messages:${channelId}:${creation}`)
   }
  },
  users: {//USERS
    create: async (user) => {
      if(!user.email) throw Error('Invalid email')
      const id = uuid()
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    get: async (id) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`users:${id}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    list: async () => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: async (id, user) => {
      await db.put(`users:${id}`, JSON.stringify({
        avatar: user.avatar,
        firstname: user.firstname,
        lastname: user.lastname,
        username: user.username,
        password: user.password,
        email: user.email,
        birth: user.birth
       }))
    },
    delete: async (id) => {
      await db.del(`users:${id}`)
    },
    //USERS IN CHANNEL
     channelcreate: async (channelId, user) => {
      if(!channelId) throw Error('Invalid channel')
      if(!user.email) throw Error('Invalid message')
      user.id = uuid()
      await db.put(`channelusers:${channelId}:${user.id}`, JSON.stringify(user))
      return merge(user, {channelId: channelId, userId: user.id})
    },
    channellist: async (channelId) => {
      return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: `channelusers:${channelId}:`,
          lte: `channelusers:${channelId}` + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key.split(':')[1]
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    channelget: async (channelId, userId) => {
      if(!id) throw Error('Invalid id')
      const data = await db.get(`channelusers:${channelId}:${userId}`)
      const user = JSON.parse(data)
      return merge(user, {id: id})
    },
    channelupdate: async (channelId, user) => {
      await db.put(`channelusers:${channelId}:${user.id}`, JSON.stringify(user))
    },
    channeldelete: async (channelId, userId) => {
      await db.del(`channelusers:${channelId}:${userId}`)
   }
  },
  admin: {
    clear: async () => {
      await db.clear()
    }
  }
}
