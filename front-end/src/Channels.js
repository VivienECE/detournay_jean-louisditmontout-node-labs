/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useContext, useEffect, useState} from 'react';
import Context from './Context'
import { useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import { useScrollTrigger } from '@material-ui/core';

const useStyles = (theme) => ({
  channels: {
    minWidth: '350px',
    backgroundColor: '#f1f0ea',
    height: '100%',
    margin: 0,
    padding: 0,
    textIndent: 0,
    listStyleType: 0,
    
  },
  channel:{
    //margin: '.2rem',
    '& button':{
      backgroundColor: '#f1f0ea',
      color: '#4db6ac',
      border: 'solid rgba(255, 255, 255, .6)', 
      minWidth: '170px',
      textAlign:'left',
      fontSize:'20px',
    },
    padding: '3px',
    margin: '2px',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
    
    'list-style-type': 'none', 
  },
})

export default () => {
  const {
    oauth,
    channels, setChannels, currentUser, setCurrentUser
  } = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())

  const config = {
          headers: {
                'Authorization': `Bearer ${oauth.access_token}`
          }
        };
  const axiosdata = {
          email: oauth.email
        };
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.put('http://localhost:3001/filtredchannels', axiosdata, {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    if(currentUser)
      fetch()
  }, [oauth, setChannels])
  /*const [users, setUsers] = useState([])
  let usersOfChannel =[]
  const fetchUsers = async (channel) => {
    //setUsers([])
    const {data: users} = await axios.get(`http://localhost:3001/channels/${channel.id}/users`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    return users
  }*/
  return (
    <ul style={styles.channels}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <button
            color='secondary'
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              history.push(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </button> 
          
        </li>
      ))}
    </ul>
  );
}

