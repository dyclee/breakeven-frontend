import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";

import AddFriendForm from './AddFriendForm';
import { showForm, hideForm } from './store/actions/ui';
import { getFriends } from './store/actions/friends';
//refactor dashboard

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
      maxWidth: '36ch',
      backgroundColor: theme.palette.background.paper,
    },
    inline: {
      display: 'inline',
    },
  }));

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
                    <nav>
                    {friends.map((friend) => {
                        return (
                            <NavLink key={friend.fullName} to={`/friends/${friend.id}`}>
                                <div className="friendName">{friend.fullName}</div>
                                <div className="friendEmail">{friend.email}</div>
                                <div className="friendPicture">friend.pictureUrl</div>
                            </NavLink>
                        )
                    })}
                </nav>
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
