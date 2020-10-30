import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Redirect,  } from 'react-router-dom';
// import { getToken } from './fetches/authentication';
import { login } from './store/actions/auth';


const LoginPanel = () => {
    const [ email, setEmail ] = useState('demo@email.com');
    const [ password, setPassword] = useState('passwordbro');

    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(email, password));
        // const token = await getToken(email, password);
        // if (token) {
        //     setToken(token);
        //     return
        // }
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
                <input
                    type="text"
                    placeholder="Email"
                    value={email}
                    onChange={updateEmail}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={updatePassword}
                />
                <button type="submit">Login</button>
            </form>
        </main>
    )
}

export default LoginPanel;
