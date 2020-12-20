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
import Context from './Context'
import {useContext} from 'react';
import Link from '@material-ui/core/Link';
import Login from "./icons/login.png"
import Logout from "./icons/logout.png"
import Logo from "./icons/logo.png"
import Modal from '@material-ui/core/Modal';
import Settings from './Settings';

const useStyles = (theme) => ({
  header: {
    height: '60px',
    //backgroundColor: 'rgba(255,255,255,.1)',
    //backgroundColor: 'linear-gradient(45deg,  #270c59 30%, #184d5d 90%)',
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
  modal:{
    border: 'none',
    backgroundColor:'#f1f0ea',
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
    '& form':{
      padding:'1em',
    },
    '& fieldset': {
      border: 'none',
      marginBottom:'7px',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})

export default ({
  drawerToggleListener
  }) => {
  const {oauth, setOauth, currentUser, setCurrentUser} = useContext(Context)
  const handleDrawerToggle = (e) => {
    drawerToggleListener()
  }
  const onClickLogout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }

  const styles = useStyles(useTheme())
  const fetchUser = async(oauth) =>{
    if(oauth)
      await setCurrentUser(oauth)
  }
  if(oauth && !currentUser)
    fetchUser(oauth)
  
  if(oauth && currentUser){
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
      </div> 
    );

    return (
      <header css={styles.header}>
        <div css={styles.root}>
          <AppBar position="static">
            <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerToggle}
              css={styles.menu}
            >
             <MenuIcon />
            </IconButton>
              <img src={Logo} width="40" height="40"></img>
              <Typography variant="h6" style={{color:'#646e6e'}}>
                  Welcome {currentUser.username}
              </Typography>
              <div style={{position: 'absolute', right: '15px'}}>   
                  <img src={currentUser.avatar} onClick={handleOpenS} width="40" height="40" style={{borderRadius: '50%', marginRight: '10px'}}></img>
                  <Modal open={openS} onClose={handleCloseS}>
                    {settings}
                  </Modal>
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
            </Toolbar>
          </AppBar>
        </div>
      </header>
      );
  }
}
