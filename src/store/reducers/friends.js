import { SEND_REQUEST } from '../actions/friends';

export default function friendReducer(state = {}, action) {
    switch (action.type) {
        case SEND_REQUEST: {
            return {
                requests: [...state.requests, action.email]
            };
        }
        default: return state;
    }
}
