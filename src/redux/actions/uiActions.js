import { SET_DARK_MODE, UNSET_DARK_MODE } from '../types';

export const setDarkMode = () => (dispatch) => {
    dispatch({ type: SET_DARK_MODE });
}

export const unsetDarkMode = () => (dispatch) => {
    dispatch({ type: UNSET_DARK_MODE });
}