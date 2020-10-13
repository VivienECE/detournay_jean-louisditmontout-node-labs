
const {v4: uuid} = require('uuid') //utilisation de la syntaxe https://codeburst.io/es6-destructuring-the-complete-guide-7f842d08b98f
const {clone, merge} = require('mixme') //pareil. Ces fonctions permettes de d'éviter des problèmes de pointeurs...
//Création d'une "base de données" fake
/*const store =  {
  channels: {
  },
  users:{
  },
  messages:{
  }
}*/
//Lignes à décommenter ici permettant d'utiliser level
const level = require('level')
const db = level(__dirname + '/../db')

module.exports = {
  channels: {
    create: async (channel) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
      if(!channel.name) throw Error('Invalid channel')
      const id = uuid()
      await db.put(`channels:${id}`, JSON.stringify(channel))
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
          channel.id = key
          channels.push(channel)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(channels)
        })
      })
    },
    update: (id, channel) => {
      db.put({
        gt: "channels:",
        lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        channel = JSON.parse(value)
        channel.id = key
        channels.push(channel)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(channels)
      })
    },
    delete: (id, channel) => {
      db.del({
        gt: "channels:",
        lte: "channels" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        channel = JSON.parse(value)
        channel.id = key
        channels.push(channel)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(channels)
      })
    }
  },
  messages: {
    create: async (message) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
      if(!message.content) throw Error('Invalid message')
      if(!message.creation) throw Error('Invalid date')
      if(!message.id_channel) throw Error('Invalid channel')
      await db.put(`messages:${message.id_channel}`, JSON.stringify(message))
      return merge(message, {id_channel: message.id_channel})
    },
    list: async () => {
        return new Promise( (resolve, reject) => {
        const messages = []
        db.createReadStream({
          gt: "messages:",
          lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          message = JSON.parse(value)
          message.id = key
          messages.push(message)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(messages)
        })
      })
    },
    update: (id, message) => {
      db.put({
        gt: "messages:",
        lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        message = JSON.parse(value)
        message.id = key
        messages.push(message)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(messages)
      })
    },
    delete: (id, message) => {
      db.del({
        gt: "messages:",
        lte: "messages" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        message = JSON.parse(value)
        message.id = key
        messages.push(message)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(messages)
      })
    }
  },
  users: {
    create: async (user) => { //Syntaxe arrow function : https://javascript.info/arrow-functions-basics
      if(!user.username) throw Error('Invalid user')
      const id = uuid()
      //store.users[id] = user
      //Ligne à décommenter en dessous pour avoir notre écriture en base de données
      //La clé en base de données seras sous la format users:randomId (genere par la fonction uuid : https://fr.wikipedia.org/wiki/Universally_unique_identifier#:~:text=Universally%20unique%20identifier%20(UUID)%2C,information%20sans%20coordination%20centrale%20importante.
      await db.put(`users:${id}`, JSON.stringify(user))
      return merge(user, {id: id})
    },
    list: async () => {
      /*//Object.keys : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Object/keys
      return Object.keys(store.users).map( (id) => {
        const user = clone(store.users[id])
        user.id = id
        return user
      })*/
      //à décommenter en dessous pour avoir notre lecture en base de données : https://github.com/Level/level#createReadStream
        return new Promise( (resolve, reject) => {
        const users = []
        db.createReadStream({
          gt: "users:",
          lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
        }).on( 'data', ({key, value}) => {
          user = JSON.parse(value)
          user.id = key
          users.push(user)
        }).on( 'error', (err) => {
          reject(err)
        }).on( 'end', () => {
          resolve(users)
        })
      })
    },
    update: (id, user) => {/*
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      store.users[id] = merge(original, user) //à transformer pour avoir une modification dans la base de données*/
      db.put({
        gt: "users:",
        lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        user = JSON.parse(value)
        user.id = key
        users.push(user)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(users)
      })
    },
    delete: (id, user) => {/*
      const original = store.users[id]
      if(!original) throw Error('Unregistered user id')
      delete store.users[id] //à transformer pour avoir une suppression en base de données : https://github.com/Level/level#del*/
      db.del({
        gt: "users:",
        lte: "users" + String.fromCharCode(":".charCodeAt(0) + 1),
      }).on( 'data', ({key, value}) => {
        user = JSON.parse(value)
        user.id = key
        users.push(user)
      }).on( 'error', (err) => {
        reject(err)
      }).on( 'end', () => {
        resolve(users)
      })
    }
  },
  admin: {
    clear: async () => {
      /*store.channels = {},
      store.users = {},
      store.messages = {}*/
      //ligne à décommenter pour effacer tous le contenu de la base de données level : https://github.com/Level/level#clear
       await db.clear()
    }
  }
}