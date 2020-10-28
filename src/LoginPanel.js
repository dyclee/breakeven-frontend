import React, { useState, useContext} from 'react';
import { Redirect,  } from 'react-router-dom';
import { getToken } from './fetches/authentication';
import Context from './Context';

const LoginPanel = () => {
    const [ email, setEmail ] = useState('demo@email.com');
    const [ password, setPassword] = useState('passwordbro');
    const { token, setToken } = useContext(Context);
}
