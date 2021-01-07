import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import AddFriendForm from './AddFriendForm';
import { showForm, hideForm } from './store/actions/ui';
import { getFriends } from './store/actions/friends';
import Fab from '@material-ui/core/Fab';

import { Button, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import FriendList from './FriendList';
//refactor dashboard

const useStyles = makeStyles((theme) => ({
    title: {
      margin: theme.spacing(4, 0, 2),
      textAlign: 'center',
    },
  }));

const FriendBrowser = ({ user, formVisible, friends, showForm, hideForm }) => {
    const { id } = useParams();
    const friendId = Number.parseInt(id);
    const classes = useStyles();

    return (
        <main className='friend-browser-container'>
            <Typography variant="h6" className={classes.title}>
                    Friends
            </Typography>
            <FriendList />
        </main>
    )

}

const FriendBrowserContainer = () => {
    const dispatch = useDispatch();
    const user = useSelector(state => state.authReducer.user);
    const formVisible = useSelector(state => state.uiReducer.formVisible);
    const friends = useSelector(state => state.friendReducer.friends);

    return (
        <FriendBrowser
        user={user}
        friends={friends}
        formVisible={formVisible}
        showForm={() => dispatch(showForm())}
        hideForm={() => dispatch(hideForm())}
        // getFriends={() => dispatch(getFriends())}
        />
    )
}
export default FriendBrowserContainer;
