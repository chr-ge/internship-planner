import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import MyButton from '../util/MyButton';
import theme from "../util/theme";

//material-ui
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
//Redux
import { connect } from 'react-redux';
import { postInternship, clearErrors } from '../redux/actions/dataActions';

const styles = {
    ...theme.css,
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
    submitButton: {
        position: 'relative',
        float: 'right',
        marginTop: 10,
        marginBotton: 15
    },
    progressSpinner: {
        position: 'absolute'
    }
}

export class PostInternship extends Component {
    state = {
        open: false,
        body: '',
        errors: {}
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.UI.errors){
            this.setState({ errors : nextProps.UI.errors });
        }
        if(!nextProps.UI.errors && !nextProps.UI.loading){
            this.setState({ body : '', open: false, errors: {} });
        }
    }

    handleOpen = () => {
        this.setState({ open: true });
    }

    handleClose = () => {
        this.props.clearErrors();
        this.setState({ open: false, errors: {} });
    }

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.postInternship({ body: this.state.body });
    }

    render() {
        const { errors } = this.state;
        const { classes, UI: { loading }} = this.props;
        return (
            <>
                <MyButton tip="Post an Internship" onClick={this.handleOpen}>
                    <AddIcon />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}><CloseIcon /></MyButton>
                    <DialogTitle>Post a new Internship</DialogTitle>
                    <DialogContent>
                        <form onSubmit={this.handleSubmit}>
                            <TextField
                                name="body"
                                type="text"
                                label="Internship Info"
                                multiline
                                rows="2"
                                placeholder="Tell us about the internship"
                                className={classes.textField}
                                value={this.state.body}
                                onChange={this.handleChange}
                                error={errors.body ? true : false}
                                helperText={errors.body}
                                fullWidth
                            />
                            <Button 
                                type="submit"
                                variant="contained"
                                color="primary" 
                                className={classes.submitButton}
                                disabled={loading}
                            >
                                Submit
                                {loading && 
                                    <CircularProgress size={30} className={classes.progressSpinner}/>}
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

PostInternship.propTypes = {
    classes: PropTypes.object.isRequired,
    UI: PropTypes.object.isRequired,
    postInternship: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
    UI: state.UI,
  });

export default connect(mapStateToProps, { postInternship, clearErrors })(withStyles(styles)(PostInternship));
