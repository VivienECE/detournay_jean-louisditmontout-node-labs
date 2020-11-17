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
    textAlign: 'center',
  }
}

class Main extends React.Component{
  render() {
    return (
        <div css={styles.channel}>
          <div css={styles.header}>
              <h2>    Messages for {this.props.channel.name}</h2>
          </div>
          <Messages  messages={this.props.messages}/>
          <MessageSend addMessage={this.props.addMessage}/>
        </div>
    );
  }
}

export default Main;
