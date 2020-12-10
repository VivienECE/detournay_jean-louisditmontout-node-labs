import {useState} from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
// Layout
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Channel from './icons/channel.png';
import Friends from './icons/friends.png';
import settingIcon from './icons/settings.png';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Modal from '@material-ui/core/Modal';
import Settings from './Settings';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import Context from './Context'
import {useContext} from 'react';

const useStyles = (theme) => ({
  root: {
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    background: 'rgba(164,219,181,.3)',
    color:'#646e6e',
    '& Button':{
      color:'#646e6e'
    },
  },
  modal:{
    border: 'none',
    backgroundColor:'#f1f0ea',
    display: 'flex',
    position: 'relative',
    top: '10%',
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
  card: {
    textAlign: 'center',
  },
  icon: {
    width: '30%',
    fill: '#fff',
  }
})


export default () => {
  const styles = useStyles(useTheme())
  const {oauth, setOauth} = useContext(Context)
  ///////////////////////////////////////////////////newChannel
  
  const [openC, setOpenC] = useState(false); 
  const handleOpenC = () => { 
    setOpenC(true);
  };
  const handleCloseC = () => { 
    setOpenC(false);
  };
  const [nameC, setName] = useState('')
  const addChannel = async () => {
    const {data: channels} = await axios.post(
      `http://localhost:3001/channels`
    , {
      name: nameC,
    })
    setName('')
    console.log(nameC)
  }; 
  const handleChange = (e) => {
    setName(e.target.value)
  }

  const newChannel = (
    <div align="center" css={styles.modal}>
      <h2>New channel</h2>
        <form> 
            <fieldset>
              <Input placeholder="Channel's name" value={nameC} onChange={handleChange} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
        </form>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseC}>
            Cancel
        </Button>
        <Button color="secondary" variant='contained' type="submit" onClick={addChannel}>
            Create
        </Button>
    </div> 
  );
  
  ////////////////////////////////////////////newFriend
  
  const [openF, setOpenF] = useState(false); 
  
  const handleOpenF = () => { 
    setOpenF(true);
  };

  const handleCloseF = () => { 
    setOpenF(false);
  };

  const newFriend = (
    <div align="center" css={styles.modal}>
      <h2>Invite your friend !</h2>
        <form> 
            <fieldset>
              <Input placeholder="Friend's email"  id="friend" inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
        </form>
        <Button color="inhirit" variant='contained' style={{marginRight:'15px'}} onClick={handleCloseF}>
            Cancel
        </Button>
        <Button color="secondary" variant='contained' type="submit">
            Send invitation
        </Button>
    </div> 
  );

  ////////////////////////////////////////////Settings
  
  const [openS, setOpenS] = useState(false); 
  
  const handleOpenS = () => { 
    setOpenS(true);
  };

  const handleCloseS = () => { 
    setOpenS(false);
  };

  const settings = (
    <div align="center" css={styles.modal}>
        <Settings/>
        <Button color="secondary" variant='contained' style={{right:'5'}} onClick={handleCloseS}>
            Save 
        </Button>
    </div> 
  );

  //////////////////////////Welcome page

  return (
    <div css={styles.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={5}
      >
        <Grid item xs>
          <div css={styles.card}>
            <img src={Channel} width="150" height="150"></img><br></br>
            <Button onClick={handleOpenC}>
            Create channel
            </Button>
            <Modal open={openC} onClose={handleCloseC} style={{top: '20%'}}>
              {newChannel}
            </Modal>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <img src={Friends} width="150" height="150"></img><br></br>
            <Button onClick= {handleOpenF}>
              Invite friends
            </Button>
            <Modal open={openF} onClose={handleCloseF} style={{top: '20%'}}>
              {newFriend}
            </Modal>
          </div>
        </Grid>
        <Grid item xs>
          <div css={styles.card}>
            <img src={settingIcon} width="150" height="150"></img><br></br>
            <Button onClick= {handleOpenS}>
              Settings
            </Button>
            <Modal open={openS} onClose={handleCloseS}>
              {settings}
            </Modal>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
