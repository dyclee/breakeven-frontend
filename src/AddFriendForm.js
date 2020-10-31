import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect, useHistory } from 'react-router-dom';
import { inviteFriend } from './store/actions/friends';
import {hideForm, showForm } from './store/actions/ui';
import { getUser } from './store/actions/auth';
import Button from '@material-ui/core/Button';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import InputField from './TextField';

const AddFriendForm = ({hideForm, showForm}) => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const token = useSelector(state => state.authReducer.token);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = await getUser(token);
        dispatch(inviteFriend({user, email}));
        alert("Friend request sent");
        hideForm();
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                />
                <TextareaAutosize aria-label="textarea" rowsMin={5} placeholder="Message (optional)" />
                <Button type="submit" color="secondary" onClick={handleSubmit}>Send</Button>
                <Button type="button" color="secondary" onClick={hideForm}>Cancel</Button>
            </form>
        </main>
    )
}

const AddFriendFormContainer = () => {
    const dispatch = useDispatch();
    return (
        <AddFriendForm
            hideForm={() => dispatch(hideForm())}
            showForm={() => dispatch(showForm())}
        />
    )
}
export default AddFriendFormContainer;
