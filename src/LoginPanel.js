import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Redirect,  } from 'react-router-dom';
import { login } from './store/actions/auth';
import Button from '@material-ui/core/Button';
import InputField from './TextField';

const LoginPanel = ({ formVisible, showForm }) => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword] = useState('');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));

    };

    const handleDemo = async (e) => {
        e.preventDefault();
        dispatch(login("email@email.com", "demopassword"));
    }

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }

    return (
        <div className="loginpanel">
            <div className="login-container">
                <div className="login-header">BreakEven</div>
                <div className="center-button demo-button">
                    <Button variant="contained" color="secondary" onClick={handleDemo}>DEMO</Button>
                </div>
                <div className="login-subheader">Sign In</div>
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
                        <div className="center-button">
                            <Button type="submit" color="secondary" onClick={handleSubmit}>Submit</Button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
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
