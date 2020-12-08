/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useContext, useState, useEffect, data } from 'react';
import Context from './Context'
import Link from '@material-ui/core/Link'
import { useTheme } from '@material-ui/core/styles';
import {useHistory} from 'react-router-dom'

const useStyles = (theme) => ({
  channels: {
    minWidth: '300px',
    backgroundColor: '#f1f0ea',
    height: '100%',
    margin: 0,
    padding: 0,
    textIndent: 0,
    listStyleType: 0,
  },
  channel:{
    margin: '.2rem',
    padding: '.2rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
    'list-style-type': 'none', 
  },
})

export default () => {
  const {
    oauth,
    channels, setChannels
  } = useContext(Context)
  const history = useHistory();
  const styles = useStyles(useTheme())
  useEffect( () => {
    const fetch = async () => {
      try{
        const {data: channels} = await axios.get('http://localhost:3001/channels', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
        setChannels(channels)
      }catch(err){
        console.error(err)
      }
    }
    fetch()
  }, [oauth, setChannels])
  return (
    <ul style={styles.channels}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}>
          <Link
            href={`/channels/${channel.id}`}
            onClick={ (e) => {
              e.preventDefault()
              history.push(`/channels/${channel.id}`)
            }}
          >
            {channel.name}
          </Link>
        </li>
      ))}
    </ul>
  );
}

