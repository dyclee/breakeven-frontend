import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import AddFriendForm from './AddFriendForm';
import { showForm, hideForm } from './store/actions/ui';
import { getFriends } from './store/actions/friends';

import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import FriendList from './FriendList';
//refactor dashboard


const FriendBrowser = ({ user, formVisible, friends, showForm, hideForm, getFriends }) => {
    useEffect(() => {
        getFriends(user.id);
    }, []);


    const { id } = useParams();
    const friendId = Number.parseInt(id);


    return (
        <main>
            {formVisible ? (
                <AddFriendForm />
                ) : (
                <FriendList friends={friends}/>

            )}
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
        getFriends={() => dispatch(getFriends())}
        />
    )
}
export default FriendBrowserContainer;
