import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect,  } from 'react-router-dom';
import { login } from './store/actions/auth';
import Button from '@material-ui/core/Button';
import InputField from './TextField';

const LoginPanel = ({ formVisible, showForm }) => {
    const [ email, setEmail ] = useState('demo@email.com');
    const [ password, setPassword] = useState('passwordbro');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
            <main className="centered middled">
                <form onSubmit={handleSubmit}>
                    <InputField
                        id="Email"
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={updateEmail}
                        />
                    <InputField
                        id="Password"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={updatePassword}
                        />
                    <Button type="submit" color="secondary" onClick={handleSubmit}>Login</Button>
                </form>
            </main>
            )
}

const LoginPanelContainer = () => {
    const formVisible = useSelector ((state) => state.uiReducer.formVisible);
    const dispatch = useDispatch();
    return (
        <LoginPanel
            formVisible={formVisible}
            showForm={() => dispatch(showForm())}
        />
    )
}
export default LoginPanelContainer;
