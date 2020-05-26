import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import createMuiTheme from '@material-ui/core/styles/createMuiTheme';
import { MuiThemeProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import AuthRoute from '../../util/AuthRoute';
import themeObject from '../../util/theme';
import themeDarkObject from '../../util/themeDark';

//Components
import Navbar from '../../components/layout/Navbar';
//Pages
import home from '../../pages/home';
import login from '../../pages/login';
import signup from '../../pages/signup';
import user from '../../pages/user';

//Redux
import { connect } from 'react-redux';

class Routes extends Component {
    render() {
        const { darkMode } = this.props;

        return (
            <MuiThemeProvider 
                theme={darkMode 
                    ? createMuiTheme(themeDarkObject)
                    : createMuiTheme(themeObject)}
             >
                <CssBaseline />
                <Router>
                    <Navbar />
                    <div className="container">
                        <Switch>
                            <Route exact path="/" component={home}/>
                            <AuthRoute exact path="/login" component={login}/>
                            <AuthRoute exact path="/signup" component={signup}/>
                            <Route exact path="/users/:handle" component={user}/>
                            <Route exact path="/users/:handle/i/:internshipId" component={user}/>
                        </Switch>
                    </div>
                </Router>
            </MuiThemeProvider>
        )
    }
}

Navbar.propTypes = {
    darkMode: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
    darkMode: state.UI.darkMode
});

export default connect(mapStateToProps)(Routes);
