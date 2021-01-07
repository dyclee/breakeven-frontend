import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { payExpense, removeNotification, removeReminder } from './store/actions/expenses';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import DoneIcon from '@material-ui/icons/Done';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      maxWidth: 900, //752
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
  }));


export default function NotificationList ({ }) {
    const classes = useStyles();
    const [dense, setDense] = React.useState(false);

    const user = useSelector(state => state.authReducer.user);
    const notifications = useSelector(state => state.expenseReducer.notifications);
    const dispatch = useDispatch();

    const confirmPayment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const ele = e.target
        try {
            if (ele.value) {
                const payArray = e.target.value.split(",");
                dispatch(payExpense(payArray))
                return
            }
            if (ele.attributes.paymentVal.value) {
                const payArray = e.target.attributes.paymentVal.value.split(",");
                dispatch(payExpense(payArray))
                return
            }
        } catch (e) {
            const iconButtonValue = ele.parentNode.attributes.paymentVal.value.split(",");
            dispatch(payExpense(iconButtonValue))

        }
    }
    const removePayment = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const ele = e.target
        // console.log("ele", ele)
        try {
            if (ele.value) {
                const payArray = e.target.value.split(",");
                // console.log("PAY ARRAY", payArray);
                dispatch(removeReminder(payArray))
                return
            }
            if (ele.attributes.paymentVal.value) {
                const payArray = e.target.attributes.paymentVal.value.split(",");
                // console.log("FOUND AARRAY: ", payArray)
                dispatch(removeReminder(payArray))
                return
            }
        } catch (e) {
            const iconButtonValue = ele.parentNode.attributes.paymentVal.value.split(",");
            // console.log("PARENT VALUE: ", iconButtonValue)
            dispatch(removeReminder(iconButtonValue))
        }
    }

    if (!notifications || !notifications.length) {
        return (<>
            <div className="notification-container">
                <Typography variant="h6" className={classes.title}>
                    No alerts
                </Typography>
            </div>
        </>)
    }

    return (<>
        <div className={`${classes.root} notification-container`}>
            <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
                <Typography variant="h6" className={classes.title}>
                Reminders
                </Typography>
                <div className={classes.demo}>
                <List dense={dense}>
                    {notifications.map((obj) => {
                    return (
                    <ListItem>
                        <ListItemAvatar>
                        <Avatar alt={obj.Expense.User.fullname} src={obj.Expense.User.imageUrl}>
                            <FolderIcon />
                        </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                        primary={`You owe $${obj.amount} to ${obj.Expense.User.fullName}`}
                        secondary={`Expense created on ${obj.formattedDate}`}
                        />
                        <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="confirm" onClick={confirmPayment} value={[obj.Expense.createdBy, obj.expenseId, obj.userId]}>
                            <DoneIcon paymentVal={[obj.Expense.createdBy, obj.expenseId, obj.userId]} />
                        </IconButton>
                        <IconButton edge="end" aria-label="remove" onClick={removePayment} value={[obj.Expense.createdBy, obj.expenseId, obj.userId]}>
                            <DeleteIcon paymentVal={[obj.Expense.createdBy, obj.expenseId, obj.userId]} />
                        </IconButton>
                        </ListItemSecondaryAction>
                    </ListItem>
                    )
                    })}
                </List>
                </div>
            </Grid>
            </Grid>
        </div>
    </>)
}
