import { SET_TOKEN, REMOVE_TOKEN, SET_USER, REMOVE_USER } from "../actions/auth";

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
        case SET_USER: {
            return {
                ...state,
                user: action.user,
            };
        }
        case REMOVE_USER: {
            const newState = { ...state};
            delete newState.user;
            return newState;
        }
        default: return state;
    }
}
