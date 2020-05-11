import { SET_INTERNSHIPS, LOADING_DATA, LIKE_INTERNSHIP, UNLIKE_INTERNSHIP } from '../types';
import axios from 'axios';

export const getInternships = () => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get('/internships')
        .then((result) => {
            dispatch({
                type: SET_INTERNSHIPS,
                payload: result.data
            });
        })
        .catch((error) => {
            dispatch({
                type: SET_INTERNSHIPS,
                payload: []
            });
        });
}

export const likeInternship = (screamId) => (dispatch) => {
    axios
        .get(`/internship/${screamId}/like`)
        .then((result) => {
            dispatch({
                type: LIKE_INTERNSHIP,
                payload: result.data
            });
        })
        .catch((error) => console.log(error));
}

export const unlikeInternship = (screamId) => (dispatch) => {
    axios
        .get(`/internship/${screamId}/unlike`)
        .then((result) => {
            dispatch({
                type: UNLIKE_INTERNSHIP,
                payload: result.data
            });
        })
        .catch((error) => console.log(error));
}