import { 
    SET_INTERNSHIPS, SET_INTERNSHIP, LOADING_DATA, LIKE_INTERNSHIP, UNLIKE_INTERNSHIP, SUBMIT_COMMENT,
    DELETE_INTERNSHIP, SET_ERRORS, CLEAR_ERRORS, POST_INTERNSHIP, LOADING_UI, STOP_LOADING_UI
} from '../types';
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
};

export const getInternship = (internship) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .get(`/internship/${internship}`)
        .then((result) => {
            dispatch({
                type: SET_INTERNSHIP,
                payload: result.data
            });
            dispatch({ type: STOP_LOADING_UI });
        })
        .catch((error) => console.log(error));
}

export const postInternship = (newInternship) => (dispatch) => {
    dispatch({ type: LOADING_UI })
    axios
        .post('/createInternship', newInternship)
        .then((result) => {
            dispatch({
                type: POST_INTERNSHIP,
                payload: result.data
            });
            dispatch(clearErrors());
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
};

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
};

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
};

export const submitComment = (internshipId, commentData) => (dispatch) => {
    axios
        .post(`/internship/${internshipId}/comment`, commentData)
        .then((result) => {
            dispatch({
                type: SUBMIT_COMMENT,
                payload: result.data
            });
            dispatch(clearErrors());
        })
        .catch((error) => {
            dispatch({
                type: SET_ERRORS,
                payload: error.response.data
            });
        });
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
};

export const getUserData = (userHandle) => (dispatch) => {
    dispatch({ type: LOADING_DATA });
    axios
        .get(`/user/${userHandle}`)
        .then((result) => {
            dispatch({
                type: SET_INTERNSHIPS,
                payload: result.data.internships
            });
        })
        .catch(() => {
            dispatch({
                type: SET_INTERNSHIPS,
                payload: null
            });
        });
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}