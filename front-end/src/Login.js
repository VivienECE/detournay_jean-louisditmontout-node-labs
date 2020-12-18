import { useContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import crypto from 'crypto'
import qs from 'qs'
import axios from 'axios'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import { useTheme } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link'
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
// Local
import Context from './Context'
import Logo from './icons/logo.png';
import {
  useHistory
} from "react-router-dom";

const base64URLEncode = (str) => {
  return str.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
}

const sha256 = (buffer) => {
  return crypto
    .createHash('sha256')
    .update(buffer)
    .digest()
}

const useStyles = (theme) => ({
  root: {
    flex: '1 1 auto',
    background: theme.palette.background.default,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    '& Link':{
      color:'#646e6e'
    },
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
})

const Redirect = ({
  config,
  codeVerifier,
}) => {
  const styles = useStyles(useTheme())
  const redirect = (e) => {
    e.stopPropagation()
    const code_challenge = base64URLEncode(sha256(codeVerifier))
    const url = [
      `${config.authorization_endpoint}?`,
      `client_id=${config.client_id}&`,
      `scope=${config.scope}&`,
      `response_type=code&`,
      `redirect_uri=${config.redirect_uri}&`,
      `code_challenge=${code_challenge}&`,
      `code_challenge_method=S256`,
    ].join('')
    window.location = url
  }
  return (
    <div css={styles.root} style={{flexDirection: 'column'}}>
      <img src={Logo} width="150" height="150"></img><br></br>
      <Button variant='contained' color="secondary">
        <Link onClick={redirect} style={{color:'#f1f0ea'}}>Login with OpenID Connect and OAuth2</Link>
      </Button>
    </div>
  )
}

const Tokens = ({
  oauth
}) => {
  const {setOauth} = useContext(Context)
  const styles = useStyles(useTheme())
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const logout = (e) => {
    e.stopPropagation()
    setOauth(null)
  }
  return (
    <div css={styles.root}>
      Welcome {email} <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  // const location = useLocation();
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const {oauth, setOauth, currentUser, setCurrentUser} = useContext(Context)
  const [users, setUsers] = useState([])
  const config = {
    authorization_endpoint: 'http://127.0.0.1:5556/dex/auth',
    token_endpoint: 'http://127.0.0.1:5556/dex/token',
    client_id: 'webtech-frontend',
    redirect_uri: 'http://127.0.0.1:3000',
    scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')
  // is there a code query parameters in the url 
  if(!code){ // no: we are not being redirected from an oauth server
    if(!oauth){
      const codeVerifier = base64URLEncode(crypto.randomBytes(32))
      setCookie('code_verifier', codeVerifier)
      return (
        <Redirect codeVerifier={codeVerifier} config={config} css={styles.root} />
      )
    }else{ // yes: user is already logged in, great, is is working
      return (
        <Tokens oauth={oauth} css={styles.root} />
      )
    }
  }else{ // yes: we are coming from an oauth server
    const codeVerifier = cookies.code_verifier

    useEffect( () => {
      const fetch = async () => {
        try {
          const {data} = await axios.post(
            config.token_endpoint
          , qs.stringify ({
            grant_type: 'authorization_code',
            client_id: `${config.client_id}`,
            code_verifier: `${codeVerifier}`,
            redirect_uri: `${config.redirect_uri}`,
            code: `${code}`,
          }))
          removeCookie('code_verifier')
          setOauth(data)
          // window.location = '/'
        }catch (err) {
          console.error(err)
        }
      }
      fetch()
    })
    return (
        <div css={styles.root}>
          <div >
          <h1 style={{color:'#4db6ac'}}>ECE Chat</h1>
            <form css={styles.form}>
             <fieldset>
              <Input placeholder="Login"   id="username" inputProps={{ 'aria-label': 'description' }} color="primary" required/>
            </fieldset>
            <fieldset>
              <Input placeholder="Password"  id="password" inputProps={{ 'aria-label': 'description' }} color="primary" type="password" />
            </fieldset>
              <Button color="primary" variant='outlined' type="submit" value="login" onClick={ (e) => {
                e.stopPropagation()
                onUser({username : oauth.email})
                }}>
                Login
              </Button>
            </form>
          </div>
         </div>
      );
  }
}

