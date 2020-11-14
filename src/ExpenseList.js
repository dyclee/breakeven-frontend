import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { payExpense } from './store/actions/expenses';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '75ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const ExpenseList = ({listExpenses, user, friends}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const handlePay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.value) {
          const payArray = e.target.value.split(",");
          console.log(payArray);
          dispatch(payExpense(payArray))
          return
        }
        const parentPayArray = e.target.parentNode.value.split(",");
        console.log("label parent:  ", parentPayArray);
        dispatch(payExpense(parentPayArray));
        return

    }
    const handleClick = (e) => {
        e.preventDefault();
        console.log(e.target);
    }
    return (
        <>
        {listExpenses ?
        <List className={classes.root}>
          {listExpenses.map((expense) =>
          <>
              {expense.type === "toPay" ?
                  <>
                  <ListItem key={expense.expenseId} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={`${expense.createdBy}`} src={`${expense.createdBy.imageUrl}`} />
                      </ListItemAvatar>
                      <ListItemText
                          primary={expense.header}
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                              >
                              {`$${expense.amount}`}
                              </Typography>
                              {` - ${expense.formattedDate}`}
                              </React.Fragment>
                          }
                      />
                    {expense.paidStatus ?
                      <Button variant="outlined" color="primary" >PAID</Button>
                    //   <ListItemText primary="Paid"></ListItemText>
                    :
                    <Button variant="contained" color="primary" value={[expense.payUser, expense.expenseId, user.id]} onClick={handlePay}>Pay {`${expense.createdBy.fullName}`}</Button>
                    }
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </>

                :

                    <>
                  <ListItem key={expense.expenseId} alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar alt={`${expense.createdBy}`} src={`${user.imageUrl}`} />
                      </ListItemAvatar>
                      <ListItemText
                          primary={expense.header}
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                  >
                              {`$${expense.amount}`}
                              </Typography>
                              {` - ${expense.formattedDate}`}
                              </React.Fragment>
                          }
                          />
                          {expense.paidStatus ?
                            <Button variant="outlined" color="primary" >PAID</Button>
                            // <ListItemText primary="PAID"></ListItemText>
                          :
                            <Button variant="contained" color="secondary" onClick={handleClick}>Remind Users</Button>
                          }
                  </ListItem>
                  <Divider variant="inset" component="li" />
                  </>


                }
              </>
              )}
      </List>
        :
        <h1>No Expenses</h1>
        }
      </>
    )
}

const ExpenseListContainer = () => {
    const listExpenses = useSelector(state => state.expenseReducer.listExpenses);
    const user = useSelector(state => state.authReducer.user);
    const friends = useSelector(state => state.friendReducer.friends)
    return (
        <ExpenseList
            listExpenses={listExpenses}
            user={user}
            friends={friends}
        />
    )
}

export default ExpenseListContainer;
