import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import MyButton from '../util/MyButton';
import dayjs from 'dayjs';
import theme from "../util/theme";

//material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
//Redux
import { connect } from 'react-redux';
import { getInternship } from '../redux/actions/dataActions';

const styles = {
    ...theme.css,
    profileImage: {
        width: 200,
        height: 200,
        objectFit: 'cover',
        maxWidth: '100%',
        borderRadius: '50%'
    },
    dialogContent: {
        padding: 20
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
}

export class InternshipDialog extends Component {
    state = {
        open: false
    }

    handleOpen = () => {
        this.setState({ open: true });
        this.props.getInternship(this.props.internshipId);
    }

    handleClose = () => {
        this.setState({ open: false });
    }

    render() {
        const { classes,
                internship: { internshipId, body, createdAt, likeCount, commentCount, userImage, userHandle }, 
                loading 
        } = this.props;

        const dialogMarkup = loading 
            ? <CircularProgress/> 
            : ( <Grid container spacing={2}>
                    <Grid item sm={5}>
                        <img src={userImage} alt="User" className={classes.profileImage} />
                    </Grid>
                    <Grid item sm={7}>
                        <Typography 
                        component={Link} 
                        color="primary" 
                        variant="h5"
                        to={`/user/${userHandle}`}
                    >
                            @{userHandle}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body2" color="textSecondary">
                            {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
                        </Typography>
                        <hr className={classes.invisibleSeparator}/>
                        <Typography variant="body1">
                            {body}
                        </Typography>
                    </Grid>
                </Grid>)

        return (
            <>
                <MyButton tip="Expand Internship" onClick={this.handleOpen} tipClassName={classes.expandButton}>
                    <UnfoldMore color="primary" />
                </MyButton>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleClose}
                    maxWidth="sm"
                    fullWidth
                >
                    <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}><CloseIcon /></MyButton>
                    <DialogContent className={classes.dialogContent}>
                        {dialogMarkup}
                    </DialogContent>
                </Dialog>
            </>
        )
    }
}

InternshipDialog.propTypes = {
    classes: PropTypes.object.isRequired,
    internshipId: PropTypes.string.isRequired,
    userHandle: PropTypes.string.isRequired,
    internship: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    getInternship: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    internship: state.data.internship
});

export default connect(mapStateToProps, { getInternship })(withStyles(styles)(InternshipDialog));
