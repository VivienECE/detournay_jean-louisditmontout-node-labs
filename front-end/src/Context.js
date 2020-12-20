
import React, {useState} from 'react'
import { useCookies } from 'react-cookie'
import axios from 'axios';

const Context = React.createContext()

export default Context;

export const Provider = ({
  children
}) => {
  const [cookies, setCookie, removeCookie] = useCookies([])
  const [oauth, setOauth] = useState(cookies.oauth)
  const [currentUser, setCurrentUser] = useState(null)
  const [drawerVisible, setDrawerVisible] = useState(false)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState(null)
  const [users, setUsers] = useState([])
  
  
  
  async function findUser(oauth){
    setUsers([])
    const {data: users} = await axios.get('http://localhost:3001/users', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }})
    setUsers(users)
    let returnUser = oauth
    users.forEach(user => {
      if(user.email == oauth.email){
        returnUser = user
      }
    })
    setCurrentUser(returnUser)
  }
  
  return (
    <Context.Provider value={{
      oauth: oauth,
      setOauth: (oauth) => {
        if(oauth){
          const payload = JSON.parse(
            Buffer.from(
              oauth.id_token.split('.')[1], 'base64'
            ).toString('utf-8')
          )
          oauth.email = payload.email
          setCookie('oauth', oauth)
          findUser(oauth)
              
        }else{
          setCurrentChannel(null)
          setChannels([])
          removeCookie('oauth')
        }
        setOauth(oauth)
      },
      channels: channels,
      drawerVisible: drawerVisible,
      setDrawerVisible: setDrawerVisible,
      setChannels: setChannels,
      currentChannel: currentChannel,
      setCurrentUser: async (oauth) => {
        const {data: users} = await axios.get('http://localhost:3001/users',{
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }})
        setUsers(users)
        let returnUser = null
        users.forEach(user => {
          if(user.email == oauth.email){
            returnUser = user
          }
        })
        setCurrentUser(returnUser)
      },
      currentUser: currentUser,
      setCurrentChannel:  (channelId) => {
        console.log('setCurrentChannel')
        const channel = channels.find( channel => channel.id === channelId)
        setCurrentChannel(channel)
      },
    }}>{children}</Context.Provider>
  )
}
