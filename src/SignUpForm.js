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
    const [imageUrl, setImageUrl] = useState("");

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
            imageUrl
        };
        dispatch(createAccount(data));
    }

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }
    return (
        <div className="loginpanel">
            <div className="login-container">
                <div className="login-header">BreakEven</div>
                <div className="login-subheader">Create account</div>
                <main className="centered middled">
                    <form onSubmit={handleSubmit}>
                        <InputField
                            required
                            id="Name"
                            type="text"
                            placeholder="Name"
                            value={fullName}
                            onChange={updateProperty(setFullName)}
                            />
                        <InputField
                            required
                            id="Email"
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={updateProperty(setEmail)}
                            />
                        <InputField
                            required
                            id="Password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={updateProperty(setPassword)}
                            />
                        <InputField
                            required
                            id="Confirm Password"
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={updateProperty(setConfirmPassword)}
                        />
                        <InputField
                            id="Profile Image URL"
                            type="text"
                            placeholder="Profile Image URL"
                            value={imageUrl}
                            onChange={updateProperty(setImageUrl)}
                        />
                        <div className="space-around">
                            <Button type="submit" color="secondary" onClick={handleSubmit}>Create</Button>
                            <Button type="button" color="secondary" onClick={handleClick}>Cancel</Button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    )
}

const SignUpFormContainer = () => {
    const dispatch = useDispatch();

    return (
        <SignupForm/>
    )
}
export default SignUpFormContainer;
