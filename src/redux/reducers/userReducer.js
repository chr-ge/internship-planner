import { 
    SET_USER, SET_AUTHENTICATED, SET_UNAUTHENTICATED, LOADING_USER, 
    LIKE_INTERNSHIP, UNLIKE_INTERNSHIP, MARK_NOTIFICATIONS_READ 
} from '../types';

const initialState = {
    authenticated: false,
    credentials: {},
    likes: [],
    notifications: [],
    loading: false
};

export default function(state = initialState, action){
    switch(action.type){
        case SET_AUTHENTICATED:
            return {
                ...state,
                authenticated: true
            };
        case SET_UNAUTHENTICATED: 
            return initialState;
        case SET_USER:
            return {
                authenticated: true,
                loading: false,
                ...action.payload
            };
        case LOADING_USER:
            return {
                ...state,
                loading: true
            };
        case LIKE_INTERNSHIP:
            return {
                ...state,
                likes: [
                    ...state.likes,
                    {
                        userHandle: state.credentials.handle,
                        internshipId: action.payload.internshipId
                    }
                ]
            };
        case UNLIKE_INTERNSHIP:
            return {
                ...state,
                likes: state.likes.filter((like) => like.internshipId !== action.payload.internshipId)
            };
        case MARK_NOTIFICATIONS_READ: 
            state.notifications.forEach((not) => not.read = true);
            return {
                ...state
            };
        default:
            return state;
    }
}