import React, { useState, useContext} from 'react';
import { Redirect,  } from 'react-router-dom';
import { getToken } from './fetches/authentication';
import Context from './Context';

const LoginPanel = () => {
    const [ email, setEmail ] = useState('demo@email.com');
    const [ password, setPassword] = useState('passwordbro');
    const { token, setToken } = useContext(Context);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = await getToken(email, password);
        setToken(token);
    };

    const updateEmail = (e) => {
        setEmail(e.target.value);
    }

    const updatePassword = (e) => {
        setPassword(e.target.value);
    }
}
