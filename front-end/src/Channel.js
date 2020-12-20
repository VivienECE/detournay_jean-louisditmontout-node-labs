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
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import GroupIcon from '@material-ui/icons/Group';

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
  const styles = useStyles(useTheme())
  const {channels, oauth, setOauth, setChannels} = useContext(Context)
  const listRef = useRef()
  const channelId = useRef()
  const [messages, setMessages] = useState([])
  const [scrollDown, setScrollDown] = useState(false)
  const fetchChannels = async () => {
    const axiosdata = {
      email: oauth.email
    };
    try{
      const {data: channels} = await axios.put('http://localhost:3001/filtredchannels', axiosdata, {
        headers: {
          'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      setChannels(channels)
    }catch(err){
      console.error(err)
    }
  }

  const channel = channels.find( channel => channel.id === id)
  if(!channel) {
    history.push('/oups')
    return <div/>
  }
  const addMessage = (message) => {
    fetchMessages()
  }
  const fetchMessages = async () => {
    setMessages([])
    const {data: messages} = await axios.get(`http://localhost:3001/channels/${channel.id}/messages`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    setMessages(messages)
    if(listRef.current){
      listRef.current.scroll()
    }
  }
  const [users, setUsers] = useState([])
  const fetchUsers = async () => {
    setUsers([])
    const {data: users} = await axios.get(`http://localhost:3001/channels/${channel.id}/users`, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    setUsers(users)
  }

  if(channelId.current !== channel.id){
    fetchMessages()
    fetchUsers()
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
    const axiosdata = {
      email: friend,
      rang: "member"
     };
     const config = {
       headers: {
            'Authorization': `Bearer ${oauth.access_token}`
       }
     };
    await axios.post(`http://localhost:3001/channels/${channel.id}/users`, axiosdata, config)
    setFriend('')
    fetchUsers()
    setOpenF(false);
  }
  const handleChange = (e) => {
    setFriend(e.target.value)
  }
  const newFriend = (
    <div align="center" css={styles.modal}>
      <h2>Add a friend to your channel!</h2>
        <form> 
            <fieldset>
              <Input placeholder="Friend's email"  value={friend} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
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

  //Show members
  const [openMem, setOpenMem] = useState(false); 
  const handleOpenMem = () => { 
    setOpenMem(true);
  };
  const handleCloseMem = () => { 
    setOpenMem(false);
  };
  const showMembers = (
    <div align="center" css={styles.modal}>
      <h2>Channel's members</h2>
      <ul>
        { users.map( (user, i) => {
              return (
              <li key={i} style={{ listStyleType:"none"}}>
                  <p>
                      <span>{user.email}</span>
                      <span style={{color:'rgb(150,150,150)', fontSize:'10px'}}>  -  {user.rang}</span>
                  </p>
              </li>)
            })}
      </ul>
    </div> 
  );

  //Modify channel name
  const [openN, setOpenN] = useState(false); 
  const handleOpenN = () => { 
    setOpenN(true);
  };
  const handleCloseN = () => { 
    setOpenN(false);
  };
  const [nameC, setName] = useState('')
  const onSubmitN = async () => {
      await axios.put(`http://localhost:3001/channels/${channel.id}`, {name: nameC}, {
        headers: {
             'Authorization': `Bearer ${oauth.access_token}`
        }
      })
      setName('')
      fetchChannels()
      setOpenN(false);
  }
  const handleChangeN = (e) => {
    setName(e.target.value)
  }
  const modifyName = (
    <div align="center" css={styles.modal}>
      <h2>Change your channel's name!</h2>
        <form> 
            <fieldset>
              <Input placeholder="New name"  value={nameC} onChange={handleChangeN} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
        </form>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseN}>
            Cancel
        </Button>
        <Button color="secondary" variant='contained' type="submit" onClick={onSubmitN}>
            Change
        </Button>
    </div> 
  );

  //Delete channel
  const [openDel, setOpenDel] = useState(false); 
  const handleOpenDel = () => { 
    setOpenDel(true);
  };
  const handleCloseDel = () => { 
    setOpenDel(false);
  };
  const onSubmitDel = async () => {
      axios.delete(`http://localhost:3001/channels/${channel.id}`, {
      headers: {
           'Authorization': `Bearer ${oauth.access_token}`
      }
    })
    setOpenDel(false);
    fetchChannels()
    window.location.reload()
  }
  
  const deleteChannel = (
    <div align="center" css={styles.modal}>
      <h2>Do you really want to delete this channel?</h2>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseDel}>
            Cancel
        </Button>
        <Button style={{backgroundColor:'red', color:'white'}} variant='contained' type="submit" onClick={onSubmitDel}>
            Delete
        </Button>
    </div> 
  );

  return (
    <div css={styles.root}>
      <div css={styles.top}>
        <Button onClick={handleOpenDel} style={{ float: 'right' }}>
          <DeleteIcon fontSize="small" style={{ color: '#fff3e0' }}/>
        </Button>
        <Modal open={openDel} onClose={handleCloseDel}>
          {deleteChannel}
        </Modal>
        <Button onClick={handleOpenN} style={{ float: 'right' }}>
          <CreateIcon fontSize="small" style={{ color: '#fff3e0' }}/>
        </Button>
        <Modal open={openN} onClose={handleCloseN}>
          {modifyName}
        </Modal>
        <Button onClick={handleOpenMem} style={{ float: 'right' }}>
          <GroupIcon fontSize="small" style={{ color: '#fff3e0' }}/>
        </Button>
        <Modal open={openMem} onClose={handleCloseMem}>
          {showMembers}
        </Modal>
        <Button onClick={handleOpenF} style={{ float: 'right' }}>
          <PersonAddIcon fontSize="small" style={{ color: '#fff3e0' }}/>
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
        fetchMessages={fetchMessages}
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
