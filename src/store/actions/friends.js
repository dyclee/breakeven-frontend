import { baseUrl } from '../../config';

export const SEND_REQUEST = 'friends/SEND_REQUEST';
export const RECEIVE_REQUESTS = 'friends/RECEIVE_REQUESTS';
export const REMOVE_REQUESTS = 'friends/REMOVE_REQUESTS';
export const DELETE_REQUEST = 'friends/DELETE_REQUEST';

export const GET_FRIENDS = 'friends/GET_FRIENDS';
export const REMOVE_FRIENDS = 'friends/REMOVE_FRIENDS';

export const sendRequest = (email) => ({ type: SEND_REQUEST, email })
export const loadRequests = (friendRequests) => ({ type: RECEIVE_REQUESTS, friendRequests})
export const removeRequests = () => ({ type: REMOVE_REQUESTS });

export const loadFriends = (friends) => ({ type: GET_FRIENDS, friends})
export const removeFriends = () => ({type: REMOVE_FRIENDS})

export const inviteFriend = ({userId, email}) => async dispatch => {
    const res = await fetch(`${baseUrl}/users/friends`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, email })
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
        const {friends} = await res.json();
        let sortedFriends = friends.sort((a, b) => {
            let fa = a.fullName.toLowerCase();
            let fb = b.fullName.toLowerCase();

            if (fa < fb) {
                return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;
        });
        dispatch(loadFriends(sortedFriends));
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}

export const receivedRequests = (userId) => async dispatch => {
    const res = await fetch(`${baseUrl}/users/friends/requests`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId })
    });

    if (res.ok) {
        const {friendRequests} = await res.json();

        dispatch(loadRequests(friendRequests));
        return;
    }
    const errorRes = await res.json();
    return errorRes;
}

export const deleteRequest = ({fromUserId, userId}) => async dispatch => {

    const res = await fetch(`${baseUrl}/users/friends/requests`, {
        method: 'delete',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friender: fromUserId, friended: userId})
    });

    if (res.ok) {
        dispatch(receivedRequests(userId));
        return
    }
    const errorRes = await res.json();
    return errorRes
}
export const addFriend = ({fromUserId, userId}) => async dispatch => {

    const res = await fetch(`${baseUrl}/users/friends/requests`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ friender: fromUserId, friended: userId})
    });

    if (res.ok) {
        dispatch(receivedRequests(userId));
        dispatch(getFriends(userId));
        return
    }
    const errorRes = await res.json();
    return errorRes;
}
