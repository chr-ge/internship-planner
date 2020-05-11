import { SET_INTERNSHIPS, LOADING_DATA, LIKE_INTERNSHIP, UNLIKE_INTERNSHIP, DELETE_INTERNSHIP } from '../types';
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

export const likeInternship = (internshipId) => (dispatch) => {
    axios
        .get(`/internship/${internshipId}/like`)
        .then((result) => {
            dispatch({
                type: LIKE_INTERNSHIP,
                payload: result.data
            });
        })
        .catch((error) => console.log(error));
}

export const unlikeInternship = (internshipId) => (dispatch) => {
    axios
        .get(`/internship/${internshipId}/unlike`)
        .then((result) => {
            dispatch({
                type: UNLIKE_INTERNSHIP,
                payload: result.data
            });
        })
        .catch((error) => console.log(error));
}

export const deleteInternship = (internshipId) => (dispatch) => {
    axios
        .delete(`/internship/${internshipId}`)
        .then(() => {
            dispatch({
                type: DELETE_INTERNSHIP,
                payload: internshipId 
            });
        })
        .catch((error) => console.log(error));
}