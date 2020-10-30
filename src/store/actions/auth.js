import { baseUrl } from '../../config';

export const TOKEN_KEY = 'auth/token';
export const SET_TOKEN = 'authentication/SET_TOKEN';
export const REMOVE_TOKEN = 'authentication/REMOVE_TOKEN';

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
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
        const { tokenObj: { token } } = await res.json();
        window.localStorage.setItem(TOKEN_KEY, token);
        dispatch(setToken(token));
        return
    }
    const errorRes = await res.json();
    console.log(errorRes);

};

export const logout = () => async (dispatch, getState) => {
    const {
        authentication: { token },
    } = getState();

    const res = await fetch(`${baseUrl}/session`, {
        method: 'delete',
        headers: {
            Authorization: `Bearer ${token}`
        },
    });

    if (res.ok) {
        window.localStorage.removeItem(TOKEN_KEY);
        dispatch(removeToken());
        return
    }
    const errorRes = await res.json();
    console.log(errorRes);
}
