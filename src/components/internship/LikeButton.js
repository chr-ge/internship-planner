import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import MyButton from '../../util/MyButton';

//icons
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
//Redux
import { connect } from 'react-redux';
import { likeInternship, unlikeInternship } from '../../redux/actions/dataActions';

class LikeButton extends Component {
    likedInternship = () => {
        if (this.props.user.likes &&
            this.props.user.likes.find((like) => like.internshipId === this.props.internshipId))
            return true;
        else 
            return false;
    };

    likeInternship = () => {
        this.props.likeInternship(this.props.internshipId);
    };

    unlikeInternship = () => {
        this.props.unlikeInternship(this.props.internshipId);
    };

    render() {
        const { authenticated } = this.props.user;
        const likeButton = !authenticated 
            ? (<Link to="/login">
                    <MyButton tip="Like">
                        <FavoriteBorder color="primary" />
                    </MyButton>
                </Link>) 
            : this.likedInternship() 
            ? (<MyButton tip="Undo Like" onClick={this.unlikeInternship}>
                    <FavoriteIcon color="primary" />
                </MyButton>) 
            : (<MyButton tip="Like" onClick={this.likeInternship}>
                    <FavoriteBorder color="primary" />
                </MyButton>);
        return likeButton;
    }
}

LikeButton.propTypes = {
    user: PropTypes.object.isRequired,
    internshipId: PropTypes.string.isRequired,
    likeInternship: PropTypes.func.isRequired,
    unlikeInternship: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    user: state.user
});

const mapActionsToProps = {
    likeInternship,
    unlikeInternship
};

export default connect(mapStateToProps, mapActionsToProps)(LikeButton);