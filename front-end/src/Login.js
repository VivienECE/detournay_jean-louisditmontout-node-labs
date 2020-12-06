import {useEffect} from 'react';
import {useCookies} from 'react-cookie'
/** @jsx jsx */
import { jsx } from '@emotion/core'
// Layout
import URLSearchParams from 'url-search-params'
import { useTheme } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';
import Link from '@material-ui/core/Link';
import axios from 'axios';
import qs from 'qs';
import crypto from 'crypto';
import Logo from "./icons/logo.png"
import {Context} from './Context';
import {useContext} from 'react';
 

const base64URLencode = (str) =>  {
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
    background: theme.palette.background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    '& > div': {
      margin: `${theme.spacing(1)}`,
      marginLeft: 'auto',
      marginRight: 'auto',
      textAlign:'center',
      display: 'table',
    },
    '& fieldset': {
      border: 'none',
      '& label': {
        marginBottom: theme.spacing(.5),
        display: 'block',
      },
    },
  },
  form: {
    display: 'table',
    textAlign : 'center',
    margin:'auto',
    verticalAlign: 'middle',
  }
})

 

const Redirect = ({
    config,
    codeVerifier,
}) => {
     //const styles = useStyles(useTheme());
     const redirect = (e) => {
         e.stopPropagation()
         const code_challenge = base64URLencode(sha256(codeVerifier))
         const url = [
             config.authorization_endpoint+'?',
             'client_id='+config.client_id+'&',
             'scope='+config.scope+'&',
             'response_type=code&',
             'redirect_uri='+config.redirect_uri+'&',
             'code_challenge='+code_challenge+'&',    
             'code_challenge_method=S256',
             ].join('')
         window.location = url
     }
     return(
      <div align="center">
        <img  src={Logo} width="120" height="120"></img>
        <h1 style={{color:'#4db6ac'}}>ECE Chat</h1>
        <Button variant="contained" color="secondary">
          <Link onClick={redirect} style={{color:'white'}}>Login with OpenID Connnect and OAuth</Link>
        </Button>
      </div> 
     )
 }

 

const Tokens = ({
  //oauth,
  css
 }) =>{
  const {oauth, setOauth} = useContext(Context)
  const styles = useStyles(useTheme());
  const [,,removeCookie] = useCookies([]);
  /*
  const {id_token} = oauth
  const id_payload = id_token.split('.')[1]
  const {email} = JSON.parse(atob(id_payload))
  const data = null;*/
  const logout = (e) => {
    e.stopPropagation()
    removeCookie('oauth')
  }
  return(
    <div css={styles.root}>
    <h2>Welcome {oauth.email}</h2> <Link onClick={logout} color="secondary">logout</Link>
    </div>
  )
}
  
export default ({
  onUser
}) => {
  //const styles = useStyles(useTheme());
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const config = {
      authorization_endpoint:'http://127.0.0.1:5556/dex/auth',
      token_endpoint: 'http://127.0.0.1:5556/dex/token',
      client_id: 'example-app',
      redirect_uri: 'http://127.0.0.1:3000',
      scope: 'openid%20email%20offline_access',
  }
  const params = new URLSearchParams(window.location.search)
  const code = params.get('code')

 

  if(!code){
    if(!cookies.oauth){
      const codeVerifier = base64URLencode(crypto.randomBytes(32))
      setCookie('code_Verifier', codeVerifier)
      return(
          <Redirect codeVerifier={codeVerifier} config={config}/>
      )
  }else{
  const styles = useStyles(useTheme());
      return(
          <Tokens css={styles.root}/>
          )
      }
  }
  else{
      const styles = useStyles(useTheme());
      const {oauth, setOauth} = useContext(Context);
      const codeVerifier = cookies.code_Verifier
      useEffect( ()=> {
          const fetch = async () => {
              try{
                const {data:oauth} = await axios.post(
                config.token_endpoint,
                qs.stringify ({
                  grant_type: 'authorization_code',
                  client_id: `${config.client_id}`,
                  code_verifier: `${codeVerifier}`,
                  redirect_uri: `${config.redirect_uri}`,
                  code: `${code}`,
                }))
                removeCookie('code_verifier')
                setCookie('oauth',oauth)
                window.location = '/'
              }catch(err){
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
