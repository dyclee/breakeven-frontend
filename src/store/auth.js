import { baseUrl } from '../config';

const TOKEN_KEY = 'auth/token';
const SET_TOKEN = 'authentication/SET_TOKEN';
const REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';

export const removeToken = () => ({ type: REMOVE_TOKEN });
export const setToken = token => ({ type: SET_TOKEN, token });

export const loadToken = () => async dispatch => {
    const token = window.localStorage.getItem(TOKEN_KEY);
    if (token) {
        dispatch(setToken(token));
    }
}

export const login = (email, password) => async dispatch => {
    const res = await fetch(`${baseUrl}/session`, {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const { tokenObj: { token } } = await response.json();
        window.localStorage.setItem(TOKEN, token);
        dispatch(setToken(token));
    }
};

export const logout = () => async (dispatch, getState) => {
    const res = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if (res.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
    }
}

export default function authReducer(state = {}, action) {
    switch (action.type) {
        case SET_TOKEN: {
            return {
                ...state,
                token: action.token,
            };
        }
        case REMOVE_TOKEN: {
            const newState = { ...state };
            delete newState.token;
            return newState;
        }
        default: return state;
    }
}
