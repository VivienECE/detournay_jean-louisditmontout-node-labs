/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Context  from './Context';
import {useContext} from 'react';
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
    top: '0%',
    padding:'1em',
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    '& h2':{
      color:'rgba(255,138,101,.9)',
    }, 
  }, 
}

var crypto = require("crypto");
var request = require("request");
const CreateUser = () => { 
const {oauth, currentUser, setCurrentUser} = useContext(Context)
  //if(!currentUser)
    //setCurrentUser(oauth)
  
  const [avatar, setAvatar] = useState('')
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
  const onDropUpload = picture =>{
    setAvatar(picture)
    setOpenAv(false);
  }

  function findGravatar(email){
    var hash = crypto.createHash('md5').update(email).digest("hex");
    request("https://www.gravatar.com/"+hash+".xml",function(err,response,body){
      if (!err){
        console.log(body);
      }else{
        console.log("Error: "+err);
      }
    })
    let gravatar = "https://www.gravatar.com/avatar/" +hash+".jpg"
    return gravatar 
  }
    

  const changeAvatar = (
  <div style={{backgroundColor:'#f1f0ea', margin: '20px'}}>
    <ImageUploader
        withIcon={true}
        buttonText='Upload your image here'
        onChange={onDropUpload}
        imgExtension={['.jpg', '.png']}
        maxFileSize={5242880}
    />
    <p>or</p>
    <Button variant='contained' color="secondary" onClick={async () => {
      setAvatar(findGravatar(email))
      setOpenAv(false);
    }}>Use my gravatar</Button>
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
  const [firstname, setFirstname] = useState('')
  const handleChangeFirstname = (e) => {
    setFirstname(e.target.value)
  }

//Lastname
  const [lastname, setLastname] = useState('')
  const handleChangeLastname = (e) => {
    setLastname(e.target.value)
  }

//username
const [username, setUsername] = useState('')
  const handleChangeU = (e) => {
    setUsername(e.target.value)
  }
//email
const [email, setEmail] = useState('')
  const handleChangeE = (e) => {
    setEmail(e.target.value)
  }
//birth
  const [birth, setBirth] = useState('')
  const handleChangeB = (e) => {
    setBirth(e.target.value)
  }
//save all fields
  const Save = async () => {
    await axios.post(`http://localhost:3001/users/`, {
      avatar: avatar,
      firstname: firstname,
      lastname: lastname,
      username: username,
      email: oauth.email,
      birth: birth
    }, {
      headers: {
        'Authorization': `Bearer ${oauth.access_token}`
      }})
}

	return (
    <div css={styles.root}>
      <h1 align="center">Create a new account</h1><br/>
          <form>
            <img src={avatar} onClick={handleOpenAv} width="150" height="150" style={{borderRadius: '50%', marginRight: '10px'}}></img>
              <Modal open={openAv} onClose={handleCloseAv} style={styles.modal}>
                {changeAvatar}
              </Modal>
            <fieldset>
              Firstname  
              <Input value={firstname} onChange={handleChangeFirstname} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Lastname  
              <Input value={lastname} onChange={handleChangeLastname} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Username  
              <Input value={username} onChange={handleChangeU} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Email  
              <Input value={oauth.email} type='email' onChange={handleChangeE} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Date of birth  
              <Input value={birth} width='100px' type='date'  onChange={handleChangeB} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
          </form>
        <Button color='secondary' variant='contained' style={{ float: 'right' }} onClick={Save}>Save</Button>
    </div>
  	)
}

export default CreateUser;