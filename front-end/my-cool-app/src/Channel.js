/** @jsx jsx */
import { jsx } from '@emotion/core'
import Messages from './Messages'
import MessageSend from './MessageSend'
import React, { useState, useEffect, data } from 'react';
import axios from 'axios';

const styles = {
  channel: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  header:{
    backgroundColor: 'rgba(255,255,255,.1)',
    borderRightStyle: 'inset',
    textAlign: 'center',
  }
}

/**
export default ({
  channel = {
    name: 'Fake channel',
    id: '641d5ecc-6aa2-42f8-abfd-61ab7c483e24',
  }
}) => {
  const [messages, setMessages] = useState([])
  useEffect( ()  => {
    const getMessages = async () => {
      const response = await axios.get('http://localhost:3001/channels/'+channel.id+'/messages')
      setMessages(response.data)
    }
    getMessages()
    }, [])

  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
  }

  return (
      <div css={styles.channel}>
        <div css={styles.header}>
            <h2>    Messages for {channel.name}</h2>
        </div>
        <Messages channel={channel} messages={messages}/>
        <MessageSend addMessage={addMessage}/>
      </div>
  );
}**/


class Main extends React.Component{
  /*constructor(props){
    super(props);
    this.state = {
      messages: [],
      id : 0,
    }
  }

  async componentDidMount () {
    fetch('http://localhost:3001/channels/'+this.props.idchannel+'/messages')
      .then(response => response.json())
      .then((data) =>{
        this.setState({
          messages: data.map(message => ({
            author: message.author,
            content: message.content,
            creation:message.creation,
            channelId: message.channelId,
          }))
        })
      });
  }*/

  addMessage (message){
    this.state.messages = message
  }

  render() {
    return (
        <div css={styles.channel}>
          <div css={styles.header}>
              <h2>    Messages for </h2>
          </div>
          <Messages  messages={this.props.messages}/>
          <MessageSend addMessage={this.props.addMessage}/>
        </div>
    );
  }
}

export default Main;
