import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withStyles from '@material-ui/core/styles/withStyles';
import MyButton from '../util/MyButton';

//material-ui
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
//Redux
import { connect } from 'react-redux';
import { deleteInternship } from '../redux/actions/dataActions';

const styles = {
    deleteButton: {
        position: 'absolute',
        left: '91%',
        top: '10%'
    }
};

class DeleteInternship extends Component {
    state = {
        open: false
    };

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    deleteInternship = () => {
        this.props.deleteInternship(this.props.internshipId);
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        return (
            <>
                <MyButton
                    tip="Delete Internship"
                    onClick={this.handleOpen}
                    btnClassName={classes.deleteButton}
                >
                    <DeleteOutline color="secondary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <DialogTitle>Are you sure you want to delete this internship?</DialogTitle>
                    <DialogActions>
                        <Button onClick={this.handleClose} color="primary">Cancel</Button>
                        <Button onClick={this.deleteInternship} color="secondary">Delete</Button>
                    </DialogActions>
                </Dialog>
            </>
        );
    }
}

DeleteInternship.propTypes = {
    classes: PropTypes.object.isRequired,
    internshipId: PropTypes.string.isRequired,
    deleteInternship: PropTypes.func.isRequired
};

export default connect(null, { deleteInternship })(withStyles(styles)(DeleteInternship));