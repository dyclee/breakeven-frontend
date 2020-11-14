import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import ExpenseForm from './ExpenseForm';
import { showExpenseForm, hideExpenseForm } from './store/actions/ui';



import { Button } from '@material-ui/core';

import ExpenseList from './ExpenseList';
//refactor dashboard

const ExpenseBrowser = ({ user, expenseFormVisible, friends, showExpenseForm, hideExpenseForm }) => {
    useEffect(() => {
        // getFriends(user.id);
    }, []);


    const { id } = useParams();
    const friendId = Number.parseInt(id);


    return (
        <main>
            {expenseFormVisible ? (
                <ExpenseForm />
                ) : (
                    <>
                    <h1>Recent Expenses</h1>
                    <ExpenseList />
                    <Button type="button" color="primary" hidden={expenseFormVisible} onClick={showExpenseForm}>Add Expense</Button>
                    </>
            )}
        </main>
    )

}

const ExpenseBrowserContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const expenseFormVisible = useSelector(state => state.uiReducer.expenseFormVisible);
    const expenses = useSelector(state => state.expenseReducer.expenses);

    return (
        <ExpenseBrowser
        user={user}
        expenses={expenses}
        expenseFormVisible={expenseFormVisible}
        showExpenseForm={() => dispatch(showExpenseForm())}
        hideExpenseForm={() => dispatch(hideExpenseForm())}
        />
    )
}

export default ExpenseBrowserContainer;
