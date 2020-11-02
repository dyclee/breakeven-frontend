import React, { useEffect } from "react";
import { useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: '60ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

const ExpenseList = ({expenses}) => {
    const classes = useStyles();

    return (
        <List className={classes.root}>
          {expenses.owedExpenses.map((expense) => {
                  return (
                    <>
                    <ListItem key={expense.expenseId} alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt={`${expense.Expense.createdBy}`} src={`${expense.paidStatus}`} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={expense.Expense.header}
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
                                {""}
                                </React.Fragment>
                            }
                        />
                    </ListItem>
                    <Divider variant="inset" component="li" />
                    </>
                  )
              })}
      </List>
    )
}

const ExpenseListContainer = () => {
    const expenses = useSelector(state => state.expenseReducer.expenses);

    return (
        <ExpenseList expenses={expenses} />
    )
}

export default ExpenseListContainer;