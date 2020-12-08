/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';
import Context from './Context'
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';


const styles = {
  footer: {
    height: '30px',
    backgroundColor: 'rgba(255,138,101,.9)',
    flexShrink: 0,
    
  },
}

export default () => { 
  const {oauth} = useContext(Context)
	return (
      <footer css={styles.footer}>
        <div align="center"> 
          <Typography color ='inherit'>
          Nice to see you {oauth && oauth.email} !
        </Typography>
        </div>
      </footer>
  	);
}
