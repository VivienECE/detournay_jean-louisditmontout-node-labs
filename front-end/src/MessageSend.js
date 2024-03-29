
/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Button from "@material-ui/core/Button"
// import Icon from "@material-ui/core/Icon"
import SendIcon from "@material-ui/icons/Send";
import TextField from '@material-ui/core/TextField';
import { useTheme } from '@material-ui/core/styles';
import { useState } from 'react';
import axios from 'axios';
import Context from './Context'
import {useContext} from 'react';


const useStyles = (theme) => {
  // See https://github.com/mui-org/material-ui/blob/next/packages/material-ui/src/OutlinedInput/OutlinedInput.js
  const borderColor = theme.palette.mode === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)';
  return {
    form: {
      borderTop: `2px solid #4db6ac`,
      padding: '.5rem',
      display: 'flex',
      background: 'rgba(255, 255, 255, 0.1)',
      border: 'none',
      outline: 'none',
    },
    content: {
      flex: '1 1 auto',
      marginRight: '.5rem',
      background: 'rgba(255, 255, 255, 0.03)',
      border: 'none',
      color: '#fff',
      outline: 'none',
      '&.MuiTextField-root': {
        marginRight: theme.spacing(1),
      },
    },
  }
}

const MessageSend = ({
  addMessage,
  channel,
  }) => {
  const [content, setContent] = useState('')
  const {oauth, setOauth} = useContext(Context)
  var email = oauth.email
  const styles = useStyles(useTheme())
  const onSubmit = async () => {
    const axiosdata = {
      content: content,
      author: email
     };
     const config = {
       headers: {
            'Authorization': `Bearer ${oauth.access_token}`
       }
     };
    const {data: message} = await axios.post(`http://localhost:3001/channels/${channel.id}/messages`, axiosdata, config)
    addMessage(message)
    setContent('')
  }
  const handleChange = (e) => {
    setContent(e.target.value)
  }
  return (
    <form css={styles.form} onSubmit={onSubmit} noValidate>
          <TextField
            id="outlined-multiline-flexible"
            label="Message"
            multiline
            rowsMax={4}
            value={content}
            onChange={handleChange}
            variant="outlined"
            css={styles.content}
          />
          <div>
            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth="true"
              css={styles.send}
              endIcon={<SendIcon />}
              onClick={onSubmit}
            >
              Send
            </Button>
          </div>
        </form>
  )
  }

  export default MessageSend;
