import {useState} from 'react';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Component } from 'react';
import Channels from './Channels'
import Channel from './Channel'

const styles = {
  main: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
}

class Main extends React.Component{
  render() {
      return(
        <main className="App-main" css={styles.main}>
        <Channels/>
        <Channel/>
       </main>
      );
  }
}

export default Main;