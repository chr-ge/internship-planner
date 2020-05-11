import { SET_INTERNSHIPS, LOADING_DATA, LIKE_INTERNSHIP, UNLIKE_INTERNSHIP,
     DELETE_INTERNSHIP, POST_INTERNSHIP, SET_INTERNSHIP, SUBMIT_COMMENT
} from '../types';

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
        case SET_INTERNSHIP:
            return {
                ...state,
                internship: action.payload
            }
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
        case DELETE_INTERNSHIP:
            return {
                ...state,
                internships: state.internships.filter((internship) => 
                    internship.internshipId !== action.payload )
            }
        case POST_INTERNSHIP:
            return {
                ...state,
                internships: [
                    action.payload,
                    ...state.internships
                ]
            }
        case SUBMIT_COMMENT:
            return {
                ...state,
                internship: {
                    ...state.internship,
                    comments: [action.payload, ...state.internship.comments]
                }
            }
        default:
            return state;
    }
}