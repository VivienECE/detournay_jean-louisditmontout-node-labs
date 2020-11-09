/** @jsx jsx */

import {useState} from 'react';
import { jsx } from '@emotion/core'
import {axios} from 'axios';
import React, { Component } from 'react';

const styles = {
  channels: {
    minWidth: '200px',
    backgroundColor: 'rgba(255,255,255,.1)',
  },
  channel:{

  },
}

  	/*useEffect( () => { 
		async function fetchData () {
		const {data:channels} = await axios.get('https://localhost:3001/channels/')
		setChannels(data)
	}
	fetchData()
    }, [] )*/

export default () => {
  return (
        <div css={styles.channels}>
           <p> Available channels: </p>
        </div>
  );
}

class Channel extends React.Component{
  render() {
      return(
        <div css={styles.channels}>
        <p> Available channels: </p>
        	  <ul>
              { this.props.channels.map( (channel) => (
                <li key={channel.id} css={styles.channel}>
                	{channel.name}
                </li>
              ))}
            </ul>
        </div>
      );
  }
}

//export default Channel;




