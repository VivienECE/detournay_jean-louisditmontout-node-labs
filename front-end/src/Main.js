/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Channels from './Channels'
import Channel from './Channel'
import Welcome from './Welcome'
import Context from './Context'
import React, { useContext, useHistory, useState, useEffect, data, Component } from 'react';
import axios from 'axios';
import Hidden from '@material-ui/core/Hidden';
import Drawer from '@material-ui/core/Drawer';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CreateUser from './CreateUser'
import {Button} from '@material-ui/core'
import {
  Route,
  Switch,
} from 'react-router-dom'


const useStyles = (theme) => ({
  root: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: '1 1 auto',
    display: 'flex',
    flexDirection: 'row',
    overflow: 'hidden',
  },
  drawer: {
    width: '200px',
    display: 'none',
  },
  drawerVisible: {
    display: 'block',
  },
})

export default () => {
  const { oauth, currentUser, setCurrentUser,
    currentChannel,
    drawerVisible,
  } = useContext(Context)
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerVisible
  const [openCreate, setOpenCreate] = useState(false); 
  const handleOpenCreate = () => { 
    setOpenCreate(true);
  };
  const handleCloseCreate = () => { 
    setOpenCreate(false);
  };
  const createUser = (
    <div align="center" css={styles.modal}>
        <CreateUser/>
    </div> 
  );
  /*if(!currentUser){
    setCurrentUser(oauth)
  }
  if(currentUser){*/
    return (
      <main css={styles.root}>
        <Drawer
          PaperProps={{ style: { position: 'relative' } }}
          BackdropProps={{ style: { position: 'relative' } }}
          ModalProps={{
            style: { position: 'relative' }
          }}
          variant="persistent"
          open={isDrawerVisible}
          css={[styles.drawer, isDrawerVisible && styles.drawerVisible]}
        >
          <Channels />
        </Drawer>
        <Switch>
          <Route path="/channels/:id">
            <Channel />
          </Route>
          <Route path="/">
            <Welcome />
          </Route>
        </Switch>
      </main>
    );
    //}
    /*else{
      //handleOpenCreate()
      //setOpenCreate(true);
      console.log('create')
      console.log(oauth.email)
      return(
        <main css={styles.root}>
          <h1>hello new user</h1>
          <Button onClick={handleOpenCreate}></Button>
          <CreateUser/> 
        </main>
        
      )
    }/*<Modal open={openCreate} onClose={handleCloseCreate}>
          {createUser}
          </Modal>*/
}
