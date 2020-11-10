/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import moment from 'moment';
import Prism from 'prismjs'
import './App.css';

// The code snippet you want to highlight, as a string
const code = `var data = 1;`;

// Returns a highlighted HTML string
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

const styles = {
  messages: {
    flex: '1 1 auto',
    height: '100%',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
    borderRightStyle: 'inset',
  },
  message: {
    margin: '.2rem',
    padding: '.2rem',
   // backgroundColor: '#66728E',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
  },
}

class Messages extends React.Component{
  render() {
      return(
        <div className="messages" css={styles.messages}>
        <ul>
               { this.props.messages.map( (message, i) => (
                 <li key={i} css={styles.message}>
                   <p><b>
                     <span>{message.author} : </span>
                     {' '}
                     <span>{(moment(new Date(message.creation))).format("[Le] D MMM YYYY [à] hh:mm")}</span>
                     </b></p>
                   <div>
                     {
                       message.content
                       .split(/(\n +\n)/)
                       .filter( el => el.trim() )
                       .map( el => <p>{el}</p>)
                     }
                   </div>
                 </li>
               ))}
             </ul>
       </div>  
      );
  }
}

export default Messages;