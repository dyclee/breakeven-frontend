import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect,  } from 'react-router-dom';
import { inviteFriend } from './store/actions/friends';
import { getUser } from './store/actions/auth';
import Button from '@material-ui/core/Button';
import InputField from './TextField';

const AddFriendForm = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const token = useSelector(state => state.authReducer.token);
    const user = getUser(token);

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(inviteFriend({user, email}));
    }
}

const AddFriendFormContainer = () => {

}
