import { baseUrl } from '../../config';

export const SEND_REQUEST = 'friends/SEND_REQUEST';

export const sendRequest = (email) => ({ type: SEND_REQUEST, email })

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

export const getFriends = (user) =>  async dispatch => {
    const res = await fetch
    //
}
