/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx } from '@emotion/core';


const styles = {
  footer: {
    height: '30px',
    //backgroundColor: 'rgba(255,255,255,.1)',
    flexShrink: 0,
  },
}

export default () => { 
	return (
      <footer css={styles.footer}>
      </footer>
  	);
}