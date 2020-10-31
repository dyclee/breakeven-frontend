import { SEND_REQUEST } from '../actions/friends';

export default function friendReducer(state = { requests: []}, action) {
    switch (action.type) {
        case SEND_REQUEST: {
            const newState = {...state }
            newState.requests.push(action.email);
            return newState;
        }
        default: return state;
    }
}
