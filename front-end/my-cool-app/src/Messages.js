/** @jsx jsx */
import { jsx } from '@emotion/core'
import React from 'react';
import './App.css';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
import { useTheme } from '@material-ui/core/styles';
// Markdown
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'

/**
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
  },
  message: {
    margin: '.2rem',
    padding: '.2rem',
   // backgroundColor: '#66728E',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.1)',
    },
  },
}**/

const useStyles = (theme) => ({
  root: {
    position: 'relative',
    flex: '1 1 auto',
    overflow: 'auto',
    '& ul': {
      'margin': 0,
      'padding': 0,
      'textIndent': 0,
      'listStyleType': 0,
    },
  },
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
  },
  message: {
    padding: '.2rem .5rem',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.05)',
    },
  },
  fabWrapper: {
    position: 'absolute',
    right: 0,
    top: 0,
    width: '50px',
  },
  fab: {
    position: 'fixed !important',
    top: 0,
    width: '50px',
  },
})

class Messages extends React.Component{
  render() {
     const styles = useStyles(useTheme())
      return(
        <div className="messages" css={this.styles.messages}>
          <ul>
            {this.props.messages.map( (message, i) => (
              <li key={i} css={this.state.styles.message}>
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
