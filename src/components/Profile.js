import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

//material-ui
import Button from "@material-ui/core/Button";
import { connect } from "react-redux";
import theme from "../util/theme";

const styles = {
    ...theme.css
};

class Profile extends Component {
  render() {
    const {
      classes,
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
      },
    } = this.props;

    let profileMarkup = !loading ? (authenticated ? (
      <Paper className={classes.paper}>
        <div className={classes.profile}>
          
        </div>
      </Paper>
    ) : ()) : (<p>Loading...</p>)

    return profileMarkup;
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
});

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default connect(mapStateToProps)(withStyles(styles)(Profile));
