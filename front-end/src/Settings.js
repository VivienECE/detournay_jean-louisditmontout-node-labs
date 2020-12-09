/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Context  from './Context';
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import {useState} from 'react';
import Switch from '@material-ui/core/Switch';


const styles = {
  root: {
    color:'#4db6ac',
    backgroundColor: '#f1f0ea',
    height: '100%',
    flex: '1 1 auto',
    display: 'flex',
    textAlign: 'center',
    minWidth: '500px',
  },
}

const Settings = () => { 
  const {oauth} = useContext(Context)

  const [state, setState] = useState({
    darkMode: false,
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

	return (
    <div css={styles.root}>
      <h1 align="center">Settings</h1><br/>
        <div align="center"> 
          <form>
            <Switch
              checked={state.darkMode}
              onChange={handleChange}
              name="darkMode"
              inputProps={{ 'aria-label': 'primary checkbox' }}
            />
          </form>
        </div>
    </div> 
  	)
}

export default Settings;