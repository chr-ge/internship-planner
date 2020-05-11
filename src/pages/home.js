import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Internship from '../components/internship/Internship';
import Profile from '../components/profile/Profile';
import InternshipSkeleton from '../util/InternshipSkeleton';

//material-ui
import Grid from '@material-ui/core/Grid';
//Redux
import { connect } from 'react-redux';
import { getInternships } from '../redux/actions/dataActions';

export class home extends Component {  
    componentDidMount(){
        this.props.getInternships();
    }

    render() {
        const { internships, loading } = this.props.data;
        let recentInternshipsMarkup = !loading
            ? (internships.map((internship) => 
                <Internship key={internship.internshipId} internship={internship} />)) 
            : <InternshipSkeleton />;
        return (
            <Grid container spacing={2}>
                <Grid item sm={8} xs={12}>
                    {recentInternshipsMarkup}
                </Grid>
                <Grid item sm={4} xs={12}>
                    <Profile />
                </Grid>
            </Grid>
        )
    }
}

home.propTypes = {
    data: PropTypes.object.isRequired,
    getInternships: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
    data: state.data,
});

export default connect(mapStateToProps, { getInternships })(home);