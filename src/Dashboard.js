import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import UserBrowser from './UserBrowser';
import ExpenseBrowser from './ExpenseBrowser';
import FriendBrowser from './FriendBrowser';
import NewRequestList from './NewRequestList';
import NotificationList from './NotificationList';
import AddFriendForm from './AddFriendForm';
import { receivedRequests } from './store/actions/friends';

const Dashboard = ({}) => {
    const user = useSelector(state => state.authReducer.user);

    if (!user) return null;

    return (
    <main>
        <UserBrowser />
        <h1>Recent Activity</h1>
        <div>
            <NewRequestList  />
            <NotificationList />
            <div className="homepage-browsers">
                <ExpenseBrowser />
                <FriendBrowser />
            </div>
        </div>
    </main>
    )

}

const DashboardContainer = () => {
    // const friendRequests = useSelector(state => state.friendReducer.friendRequests);

    return (
        <Dashboard
        // friendRequests={friendRequests}
        />
    )
}

export default DashboardContainer;
