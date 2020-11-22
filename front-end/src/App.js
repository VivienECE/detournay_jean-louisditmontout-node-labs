import {useState} from 'react'
import './App.css';
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Local
import Footer from './Footer'
import Header from './Header'
import Main from './Main'
import Login from './Login'
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = (theme) => ({
  root: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#565E71',
    padding: '50px',
  },
})

export default () => {
  const [user, setUser] = useState(null)
  const [drawerMobileVisible, setDrawerMobileVisible] = useState(false)
  const drawerToggleListener = () => {
    setDrawerMobileVisible(!drawerMobileVisible)
  }
  const theme = useTheme()
  const styles = useStyles(theme)
  const alwaysOpen = useMediaQuery(theme.breakpoints.up('sm'))
  const isDrawerVisible = alwaysOpen || drawerMobileVisible
 
  return (
    <div className="App" css={styles.root}>
      <Header drawerToggleListener={drawerToggleListener}/>
      {
        user ? <Main drawerMobileVisible={drawerMobileVisible} isDrawerVisible={isDrawerVisible}/> : <Login onUser={setUser} />
      }
      <Footer />
    </div>
  );
}