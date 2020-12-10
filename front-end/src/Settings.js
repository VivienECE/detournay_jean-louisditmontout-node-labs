/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Context  from './Context';
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react';
import Switch from '@material-ui/core/Switch';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';


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
    }
  } 
}


const Settings = () => { 
  const {oauth} = useContext(Context)

  const [state, setState] = useState({
    darkMode: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };
  /* Load the packages for hashing and HTTP requests (must be installed with npm before) */
  var crypto = require("crypto");
  var request = require("request");
  var email = oauth.email
    /*Generate a md5-hash of a email address and return its hexadecimal value */
    var hash = crypto.createHash('md5').update(email).digest("hex");

    /* Sends a GET request for the user profile */
    request("https://www.gravatar.com/"+hash+".xml",function(err,response,body){
      if (!err){
        console.log(body);
      }else{
        console.log("Error: "+err);
      }
    })

    const gravatar = "https://www.gravatar.com/avatar/" +hash+".jpg"

	return (
    <div css={styles.root}>
      <h1 align="center">Settings</h1><br/>
        <div align="center"> 
          <form>
          <img src={gravatar} width="150" height="150" style={{borderRadius: '50%', marginRight: '10px'}}></img>
            <fieldset>
              Full name  <Input value={oauth.email} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Username  <Input value={oauth.email} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Email  <Input value={oauth.email} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              Birthday  <Input value={oauth.email} inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>Dark Mode  <Switch
              checked={state.darkMode}
              onChange={handleChange}
              name="darkMode"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
            </fieldset>
          </form>
        </div>
    </div> 
  	)
}

export default Settings;