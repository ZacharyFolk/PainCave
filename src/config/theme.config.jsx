import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nanum Gothic',
  },
  palette: {
      primary: {
        main: '#303030'
      },
      secondary: {
        main: '#8ec5fc',
      },
      type: 'dark',
  },
});

export default theme;