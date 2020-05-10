import React, { Component } from 'react';
import axios from 'axios';
import Internship from '../components/Internship';
import Profile from '../components/Profile';

//material-ui
import Grid from '@material-ui/core/Grid';

export class home extends Component {
    state = {
        internships: null
    }
    
    componentDidMount(){
        axios.get('/internships')
            .then(result => {
                this.setState({
                    internships: result.data
                })
            })
            .catch(error => console.log(error));
    }

    render() {
        let recentInternshipsMarkup = this.state.internships 
            ? (this.state.internships.map((internship) => 
                <Internship key={internship.internshipId} internship={internship} />)) 
            : <p>Loading...</p>;
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

export default home