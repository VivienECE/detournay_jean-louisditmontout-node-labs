/** @jsx jsx */
import { jsx } from '@emotion/core'
const styles = {
  header: {
    height: '60px',
    backgroundColor: 'rgba(255,255,255,.1)',
    flexShrink: 0,
  },
}

export default () => { 
	return (
      <header css={styles.header}>
        <h2>Messagerie</h2>
      </header>
  	);
}