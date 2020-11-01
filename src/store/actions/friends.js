import { baseUrl } from '../../config';

export const SEND_REQUEST = 'friends/SEND_REQUEST';
export const GET_FRIENDS = 'friends/GET_FRIENDS';

export const sendRequest = (email) => ({ type: SEND_REQUEST, email })
export const loadFriends = (friends) => ({ type: GET_FRIENDS, friends})

export const inviteFriend = ({user, email}) => async dispatch => {
    const res = await fetch(`${baseUrl}/users/friends`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user, email })
    });

    if (res.ok) {
        dispatch(sendRequest(email))
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}

export const getFriends = (userId) =>  async dispatch => {
    const res = await fetch(`${baseUrl}/users/friends`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });

    if (res.ok) {
        const friends = await res.json();
        dispatch(loadFriends(friends));
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}
