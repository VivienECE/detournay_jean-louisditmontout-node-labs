import {createMuiTheme} from '@material-ui/core/styles';
import deepOrange from '@material-ui/core/colors/deepOrange';
import orange from '@material-ui/core/colors/orange';
import cyan from '@material-ui/core/colors/cyan';
import teal from '@material-ui/core/colors/teal';

const theme = createMuiTheme({
    palette: {
      primary: {
        main: deepOrange[300],
      },
      secondary: {
        main: '#4db6ac',
      },
      background: orange[50],
      textPrimary: '#fafafa',
    },
  /*palette: {
    primary : blue,
    secondary: white,
    //background: 'linear-gradient(45deg,  #270c59 30%, #184d5d 90%)',
    background: 'rgba(255,255,255,.1)',
    
    //textSecondary: white,
  },*/
});

export default theme;
