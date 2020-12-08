/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import React, {useState} from 'react'
import {useCookies} from 'react-cookie'
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Context} from './Context';
import {useContext} from 'react';
import Link from '@material-ui/core/Link';
import Login from "./icons/login.png"
import Logout from "./icons/logout.png"
import Logo from "./icons/logo.png"

const styles = (theme) => ({
  header: {
    height: '60px',
    backgroundColor: 'rgba(255,255,255,.1)',
    borderStyle: 'inset',
  },
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    color:'#fafafa',
  },
})

/* Load the packages for hashing and HTTP requests (must be installed with npm before) */
var crypto = require("crypto");
var request = require("request");

export default ({
  drawerToggleListener
  }) => {
  const {oauth, setOauth} = useContext(Context)
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  const onClickLogin = (e) => {
    e.stopPropagation()
    setOauth({
      "access_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYmI1ZTEyYmRlOTk3MWQ2ODgzMjU0MDA1NWI5ZjViN2NkZmIyYjYifQ.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU1NTYvZGV4Iiwic3ViIjoiQ2dVME5qZzVOaElHWjJsMGFIVmkiLCJhdWQiOiJ3ZWJ0ZWNoLWF1dGgiLCJleHAiOjE2MDU2ODkwODgsImlhdCI6MTYwNTYwMjY4OCwiYXRfaGFzaCI6ImJYLXpmSVlZZEtUaTE5Q1NNRmlGZkEiLCJlbWFpbCI6ImRhdmlkQGFkYWx0YXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.bIJYsGTCYypH9NYmxgX-KWjSs3Et7bEFAEkFlJKHvcXfYWxCAVBp0KZD2xUMTVXRsRHCjgsioyxuFqShmLu0Nt9Et5jQs8XieuTJTt4EplYt2q2SXveDM1xCpXLfMSTf5qbJKvKCxOo-fXsZXxYirEqA2wMa-0rsFvj8jyJGANe6iF7fbMHnnSmwGknQmMA7wT2S9J_0s53ommtbdAWFE8f8KyqjpzOugp3DRArwQzrViPeBpWqgHT3zMIZG_m4-LAHt5zJtk4SpUZuTG_MYamSMzmK0JVxmhXZm-KjM2FnT9UqX73qc74iBBn27VB1SnUhBpdxKjeHmXdZQg31ROA",
      "token_type": "bearer",
      "expires_in": 86399,
      "refresh_token": "Chlhb2t4N20yaGVwcTJpMzY2Mm94cmhkdDJhEhl3aXp3MzJjYzdoajd6Nnhmd2V5amJ4czJo",
      "id_token": "eyJhbGciOiJSUzI1NiIsImtpZCI6IjgzYmI1ZTEyYmRlOTk3MWQ2ODgzMjU0MDA1NWI5ZjViN2NkZmIyYjYifQ.eyJpc3MiOiJodHRwOi8vMTI3LjAuMC4xOjU1NTYvZGV4Iiwic3ViIjoiQ2dVME5qZzVOaElHWjJsMGFIVmkiLCJhdWQiOiJ3ZWJ0ZWNoLWF1dGgiLCJleHAiOjE2MDU2ODkwODgsImlhdCI6MTYwNTYwMjY4OCwiYXRfaGFzaCI6ImhJTEhaaHJjNHdENlJZSzRLaVdMUlEiLCJlbWFpbCI6ImRhdmlkQGFkYWx0YXMuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWV9.CU8zht_oqzCQ3-b9q9H7R2NbSN4V--uTvNUqvUpVFxKUfAC1J9Kc4RQYtnU-N0kJP4ZO-a4OCN31dDj-3hin1Wj3G2qoNeTQB6p3zveUYca_eEVI5cP1jcj-jUa4QNz-CCraWIoQwPdnqUjHiWY3kg-thEONvR6QFhrRMcP-YkDpFmgyjYqNE1iWOuZbRPi6b1TzWmiCQG2ucevmDE8XFv845f3h7-qFnj2wmkaBJ9gxyRyn_-sD-qfYlYzK9MwUToM5lIX5TLfuN4p5QVVqFLIdEDyTG3hFlk5LSu2dzimCgddeWbN1MJnVdjRQWc5Gpvi3qkXqSeWwGHyAdrj_LQ"
    })
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  if(oauth){
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
      <header css={styles.header}>
        <div css={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <img src={Logo} width="40" height="40"></img>
              <Typography variant="h6" style={{color:'#646e6e'}}>
                  Welcome {oauth && oauth.email}
              </Typography>
              <div style={{position: 'absolute', right: '15px'}}>   
                  <img src={gravatar} width="40" height="40" style={{borderRadius: '50%', marginRight: '10px'}}></img>
                  <Link on onClick ={onClickLogout}><img src={Logout} width="40" height="40"></img></Link>
              </div>
            </Toolbar>
          </AppBar>
        </div>
      </header>
      );
  }  
  else{
    return (
      <header css={styles.header}>
        <div css={styles.root}>
          <AppBar position="static">
            <Toolbar>
              <img src={Logo} width="5%" height="5%"></img>
              <Typography variant="h6" color ='textPrimary' css={styles.title}>
                  Welcome !
              </Typography>
              <div style={{position: 'absolute', right: '15px'}}>
                  <Link on onClick ={onClickLogin}><img src={Login} width="40" height="40"></img></Link>
                </div>
            </Toolbar>
          </AppBar>
        </div>
      </header>
      );
  }
}