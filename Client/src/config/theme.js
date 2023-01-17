import { createTheme } from '@mui/material/styles';

//import theme from "./config/theme";
//import { ThemeProvider } from '@mui/material/styles';
//<ThemeProvider theme={theme.palette}>
//</ThemeProvider>

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: '#9b1111',
    },
    secondary: {
      main: '#fe5405',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    error: {
      main: '#ff0000',
    },
    success: {
      main: '#3bd044',
    },
  },
});

export default theme