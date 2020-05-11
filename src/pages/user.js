import React, { Component } from 'react'
import PropTypes from "prop-types";
import axios from 'axios';
import Internship from '../components/internship/Internship';
import StaticProfile from '../components/profile/StaticProfile';

//material-ui
import Grid from '@material-ui/core/Grid';
//Redux
import { connect } from 'react-redux';
import { getUserData } from '../redux/actions/dataActions';

class user extends Component {
    state = {
        profile: null,
        internshipIdParam: null
    }

    componentDidMount(){
        const handle = this.props.match.params.handle;
        const internshipId = this.props.match.params.internshipId;

        if(internshipId) this.setState({ internshipIdParam: internshipId });

        this.props.getUserData(handle);
        axios
            .get(`/user/${handle}`)
            .then((result) => {
                this.setState({ profile: result.data.user });
            })
            .catch((error) => console.log(error));
    }

    render() {
        const { internships, loading } = this.props.data;
        const { internshipIdParam } = this.state;

        const internshipsMarkup = loading
            ? <p>Loading...</p>
            : internships === null
            ? <p>No internships from this user</p>
            : !internshipIdParam
            ? internships.map((internship) => 
                <Internship key={internship.internshipId} internship={internship} />)
            : internships.map((internship) => {
                if(internship.internshipId !== internshipIdParam)
                    return <Internship key={internship.internshipId} internship={internship} />
                else
                    return <Internship key={internship.internshipId} internship={internship} openDialog/>
            });

        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {internshipsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    {this.state.profile === null 
                        ? <p>Loading profile...</p>
                        : <StaticProfile profile={this.state.profile} />}
                </Grid>
            </Grid>
        )
    }
}

user.propTypes = {
    data: PropTypes.object.isRequired,
    getUserData: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data
});

export default connect(mapStateToProps, { getUserData })(user);
