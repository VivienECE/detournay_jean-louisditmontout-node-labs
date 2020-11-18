import {createMuiTheme} from '@material-ui/core/styles';
import white from '@material-ui/core/colors/purple';
import blue from '@material-ui/core/colors/blue';
const theme = createMuiTheme({
  palette: {
    primary : blue,
    secondary: white,
    //background: 'linear-gradient(45deg,  #270c59 30%, #184d5d 90%)',
    background: 'rgba(255,255,255,.1)',
    //textPrimary: white,
    //textSecondary: white,
  },
});

export default theme;
