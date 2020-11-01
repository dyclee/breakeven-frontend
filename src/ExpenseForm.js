import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { createAccount } from './store/actions/auth';
import InputField from './TextField';
import FriendSelect from './FriendSelect';

import { Redirect, Route, useHistory } from 'react-router-dom';


const ExpenseForm = () => {
    const [header, setHeader] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [members, setMembers] = useState([]);
    const [requirements, setRequirements] = useState("");
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            header,
            totalAmount,
            members,
            userId: user.id,
            requirements: JSON.stringify(requirements),
            categoryId: category.id
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
                    id="Header"
                    type="text"
                    placeholder="Enter a description"
                    value={header}
                    onChange={updateProperty(setHeader)}
                    required
                />
                <InputField
                    id="Amount"
                    type="number"
                    step={.01}
                    placeholder="Enter an amount"
                    value={totalAmount}
                    onChange={updateProperty(setTotalAmount)}
                    required
                />
                <FriendSelect
                    value={members}
                    required
                />
                <InputField
                    id="Requirements"
                    type="text"
                    placeholder="Enter specific amounts"
                    value={requirements}
                    onChange={updateProperty(setRequirements)}
                />
                <Button
                    type="submit"
                    color="primary"
                    onClick={handleSubmit}
                >Create expense</Button>
            </form>
        </main>
    )
}

export default ExpenseForm;
