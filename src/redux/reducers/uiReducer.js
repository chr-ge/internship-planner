import { 
    SET_ERRORS, CLEAR_ERRORS, LOADING_UI, STOP_LOADING_UI,
    SET_DARK_MODE, UNSET_DARK_MODE 
} from '../types';

const initialState = {
    darkMode: false,
    loading: false,
    errors: null
}

export default function(state = initialState, action){
    switch(action.type){
        case SET_ERRORS:
            return {
                ...state,
                loading: false,
                errors: action.payload
            };
        case CLEAR_ERRORS: 
            return {
                ...state,
                loading: false,
                errors: null
            };
        case LOADING_UI:
            return {
                ...state,
                loading: true
            };
        case STOP_LOADING_UI:
            return {
                ...state,
                loading: false
            }
        case SET_DARK_MODE:
            return {
                ...state, 
                darkMode: true
            }
        case UNSET_DARK_MODE:
            return {
                ...state, 
                darkMode: false
            }
        default:
            return state;
    }
}