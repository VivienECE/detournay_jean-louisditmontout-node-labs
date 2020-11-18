/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

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
  },
})


const Anchor = 'top' | 'left' | 'bottom' | 'right';

export default () => { 
  
	return (
      <header css={styles.header}>
        <div css={styles.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" color ='primaryText' css={styles.title}>
            Welcome
          </Typography>
          
        </Toolbar>
      </AppBar>
    </div>
      </header>
  	);
}