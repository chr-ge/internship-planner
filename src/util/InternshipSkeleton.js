import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import NoImg from '../images/no-img.png';
import theme from "./theme";

//material-ui
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

const styles = {
    ...theme.css,
    card: {
        display: 'flex',
        marginBottom: 20
    },
    cover: {
        minWidth: 200,
        objectFit: 'cover'
    },
    cardContent: {
        width: '100%',
        flexDirection: 'column',
        padding: 25
    },
    handle: {
        width: 60,
        height: 18,
        backgroundColor: theme.palette.primary.main,
        marginBottom: 7
    },
    date: {
        height: 14,
        width: 100,
        backgroundColor: 'rgba(0,0,0, 0.3)',
        marginBottom: 10
    },
    fullLine: {
        height: 15,
        width: '90%',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        marginBottom: 10
    },
    halfLine: {
        height: 15,
        width: '50%',
        backgroundColor: 'rgba(0,0,0, 0.5)',
        marginBottom: 7
    }
};

const InternshipSkeleton = ({ classes }) => {
    const content = Array.from({ length: 5 }).map((item, index) => (
        <Card key={index} className={classes.card}>
            <CardMedia className={classes.cover} image={NoImg} />
            <CardContent className={classes.cardContent}>
                <div className={classes.handle} />
                <div className={classes.date} />
                <div className={classes.fullLine} />
                <div className={classes.fullLine} />
                <div className={classes.halfLine} />
            </CardContent>
        </Card>
    ));
    
    return <>{content}</>;
}

InternshipSkeleton.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withStyles(styles)(InternshipSkeleton);
