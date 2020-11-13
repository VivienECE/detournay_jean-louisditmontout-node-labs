/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import moment from 'moment';
import Prism from 'prismjs'
import './App.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'

// The code snippet you want to highlight, as a string
const code = `var data = 1;`;

// Returns a highlighted HTML string
const html = Prism.highlight(code, Prism.languages.javascript, 'javascript');

const styles = {
  messages: {
    display : 'flex',
    flexDirection : 'column-reverse',
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
  componentDidMount() {
    this.scrollToBottom();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.el.scrollIntoView({ behavior: 'smooth' });
  }

  render() {
      return(
        <div className="messages" css={styles.messages} ref={el => { this.el = el; }}>
          <ul>
            {this.props.messages.map( (message, i) => (
              <li key={i} css={styles.message}>
                <p><b>
                  <span>{message.author} : </span>
                  {' '}
                  <span>{format(new Date(message.creation / 1000), "do MMM p")}</span>
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
