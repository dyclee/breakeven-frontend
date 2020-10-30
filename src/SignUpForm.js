import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { createAccount } from './store/actions/auth';
import InputField from './TextField';

import { Redirect, Route, useHistory } from 'react-router-dom';


const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const dispatch = useDispatch();

    const history = useHistory();

    const handleClick = (e) => history.push('/login')


    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            fullName,
            email,
            password,
            confirmPassword,
        };
        dispatch(createAccount(data));
    }

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }
    return (
        <main className="centered middled">
            <form onSubmit={handleSubmit}>
                <InputField
                    id="fullName"
                    type="text"
                    placeholder="Name"
                    value={fullName}
                    onChange={updateProperty(setFullName)}
                />
                <InputField
                    id="email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={updateProperty(setEmail)}
                />
                <InputField
                    id="password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updateProperty(setPassword)}
                />
                <InputField
                    id="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={updateProperty(setConfirmPassword)}
                />
                <Button type="submit" color="secondary" onClick={handleSubmit}>Create Account</Button>
                <Button type="button" color="secondary" onClick={handleClick}>Cancel</Button>
            </form>
        </main>
    )
}

const SignUpFormContainer = () => {
    const dispatch = useDispatch();

    return (
        <SignupForm/>
    )
}
export default SignUpFormContainer;
