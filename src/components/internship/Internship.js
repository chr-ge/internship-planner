import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import MyButton from '../../util/MyButton';
import LikeButton from './LikeButton';
import DeleteInternship from './DeleteInternship';
import InternshipDialog from './InternshipDialog';

//material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//icons
import ChatIcon from '@material-ui/icons/Chat';
//Redux
import { connect } from 'react-redux';

const styles = {
    card: {
        position: 'relative',
        display: 'flex',
        marginBottom: 20
    },
    image: {
        minWidth: 200,
        objectFit: 'cover'
    },
    content: {
        padding: 25
    }
}

export class Internship extends Component {
    render() {
        dayjs.extend(relativeTime);

        const { classes, 
                internship: { body, createdAt, userImage, userHandle, internshipId, likeCount, commentCount },
                user: { authenticated, credentials: { handle } }
        } = this.props;

        const deleteButton = authenticated && userHandle === handle 
            ? <DeleteInternship internshipId={internshipId} />
            : null;

        return (
            <Card className={classes.card}>
                <CardMedia image={userImage} title="User Image" className={classes.image}/>
                <CardContent className={classes.content}>
                    <Typography 
                        variant="h5" 
                        component={Link} 
                        to={`/users/${userHandle}`}
                        color="primary"
                    >
                        {userHandle}
                    </Typography>
                    {deleteButton}
                    <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).fromNow()}
                    </Typography>
                    <Typography variant="body1">{body}</Typography>
                    <LikeButton internshipId={internshipId} />
                    <span>{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
                    <MyButton tip="comments">
                        <ChatIcon color="primary" />
                    </MyButton>
                    <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
                    <InternshipDialog internshipId={internshipId} userHandle={userHandle} />
                </CardContent>
            </Card>
        )
    }
}

Internship.propTypes = {
    classes: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    internship: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user,
});

export default connect(mapStateToProps)(withStyles(styles)(Internship));