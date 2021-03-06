import React, { Component } from 'react';
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import CommentForm from './CommentForm';
import Comments from './Comments';
import dayjs from 'dayjs';
import theme from '../../util/theme';

//material-ui
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
//icons
import CloseIcon from '@material-ui/icons/Close';
import UnfoldMore from '@material-ui/icons/UnfoldMore';
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import { connect } from 'react-redux';
import { getInternship, clearErrors } from '../../redux/actions/dataActions';

const styles = {
    ...theme.css,
    expandButton:{
        position: 'absolute',
        left: '91%'
    },
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
    spinnerDiv:{
        textAlign: 'center',
        margin: '50px 0'
    },
    closeButton: {
        position: 'absolute',
        left: '91%',
        top: '6%'
    },
}

class InternshipDialog extends Component {
    state = {
        open: false,
        oldPath: '',
        newPath: ''
    }

    componentDidMount(){
        if(this.props.openDialog){
            this.handleOpen();
        }
    }

    handleOpen = () => {
        let oldPath = window.location.pathname;
        const { userHandle, internshipId } = this.props;
        const newPath = `/users/${userHandle}/i/${internshipId}`;
        if(oldPath === newPath) oldPath = `/users/${userHandle}`;
        window.history.pushState(null, null, newPath);

        this.setState({ open: true, oldPath: oldPath, newPath: newPath });
        this.props.getInternship(this.props.internshipId);
    }

    handleClose = () => {
        window.history.pushState(null, null, this.state.oldPath);
        this.setState({ open: false });
        this.props.clearErrors();
    }

    render() {
        const { classes,
                internship: { internshipId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments }, 
                loading 
        } = this.props;

        const dialogMarkup = loading 
            ? <div className={classes.spinnerDiv}><CircularProgress size={50}/></div>
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
                        <LikeButton internshipId={internshipId}/>
                        <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                        <MyButton tip="comments">
                            <ChatIcon color="primary" />
                        </MyButton>
                        <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
                    </Grid>
                    <hr className={classes.visibleSeparator}/>
                    <CommentForm internshipId={internshipId} />
                    <Comments comments={comments} />
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
    getInternship: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    loading: state.UI.loading,
    internship: state.data.internship
});

const mapActionsToProps = {
    getInternship,
    clearErrors
}

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(InternshipDialog));
