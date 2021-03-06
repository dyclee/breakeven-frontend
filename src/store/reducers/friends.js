import { SEND_REQUEST, RECEIVE_REQUESTS, GET_FRIENDS, REMOVE_FRIENDS, REMOVE_REQUESTS } from '../actions/friends';

export default function friendReducer(state = { requests: [] }, action) {
    switch (action.type) {
        case SEND_REQUEST: {
            const newState = {...state }
            newState.requests.push(action.email);
            return newState;
        }
        case RECEIVE_REQUESTS: {
            return {
                ...state,
                friendRequests: action.friendRequests
            }
        }
        case REMOVE_REQUESTS: {
            const newState = { ...state }
            delete newState.friendRequests
            return newState;
        }
        case GET_FRIENDS: {
            return {
                ...state,
                friends: action.friends
            }
        }
        case REMOVE_FRIENDS: {
            const newState = {...state}
            delete newState.friends;
            return newState;
        }
        default: return state;
    }
}
