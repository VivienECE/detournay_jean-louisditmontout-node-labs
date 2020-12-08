/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import { Context } from './Context';
import React, { useContext, useHistory, useState, useEffect, data, Component } from 'react';
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

export default () => {
  const {
    oauth, channels, setChannels, currentChannel, setCurrentChannel, messages, setMessages, isDrawerVisible
  } = useContext(Context)
  const history = useHistory();
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

  //Actualise le channel lors de sa selection
  const setChannel = (newChannel) =>{
      setCurrentChannel(newChannel)
      axios.get('http://'+localhost+':3001/channels/'+newChannel.id+'/messages', {
          headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          }
        })
      .then((response) =>{
        setMessages(response.data)
      });
  }

  //Ajoute un message à la BD
  const addMessage = (message) => {
    fetch('http://'+localhost+':3001/channels/'+currentChannel.id+'/messages', {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        from: 'PostMessage',
         headers: {
            'Authorization': `Bearer ${oauth.access_token}`
          },
        body: JSON.stringify(message),
      })
      .then(response => response.json())
    setChannel(currentChannel)
  }

 
    return(
      <main className="App-main" css={styles.main}>
         <Drawer
          PaperProps={{ style: { position: 'relative' } }}
          BackdropProps={{ style: { position: 'relative' } }}
          ModalProps={{
            style: { position: 'relative' }
          }}
          variant="persistent"
          open={isDrawerVisible}
          css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
        >
          <Channels channels= {channels} setChannel={setChannel}/>
        </Drawer>
        {currentChannel ? <Channel messages = {messages} addMessage = {addMessage} channel={currentChannel}/> : <Welcome />}
      </main>
    );
  
}