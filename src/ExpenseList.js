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
    oweColor: {
      color: "#ba000d"
    },
    getColor: {
      color: "#43a047"
    }
  }));

const ExpenseList = ({listExpenses, user, friends}) => {
    const classes = useStyles();

    const dispatch = useDispatch();

    const handlePay = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.target.value) {
          const payArray = e.target.value.split(",");
          dispatch(payExpense(payArray))
          return
        }
        const parentPayArray = e.target.parentNode.value.split(",");
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
                          primary={
                          <React.Fragment>
                          <Typography>
                              <Box fontWeight={550}>
                              {`${expense.header}`}
                              </Box>
                              <Box className={classes.oweColor} fontWeight={550}>
                              {`-$${expense.amount}`}
                              </Box>
                            </Typography>
                            </React.Fragment>}
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                              >
                              {`${expense.formattedDate}`}
                              </Typography>
                              {` - ${expense.createdBy.fullName}`}
                              </React.Fragment>
                          }
                      />
                    {expense.paidStatus ?
                      <Button variant="outlined" color="primary" >PAID</Button>
                    //   <ListItemText primary="Paid"></ListItemText>
                    :
                    <Button variant="contained" color="primary" value={[expense.payUser, expense.expenseId, user.id]} onClick={handlePay}>Pay User</Button>
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
                          primary={
                            <React.Fragment>
                            <Typography>
                            <Box fontWeight={550}>
                              {`${expense.header}`}
                              </Box>
                              <Box className={classes.getColor} fontWeight={550}>
                              {`$${expense.amount}`}
                              </Box>
                              </Typography>
                              </React.Fragment>}
                          secondary={
                              <React.Fragment>
                              <Typography
                                  component="span"
                                  variant="body2"
                                  className={classes.inline}
                                  color="textPrimary"
                                  >
                              {`${expense.formattedDate}`}
                              </Typography>
                              {/* {` - ${expense.createdBy.fullName}`} */}
                              </React.Fragment>
                          }
                          />
                          {expense.paidStatus ?
                            <Button variant="outlined" color="secondary" >RECEIVED</Button>
                            // <ListItemText primary="PAID"></ListItemText>
                          :
                            <Button variant="contained" color="secondary" onClick={handleClick}>Remind User</Button>
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
