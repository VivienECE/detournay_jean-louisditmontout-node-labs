/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import axios from 'axios';
import React, { useState, useEffect, data } from 'react';
import Link from '@material-ui/core/Link'
import { useTheme } from '@material-ui/core/styles';

const useStyles = (theme) => ({
  channels: {
    minWidth: '200px',
    backgroundColor: 'theme.palette.background',
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

export default ({
  channels,setChannel
}) => {
  const styles = useStyles(useTheme())
  return (
    <ul style={styles.channels}>
      { channels.map( (channel, i) => (
        <li key={i} css={styles.channel}  onClick={ (e) => {
          e.preventDefault()
          setChannel(channel)} }>
            <Link href="#" >
              {channel.name}
            </Link>
        </li>
      ))}
    </ul>
  );
}