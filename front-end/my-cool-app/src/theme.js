import {createMuiTheme} from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
  palette: {
    primary : blue,
    secondary: purple,
    //background: 'linear-gradient(45deg,  #270c59 30%, #184d5d 90%)',
    background: 'rgba(255,255,255,.1)',
  },
  button: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
  }
});

export default theme;
