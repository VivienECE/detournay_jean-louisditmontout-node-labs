import {forwardRef, useImperativeHandle, useLayoutEffect, useRef, useState} from 'react'
import { format, formatDistance, formatRelative, subDays } from 'date-fns'
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
// Layout
import { useTheme } from '@material-ui/core/styles';
// Markdown
import unified from 'unified'
import markdown from 'remark-parse'
import remark2rehype from 'remark-rehype'
import html from 'rehype-stringify'
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Context from './Context'
import {useContext} from 'react';
import axios from 'axios';


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
  
  message: {
    padding: '.2rem .5rem',
    borderRadius: '25px',
    ':hover': {
      backgroundColor: 'rgba(255,255,255,.5)',
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
  modal:{
    border: 'none',
    backgroundColor:'#f1f0ea',
    display: 'flex',
    position: 'relative',
    top: '30%',
    padding:'1em',
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    
    '& h2':{
      color:'rgba(255,138,101,.9)',
    },
    '& form':{
      padding:'2em',
    },
    '& fieldset': {
          border: 'none',
          marginBottom:'10px',
          '& label': {
            marginBottom: theme.spacing(.5),
            display: 'block',
          },
        },
  },
})

export default forwardRef(({
  channel,
  messages,
  onScrollDown,
  fetchMessages,
}, ref) => {
  const styles = useStyles(useTheme())
  const {oauth, setOauth} = useContext(Context)
  var email = oauth.email
  // Expose the `scroll` action
  useImperativeHandle(ref, () => ({
    scroll: scroll
  }));
  const rootEl = useRef(null)
  const scrollEl = useRef(null)
  const scroll = () => {
    scrollEl.current.scrollIntoView()
  }
  // See https://dev.to/n8tb1t/tracking-scroll-position-with-react-hooks-3bbj
  const throttleTimeout = useRef(null) // react-hooks/exhaustive-deps
  useLayoutEffect( () => {
    const rootNode = rootEl.current // react-hooks/exhaustive-deps
    const handleScroll = () => {
      if (throttleTimeout.current === null) {
        throttleTimeout.current = setTimeout(() => {
          throttleTimeout.current = null
          const {scrollTop, offsetHeight, scrollHeight} = rootNode // react-hooks/exhaustive-deps
          onScrollDown(scrollTop + offsetHeight < scrollHeight)
        }, 200)
      }
    }
    handleScroll()
    rootNode.addEventListener('scroll', handleScroll)
    return () => rootNode.removeEventListener('scroll', handleScroll)
  })

  //Delete or modify a message
  const [openM, setOpenM] = useState(false); 
  
  const handleOpenM = () => { 
    setOpenM(true);
  };
  const handleCloseM = () => { 
    setOpenM(false);
  };
  const [newM, setNewM] = useState('')
  const handleChangeM = (e) => {
    setNewM(e.target.value)
  }
  
  function updateM(messageSelected) {
    return(
        <div align="center" css={styles.modal}>
          <fieldset>
            <Input placeholder="New Message"  onChange={handleChangeM} value={newM} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
          </fieldset>
            <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={async () => {
              const config = {
                headers: {
                     'Authorization': `Bearer ${oauth.access_token}`
                }
              };
              axios.delete(`http://localhost:3001/channels/${channel.id}/messages/${messageSelected.creation}`, config)
              setOpenM(false);
              fetchMessages()
              }}>
                Delete
            </Button>
            <Button color="inhirit" variant='contained' type="submit" onClick={async () => {
              const config = {
                headers: {
                     'Authorization': `Bearer ${oauth.access_token}`
                }
              };
              const axiosdata = {
                content: newM,
                author: oauth.email
               };
              await axios.put(`http://localhost:3001/channels/${channel.id}/messages/${messageSelected.creation}`, axiosdata, config)
              setNewM('')
              setOpenM(false);
              fetchMessages()
              }}>
                Modify
            </Button>
            
        </div> 
    );
  } 

  return (
    <div css={styles.root} ref={rootEl}>
      <ul>
        { messages.map( (message, i) => {
            const {contents: content} = unified()
            .use(markdown)
            .use(remark2rehype)
            .use(html)
            .processSync(message.content)
            if(message.author == oauth.email){
              return (
              <li key={i} style={{ listStyleType:"none", textAlign: 'right' }} css={styles.message}>
                  <p>
                    <Typography style={{color:'#18545a'}} variant="overline">
                      <span>{message.author}</span>
                      {' - '} 
                      <span>{format(new Date(message.creation / 1000), "do MMM p")}</span>
                    </Typography>
                  </p>
                  <Typography>
                     <div dangerouslySetInnerHTML={{__html: content}} onClick={handleOpenM}></div>
                     <Modal open={openM} onClose={handleCloseM}>
                      {updateM(message)}
                    </Modal>
                  </Typography>
              </li>)
            }
            else{
              return (
                <li key={i} css={styles.message}>
                    <p>
                      <Typography style={{color:'#18545a'}} variant="overline">
                        <span>{message.author}</span>
                        {' - '} 
                        <span>{format(new Date(message.creation / 1000), "do MMM p")}</span>
                      </Typography>
                    </p>
                    <Typography>
                       <div dangerouslySetInnerHTML={{__html: content}}></div>
                    </Typography>
                </li>)
            }
        })}
      </ul>
      <div ref={scrollEl} />
    </div>
  )
})