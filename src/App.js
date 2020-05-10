import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import './App.css';

//Components
import Navbar from './components/Navbar';

//Pages
import home from './pages/home';
import login from './pages/login';
import signup from './pages/signup';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#B0F4E6',
      main: '#12D3CF',
      dark: '#0D0221',
      contrastText: '#FCF9EC'
    },
    secondary: {
      light: '#B0F4E6',
      main: '#67EACA',
      dark: '#12D3CF',
      contrastText: '#FCF9EC'
    }
  },
  typography: {
    useNextVariants: true
  },
  loginContainer: {
    textAlign: 'center',
    margin: '0 auto',
    maxWidth: 600
  },
  image: {
      margin: '20px auto'
  },
  pageTitle: {
      margin: '10px auto'
  },
  textField: {
      margin: '10px auto'
  },
  button: {
      marginTop: 20,
      position: 'relative'
  },
  wrongError: {
      color: '#F44336',
      marginTop: 10
  },
  progress: {
      position: 'absolute'
  }
});

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <div className="App">
        <Router>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path="/" component={home} />
              <Route exact path="/login" component={login} />
              <Route exact path="/signup" component={signup} />
            </Switch>
          </div>
        </Router>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
