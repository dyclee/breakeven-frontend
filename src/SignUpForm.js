import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createAccount } from './store/actions/auth';
import InputField from './TextField';

const SignupForm = () => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            fullName,
            email,
            password,
            confirmPassword,
        };
        createAccount(data);
    }

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }
    return (
        <InputField />
    )
}

export default SignupForm;
