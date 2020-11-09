import {useState} from 'react';
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import Main from './Main'

const styles = {
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  }
}


class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <body>
          <div className="App" css={styles.root}>
          <Header />
          <Main/>
          <Footer />
        </div>
       </body>
    );
  }
}

export default App;
