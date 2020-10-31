// const { members, totalAmount, user, header } = req.body;
// const newTotalExpense = await Expense.create({
//     header,
//     totalAmount,
//     paidStatus: false,
//     createdBy: user.id,
// });

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { createAccount } from './store/actions/auth';
import InputField from './TextField';

import { Redirect, Route, useHistory } from 'react-router-dom';


const ExpenseForm = () => {
    const [header, setHeader] = useState("");
    const [totalAmount, setTotalAmound] = useState("");
    const [members, setMembers] = useState([]);

    const dispatch = useDispatch();

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            header, totalAmount, members
        };
        dispatch(createExpense(data));
    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }

    return (
        <main>
            <form onSubmit={handleSubmit}>
                <InputField
                    id="header"
                    type="text"
                    placeholder="Enter a description"
                    value={header}
                    onChange={updateProperty(setHeader)}
                />
                <InputField
                    id="header"
                    type="text"
                    placeholder="Enter a description"
                    value={header}
                    onChange={updateProperty(setHeader)}
                />
                <InputField
                    id="header"
                    type="text"
                    placeholder="Enter a description"
                    value={header}
                    onChange={updateProperty(setHeader)}
                />
            </form>
        </main>
    )
}
