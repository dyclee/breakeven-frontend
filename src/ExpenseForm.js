import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { createExpense, getExpenses } from './store/actions/expenses';
import { showExpenseForm, hideExpenseForm } from './store/actions/ui'
import InputField from './TextField';
import FriendSelect from './FriendSelect';
import ExpenseRequirementSelect from './ExpenseRequirementSelect';
import { Dialog, DialogTitle, DialogContent, Button, TextField, DialogActions, InputLabel, FormControl, Select, MenuItem } from '@material-ui/core';
import { Redirect, Route, useHistory } from 'react-router-dom';


const ExpenseForm = ({ handleExpenseClick, openExpenseForm, setOpenExpenseForm }) => {
    const [header, setHeader] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [members, setMembers] = useState([]);
    const [requirements, setRequirements] = useState();
    const [category, setCategory] = useState("");


    const handleExpenseFormClose = () => {
        setHeader("");
        setTotalAmount("");
        setMembers([]);
        setOpenExpenseForm(false);
    }
    const dispatch = useDispatch();

    const userId = window.localStorage.getItem("userId");

    const handleSubmit = e => {
        e.preventDefault();
        const data = {
            header,
            totalAmount,
            members: members.map(member => member.id),
            userId: userId,
            requirements: JSON.stringify(requirements),
            categoryId: category.id
        };
        // console.log(data);
        dispatch(createExpense(data));
        setHeader("");
        setTotalAmount("");
        setMembers([]);
        handleExpenseFormClose();

    };

    const updateProperty = (callback) => (e) => {
        callback(e.target.value);
    }

    return (<>
        <Dialog
            open={openExpenseForm}
            onClose={handleExpenseFormClose}
            PaperProps={{
                style: { backgroundColor: "#000", color: "#f5d45e"}
            }}
        >
            <DialogTitle id="expenseForm-dialog-title">Create an expense</DialogTitle>
            <DialogContent >
                <TextField
                    color="secondary"
                    autoFocus
                    defaultValue={header}
                    margin="dense"
                    id="header"
                    label="Header"
                    type="text"
                    fullWidth
                    onChange={updateProperty(setHeader)}
                    required
                />
                <TextField
                    color="secondary"
                    autoFocus
                    value={totalAmount}
                    margin="dense"
                    id="amount"
                    label="Amount ($)"
                    type="number"
                    step={.01}
                    fullWidth
                    onChange={updateProperty(setTotalAmount)}
                    required
                />
                <FriendSelect
                    value={[members, setMembers, requirements, setRequirements]}
                    // onChange={updateProperty(setMembers)}
                    required
                />
                <DialogActions>
                    <Button onClick={handleExpenseFormClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleSubmit}>
                        Create
                    </Button>
                </DialogActions>
            </DialogContent>
        </Dialog>
    </>)
}

export default ExpenseForm;
