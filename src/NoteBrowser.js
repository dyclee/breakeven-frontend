import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';


import NewRequestList from './NewRequestList';
import NotificationList from './NotificationList';

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

export default function NoteBrowser() {
    const classes = useStyles();
    const friendRequests = useSelector(state => state.friendReducer.friendRequests)
    const notifications = useSelector(state => state.expenseReducer.notifications)

    if ((!friendRequests || !friendRequests.length) && (!notifications || !notifications.length)) {
        return (<>
            <Typography variant="h4" className={classes.title}>
                No notifications
            </Typography>
        </>)
    }
    return (<>
        <div className="notificationpage-browsers">
            <NewRequestList />
            <NotificationList />
        </div>
    </>)
}
