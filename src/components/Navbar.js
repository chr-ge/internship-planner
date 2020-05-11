import React, { Component } from 'react';
import PropTypes from "prop-types";
import MyButton from '../../util/MyButton';
import { Link } from 'react-router-dom';
import PostInternship from '../scream/PostScream';
import Notifications from './Notifications';

//material-ui
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
//icons
import HomeIcon from '@material-ui/icons/Home';
//Redux
import { connect } from 'react-redux';

export class Navbar extends Component {
    render() {
        const { authenticated } = this.props;
        return (
            <AppBar>
                <Toolbar className="nav-container">
                    {authenticated ? (
                        <>
                            <PostInternship />
                            <Link to="/">
                                <MyButton tip="Home">
                                    <HomeIcon />
                                </MyButton>
                            </Link>
                            <Notifications />
                        </>
                    ) : (
                        <>
                            <Button color="inherit" component={Link} to="/">Home</Button>
                            <Button color="inherit" component={Link} to="/login">Login</Button>
                            <Button color="inherit" component={Link} to="/signup">Signup</Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        )
    }
}

Navbar.propTypes = {
    authenticated: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => ({
    authenticated: state.user.authenticated,
});

export default connect(mapStateToProps)(Navbar);
