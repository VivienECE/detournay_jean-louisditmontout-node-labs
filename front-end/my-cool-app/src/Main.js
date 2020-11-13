/** @jsx jsx */
import { jsx } from '@emotion/core'
import Channels from './Channels'
import Channel from './Channel'
import React, { useState, useEffect, data, Component } from 'react';
import axios from 'axios';


const styles = {
  main: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
}

/**
export default () => {
  var idchannel = 0
  const [channels, setChannels] = useState([])
  const [messages, setMessages] = useState([])
  useEffect( ()  => {
    const getChannels = async () => {
      const response = await axios.get('http://localhost:3001/channels')
      setChannels(response.data)
    }
    getChannels()
    }, [])

    const setId = async (newChannelId) =>{
      idchannel = newChannelId
        const response = await axios.get('http://localhost:3001/channels/'+newChannelId+'/messages')
        .then((response) =>{
          setMessages(response.data)
        });
    }

  const addMessage = (message) => {
    setMessages([
      ...messages,
      message
    ])
    axios.post('http://localhost:3001/channels/'+idchannel+'/messages', message)
 }
  return(
    <main className="App-main" css={styles.main}>
    <Channels channels= {channels} setId={setId}/>
    <Channel messages = {messages} addMessage = {addMessage}/>
    </main>
  );
}**/


class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      channels: [],
      messages: [],
      idchannel: 'null',
    }
  }

  async componentDidMount() {
    //fetch('http://localhost:3001/channels')
    fetch('http://192.168.16.128:3001/channels')
      .then(response => response.json())
      .then((data) =>{
        this.setState({
          channels: data.map(channel => ({
            name: channel.name,
            id: channel.id,
          }))
        })
      });
  }

  setId = (newChannelId) =>{
    this.setState(state => ({ idchannel: newChannelId}));
      //axios.get('http://localhost:3001/channels/'+newChannelId+'/messages')
      axios.get('http://192.168.16.128:3001/channels/'+newChannelId+'/messages')
      .then((response) =>{
        //this.setState({messages:response.data})
        this.setState({
          messages: response.data.map(message => ({
            author: message.author,
            content: message.content,
            creation: Number(message.creation),
            channelId: message.channelId,
            }))
        })
      });
  }

  addMessage = (message) => {
    /**this.setState({
      messages: [
          ...this.state.messages,
          message
      ]
    })**/
    //fetch('http://localhost:3001/channels/'+this.state.idchannel+'/messages', {
    fetch('http://192.168.16.128:3001/channels/'+this.state.idchannel+'/messages', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        from: 'PostMessage',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(message),
      })
      .then(response => response.json())
    this.setId(this.state.idchannel)
 }

  render() {
      return(

        <main className="App-main" css={styles.main}>
          <Channels channels= {this.state.channels} setId={this.setId}/>
          <Channel messages = {this.state.messages} addMessage = {this.addMessage}/>
        </main>
      );
  }
}

export default Main;
