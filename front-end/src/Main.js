/** @jsx jsx */
import { jsx } from '@emotion/core'
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import React, { useState, useEffect, data, Component } from 'react';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const styles = {
  main: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
    drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
}

const localhost = "localhost" // = "localhost"

class Main extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      channels: [],
      messages: [],
      currentChannel:null,
    }
  }

  async componentDidMount() {
    fetch('http://'+localhost+':3001/channels')
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

  //Actualise le channel lors de sa selection
  setChannel = (newChannel) =>{
    this.setState(state => ({ currentChannel: newChannel}));
      axios.get('http://'+localhost+':3001/channels/'+newChannel.id+'/messages')
      .then((response) =>{
        this.setState({messages:response.data})
      });
  }

  //Ajoute un message à la BD
  addMessage = (message) => {
    fetch('http://'+localhost+':3001/channels/'+this.state.currentChannel.id+'/messages', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        from: 'PostMessage',
        headers: { 'Content-Type': 'application/json; charset=utf-8' },
        body: JSON.stringify(message),
      })
      .then(response => response.json())
    this.setChannel(this.state.currentChannel)
 }

  render() {
      return(
        <main className="App-main" css={styles.main}>
           <Drawer
            PaperProps={{ style: { position: 'relative' } }}
            BackdropProps={{ style: { position: 'relative' } }}
            ModalProps={{
              style: { position: 'relative' }
            }}
            variant="persistent"
            open={this.props.isDrawerVisible}
            css={[styles.drawer, this.props.isDrawerVisible && styles.drawerVisible]}
          >
            <Channels channels= {this.state.channels} setChannel={this.setChannel}/>
          </Drawer>
          {this.state.currentChannel ? <Channel messages = {this.state.messages} addMessage = {this.addMessage} channel={this.state.currentChannel}/> : <Welcome />}
        </main>
      );
  }
}

export default Main;
