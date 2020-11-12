/** @jsx jsx */

import { jsx } from '@emotion/core'
import axios from 'axios';
import React, { useState, useEffect, data } from 'react';

const styles = {
  channels: {
    flex: '1 1 auto',
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

/**
export default () => {
  const [channels, setChannels] = useState([])
  useEffect( ()  => {
    const getChannels = async () => {
      const response = await axios.get('http://localhost:3001/channels')
      setChannels(response.data)
    }
    getChannels()
    }, [])

  const changeId = (newChannelId) => {
      this.idchannel = newChannelId
    }

  return (
    <div css={styles.channels}>
      <p> Available channels: </p>
      <ul>
        {channels.map( (channel) => (
          <li onClick={() => changeId(channel.id)} key={channel.id} css={styles.channel}>
            {channel.name}
          </li>
        ))}
      </ul>
  </div>
);
}**/
/**
const Channels = ({
  setId
  }) => {
  const onSubmit = (e) => {
    e.preventDefault()
    const data = new FormData(e.target)
    setId(2)
    e.target.elements.content.value = ''
  }
  return (
    <form css={styles.form}  onSubmit={setId(5)}>
      <input type="input" name="content" css={styles.content} />
      <input type="submit" value="Send" css={styles.send} />
    </form>
  )
}

  export default Channels;**/



class Channel extends React.Component{
/**constructor(props){
  super(props);
  this.state = {
    channels: []
  }
}

  componentDidMount() {
    fetch('http://localhost:3001/channels')
      .then(response => response.json())
      .then((data) =>{
        this.setState({
          channels: data.map(channel => ({
            name: channel.name,
            id: channel.id,
          }))
        })
      });
  }**/


  render() {
      return(
        <div css={styles.channels}>
          <p> Available channels: </p>
          <ul>
            {this.props.channels.map( (channel) => (
              <li onClick={e => this.props.setId(channel.id)} key={channel.id} css={styles.channel}>
                {channel.name}
              </li>
            ))}
          </ul>
        </div>

      );
  }
}

export default Channel;
