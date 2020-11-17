/** @jsx jsx */
import { jsx } from '@emotion/core'
import { useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

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