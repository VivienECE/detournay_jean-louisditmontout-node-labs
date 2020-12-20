/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, { useContext, useEffect} from 'react';
import Context from './Context'
import { useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'
import Avatar from '@material-ui/core/Avatar';
import AvatarGroup from '@material-ui/lab/AvatarGroup';

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
  const {oauth, channels,
     setChannels, currentUser, fetchChannels
  } = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())
  const header = {
    headers: {
         'Authorization': `Bearer ${oauth.access_token}`
    }
  };
  useEffect( () => {
    if(currentUser)
      fetchChannels()
  }, [oauth, setChannels])

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
          <AvatarGroup max={2} style={{ float: 'right' }}>
            <Avatar>{channel.friend}</Avatar>
            <Avatar></Avatar>
            <Avatar></Avatar>
          </AvatarGroup>
          </button> 
          
        </li>
      ))}
    </ul>
  );
}

