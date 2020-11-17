/** @jsx jsx */

import { jsx } from '@emotion/core'
import axios from 'axios';
import React, { useState, useEffect, data } from 'react';

const styles = {
  channels: {
    minWidth: '200px',
    backgroundColor: 'rgba(255,255,255,.1)',
    borderStyle: 'inset',
    height: '100%',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
  channel:{
    margin: '.2rem',
    padding: '.2rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
  },
}

class Channel extends React.Component{

  render() {
      return(
        <div css={styles.channels}>
          <p> Available channels: </p>
          <ul>
            {this.props.channels.map( (channel) => (
              <li onClick={e => this.props.setChannel(channel)} key={channel.id} css={styles.channel}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>

      );
  }
}

export default Channel;
