/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Context  from './Context';
import React,{useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react';
import Switch from '@material-ui/core/Switch';
import Input from '@material-ui/core/Input';
import CreateIcon from '@material-ui/icons/Create';
import {Button} from '@material-ui/core';
import Modal from '@material-ui/core/Modal';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import a1 from './icons/a1.png';
import a2 from './icons/a2.png';
import a3 from './icons/a3.png';
import a4 from './icons/a4.png';
import a5 from './icons/a5.png';
import a6 from './icons/a6.png';
import a7 from './icons/a7.png';
import a8 from './icons/a8.png';
import ImageUploader from 'react-images-upload';
import FileSystem from 'file-system';


const styles = {
  root: {
    color:'#ff8a65',
    backgroundColor: '#f1f0ea',
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    textAlign: 'center',
    minWidth: '500px',
    flexDirection: 'column',
    '& h1':{
    color:'#4db6ac',
    },
    '& Input':{
      width:'200px',
      paddingLeft: '20px',
      margin:'2px'
      }
  },
  modal:{
    border: 'none',
    //backgroundColor:'#f1f0ea',
    display: 'flex',
    position: 'relative',
    top: '40%',
    padding:'1em',
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    '& h2':{
      color:'rgba(255,138,101,.9)',
    }, 
  }, 
}

class UploadImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictures: [] };
    this.onDrop = this.onDrop.bind(this);
  }

  onDrop(pictureFiles, pictureDataURLs) {
    this.props.setAvatar(pictureFiles)
    this.setState({
      pictures: pictureFiles
    });
  }
  render() {
    return (
      <ImageUploader
        withPreview={true}
        withIcon={true}
        buttonText="Choose images"
        onChange={this.onDrop}
        imgExtension={[".jpg", ".gif", ".png", ".gif"]}
        maxFileSize={5242880}
      />
    );
  }
}


const Settings = () => { 
  const {oauth, currentUser, setCurrentUser} = useContext(Context)
  if(!currentUser)
    setCurrentUser(oauth)
  
  const [avatar, setAvatar] = useState(currentUser.avatar)
  

  const [openAv, setOpenAv] = useState(false); 
  const handleOpenAv = () => { 
    setOpenAv(true);
  };
  const handleCloseAv = () => { 
    setOpenAv(false);
  };

  const onDrop = (e) =>{
    setAvatar(e.target.src)
    setOpenAv(false);
  }
  const onDropUpload = async (e, picture) =>{
    console.log(picture)
    console.log(picture[0].name)
    /*let cameraImageUri = '';
    if (picture) {
      const fileName = picture[0].name.split('/').pop();
      cameraImageUri = FileSystem.documentDirectory + fileName;
      try {
        await FileSystem.moveAsync({ from: picture[0].name, to: './icons' });
      } catch (err) {
        throw new Error(err);
      }
    }*/
    setAvatar(e.target.pictureFiles)
    setOpenAv(false);
  }
    

  const changeAvatar = (
  <div style={{backgroundColor:'#f1f0ea', margin: '20px'}}>
    <UploadImage setAvatar={setAvatar} />
    <p> or choose one below</p>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item xs>
        <div>
          <img src={a1} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a2} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a3} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a4} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
    </Grid>
    <Grid
      container
      direction="row"
      justify="center"
      alignItems="center"
      spacing={5}
    >
      <Grid item xs>
        <div>
          <img src={a5} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a6} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a7} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
      <Grid item xs>
        <div>
          <img src={a8} onClick={onDrop} width="100" height="100"></img>
        </div>
      </Grid>
  </Grid>
</div>
)
//Firstname
  const [firstname, setFirstname] = useState(currentUser.firstname)
  const onSubmitFirstname = async () => {
      setFirstname('')
  }
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }

//Lastname
  const [lastname, setLastname] = useState(currentUser.lastname)
  const onSubmitLastname = async () => {
      setLastname('')
  }
  const handleChangeLastname = (e) => {
    setLastname(e.target.value)
  }

//username
const [username, setUsername] = useState(currentUser.username)
  const onSubmitU = async () => {
      setUsername('')
  }
  const handleChangeU = (e) => {
    setUsername(e.target.value)
  }
//email
const [email, setEmail] = useState(currentUser.email)
  const onSubmitE = async () => {
      setEmail('')
  }
  const handleChangeE = (e) => {
    setEmail(e.target.value)
  }
//birth
  const [birth, setBirth] = useState(currentUser.birth)
  const onSubmitB = async () => {
      setBirth('')
  }
  const handleChangeB = (e) => {
    setBirth(e.target.value)
  }

  //darkMode
  const [state, setState] = useState({
    darkMode: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

//save all fields
  const Save = async () => {
    await axios.put(`http://localhost:3001/users/${currentUser.id}`, {
      avatar: avatar,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: email,
      birth: birth
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }
    })
}

	return (
    <div css={styles.root}>
      <h1 align="center">Settings</h1><br/>
          <form>
            <img src={avatar} onClick={handleOpenAv} width="150" height="150" style={{borderRadius: '50%', marginRight: '10px'}}></img>
              <Modal open={openAv} onClose={handleCloseAv} style={styles.modal}>
                {changeAvatar}
              </Modal>
            <fieldset>
              Firstname  
              <Input value={firstname} onChange={handleChangeFirstname} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
              <Button onClick={onSubmitFirstname}>
                <CreateIcon fontSize="small" style={{ color: 'grey' }}/>
              </Button>
            </fieldset>
            <fieldset>
              Lastname  
              <Input value={lastname} onChange={handleChangeLastname} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
              <Button onClick={onSubmitLastname}>
                <CreateIcon fontSize="small" style={{ color: 'grey' }}/>
              </Button>
            </fieldset>
            <fieldset>
              Username  
              <Input value={username} onChange={handleChangeU} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
              <Button onClick={onSubmitU}>
                <CreateIcon fontSize="small" style={{ color: 'grey' }}/>
              </Button>
            </fieldset>
            <fieldset>
              Email  
              <Input value={email} type='email' onChange={handleChangeE} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
              <Button onClick={onSubmitE}>
                <CreateIcon fontSize="small" style={{ color: 'grey' }}/>
              </Button>
            </fieldset>
            <fieldset>
              Date of birth  
              <Input value={birth} width='100px' type='date'  onChange={handleChangeB} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
              <Button onClick={onSubmitB}>
                <CreateIcon fontSize="small" style={{ color: 'grey' }}/>
              </Button>
            </fieldset>
          </form>
        <Button color='secondary' variant='contained' style={{ float: 'right' }} onClick={Save}>Save</Button>
    </div>
  	)
}

export default Settings;