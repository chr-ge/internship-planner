import React, { Component } from 'react';
import PropTypes from "prop-types";
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PostInternship from '../internship/PostInternship';
import Notifications from './Notifications';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//icons
import HomeIcon from '@material-ui/icons/Home';
import ThemeIcon from '@material-ui/icons/Brightness4';
import ThemeIconOutlined from '@material-ui/icons/Brightness4Outlined';
//Redux
import { connect } from 'react-redux';
import { setDarkMode, unsetDarkMode } from '../../redux/actions/uiActions';

class Navbar extends Component {
    handleDarkMode = () => {
        if(this.props.darkMode === false)
            this.props.setDarkMode();
        else
            this.props.unsetDarkMode();
    }

    render() {
        const { authenticated, darkMode } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated 
                        ? <>
                                <PostInternship />
                                <Link to="/">
                                    <MyButton tip="Home">
                                        <HomeIcon />
                                    </MyButton>
                                </Link>
                                <Notifications />
                            </>
                        :   <>
                                <Button color="inherit" component={Link} to="/">Home</Button>
                                <Button color="inherit" component={Link} to="/login">Login</Button>
                                <Button color="inherit" component={Link} to="/signup">Signup</Button>
                            </>
                    }
                    <MyButton tip="Toggle light/dark theme" onClick={this.handleDarkMode}>
                        {darkMode ? <ThemeIcon /> : <ThemeIconOutlined />}
                    </MyButton>
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
    darkMode: PropTypes.bool.isRequired,
    setDarkMode: PropTypes.func.isRequired,
    unsetDarkMode: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
    darkMode: state.UI.darkMode
});

export default connect(mapStateToProps, { setDarkMode, unsetDarkMode })(Navbar);
