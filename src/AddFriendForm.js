import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect,  } from 'react-router-dom';
import { inviteFriend } from './store/actions/friends';
import { getUser } from './store/actions/auth';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputField from './TextField';

const AddFriendForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const token = useSelector(state => state.authReducer.token);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await getUser(token);
        dispatch(inviteFriend({user, email}));
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updateMessage = (e) => {
        setMessage(e.target.value);
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <InputField
                    id="email"
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                />
                <TextareaAutosize areia-labal="textarea" rowsMin={5} placeholder="Message (optional)" />
                <Button type="submit" color="secondary" onClick={handleSubmit}>Send</Button>
            </form>
        </main>
    )
}

export default AddFriendForm;
