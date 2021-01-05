import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import ExpenseForm from './ExpenseForm';
import { showExpenseForm, hideExpenseForm } from './store/actions/ui';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Typography } from '@material-ui/core';
import ExpenseList from './ExpenseList';
//refactor dashboard

const useStyles = makeStyles((theme) => ({
    title: {
      margin: theme.spacing(4, 0, 2),
      fontWeight: "bold",
      textDecoration: "underline",
    },
  }));

const ExpenseBrowser = ({ user, expenseFormVisible, friends, showExpenseForm, hideExpenseForm }) => {
    useEffect(() => {
        // getFriends(user.id);
    }, []);

    const classes = useStyles();
    const { id } = useParams();
    const friendId = Number.parseInt(id);


    return (
        <main className='expense-browser-container'>
            {expenseFormVisible ? (
                <ExpenseForm />
                ) : (
                    <>
                        <Typography variant="h6" className={classes.title}>
                            Expenses
                        </Typography>
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
