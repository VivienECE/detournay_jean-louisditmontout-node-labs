import {} from 'react';
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
// Layout
import { useTheme } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import Input from '@material-ui/core/Input';


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

export default ({
  onUser
}) => {
  const styles = useStyles(useTheme())
  return (
    <div css={styles.root}>
      <div > 
        <form css={styles.form}>
         <fieldset>
          <Input placeholder="Login"   id="username" inputProps={{ 'aria-label': 'description' }} color="primary" required/>
        </fieldset>
        <fieldset>
          <Input placeholder="Password"  id="password" inputProps={{ 'aria-label': 'description' }} color="primary" type="password" />
        </fieldset>
          <Button color="primary" variant='outlined' type="submit" value="login" onClick={ (e) => {
            e.stopPropagation()
            onUser({username: 'david'})}}>
            Login
          </Button>
        </form>
      </div>
     </div>
  );
}
