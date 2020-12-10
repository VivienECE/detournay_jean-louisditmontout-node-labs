import {useContext, useRef, useState} from 'react';
import axios from 'axios';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
// Layout
import { useTheme } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
// Local
import Messages from './Messages'
import MessageSend from './MessageSend'
import Context from './Context'
import { useHistory, useParams } from 'react-router-dom'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(0,0,0,.5)',
    position: 'relative',
  },
  top:{
    textAlign: 'center',
    color:'#fff3e0',
    //position: 'fixed',
    
  },
  fab: {
    position: 'absolute !important',
    top: theme.spacing(2),
    right: theme.spacing(2),
  },
  fabDisabled: {
    display: 'none !important',
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

export default () => {
  const history = useHistory()
  const { id } = useParams()
  const {channels} = useContext(Context)
  const channel = channels.find( channel => channel.id === id)
  if(!channel) {
    history.push('/oups')
    return <div/>
  }
  const styles = useStyles(useTheme())
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`)
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  if(channelId.current !== channel.id){
    fetchMessages()
    channelId.current = channel.id
  }
  const onScrollDown = (scrollDown) => {
    setScrollDown(scrollDown)
  }
  const onClickScroll = () => {
    listRef.current.scroll()
  }
  
  //Add a friend
  const [openF, setOpenF] = useState(false); 
  const handleOpenF = () => { 
    setOpenF(true);
  };
  const handleCloseF = () => { 
    setOpenF(false);
  };
  const [friend, setFriend] = useState('')
  const onSubmit = async () => {
    const {data: user} = await axios.put(
      `http://localhost:3001/channels/${channel.id}`
    , {
      friend: friend,
    })
    setFriend('')
  }
  const handleChange = (e) => {
    setFriend(e.target.value)
  }
  const newFriend = (
    <div align="center" css={styles.modal}>
      <h2>Add a friend to your channel!</h2>
        <form> 
            <fieldset>
              <Input placeholder="Friend's email"  id={friend} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
        </form>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseF}>
            Cancel
        </Button>
        <Button color="secondary" variant='contained' type="submit" onClick={onSubmit}>
            Add
        </Button>
    </div> 
  );

  return (
    <div css={styles.root}>
      <div css={styles.top}>
        <Button onClick={handleOpenF} style={{ float: 'right' }}>
          <AddCircleIcon fontSize="large" style={{ color: '#fff3e0' }}/>
        </Button>
        <Modal open={openF} onClose={handleCloseF}>
          {newFriend}
        </Modal>
        <h2>{channel.name}</h2>
      </div>
      <Messages
        channel={channel}
        messages={messages}
        onScrollDown={onScrollDown}
        ref={listRef}
      />
      <MessageSend addMessage={addMessage} channel={channel} />
      <Fab
        color="secondary"
        aria-label="Latest messages"
        css={[styles.fab, scrollDown || styles.fabDisabled]}
        onClick={onClickScroll}
      >
        <ArrowDropDownIcon />
      </Fab>
    </div>
  );
}
