import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import AppLogo from '../images/logo.png';

//material-ui
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = (theme) => ({
    ...theme
})

export class login extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        const userData = {
            email: this.state.email,
            password: this.state.password
        }
        axios.post('/login', userData)
            .then((result) => {
                this.setState({ loading: false });
                this.props.history.push('/');
            })
            .catch((error) => {
                this.setState({
                    errors: error.response.data,
                    loading: false
                })
            })

    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
            <div className={classes.loginContainer}>
                <img src={AppLogo} alt="Internship Planner Logo" className={classes.image}/>
                <Typography variant="h2" className={classes.pageTitle}>Login</Typography>
                <form noValidate onSubmit={this.handleSubmit}>
                    <TextField 
                        id="email" 
                        name="email"
                        type="email" 
                        label="Email" 
                        className={classes.textField}
                        helperText={errors.email}
                        error={errors.email ? true : false}
                        value={this.state.email}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    <TextField 
                        id="password" 
                        name="password"
                        type="password" 
                        label="Password" 
                        className={classes.textField}
                        helperText={errors.password}
                        error={errors.password ? true : false}
                        value={this.state.password}
                        onChange={this.handleChange}
                        fullWidth
                    />
                    {errors.general && (
                        <Typography variant="body2" className={classes.wrongError}>
                            {errors.general}
                        </Typography>
                    )}
                    <Button 
                        type="submit" 
                        variant="contained"
                        color="primary"
                        className={classes.button}
                        disabled={loading}
                    >
                        Login
                        { loading && <CircularProgress size={30} className={classes.progess}/> }
                    </Button>
                    <br />
                    <small>Don't have an account? <Link to="/signup">Sign Up</Link></small>
                </form>
            </div>
        )
    }
}

login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(login)
