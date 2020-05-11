import { SET_INTERNSHIPS, LOADING_DATA, LIKE_INTERNSHIP, UNLIKE_INTERNSHIP } from '../types';

const initialState = {
    internships: [],
    internship: {},
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case LOADING_DATA:
            return {
                ...state,
                loading: true
            }
        case SET_INTERNSHIPS:
            return {
                ...state,
                internships: action.payload,
                loading: false
            };
        case LIKE_INTERNSHIP: 
        case UNLIKE_INTERNSHIP:
            let index = state.internships
                .findIndex((internship) => internship.internshipId === action.payload.internshipId);
                state.internships[index] = action.payload;
            if (state.internship.internshipId === action.payload.internshipId) {
                state.internship = action.payload;
            }
            return {
                ...state
            }
        default:
            return state;
    }
}