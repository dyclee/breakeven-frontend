import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';

import { createExpense } from './store/actions/expenses';
import InputField from './TextField';
import FriendSelect from './FriendSelect';
import ExpenseRequirementSelect from './ExpenseRequirementSelect';

import { Redirect, Route, useHistory } from 'react-router-dom';


const ExpenseForm = () => {
    const [header, setHeader] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [members, setMembers] = useState([]);
    const [requirements, setRequirements] = useState();
    const [category, setCategory] = useState("");

    const dispatch = useDispatch();

    useEffect(() => {
        // setMembers();
        // setRequirements();
    })
    const user = useSelector(state => state.authReducer.user);

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            header,
            totalAmount,
            members: members.map(member => member.id),
            userId: user.id,
            requirements: JSON.stringify(requirements),
            categoryId: category.id
        };
        console.log(data);
        dispatch(createExpense(data));

        alert("Expense created");

    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }

    return (
        <main>
            <form id="expense-form" onSubmit={handleSubmit}>
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
                    value={[members, setMembers, requirements, setRequirements]}
                    // onChange={updateProperty(setMembers)}
                    required
                />
                {/* <ExpenseRequirementSelect
                    value={[members, requirements, setRequirements]}
                    required
                /> */}
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
