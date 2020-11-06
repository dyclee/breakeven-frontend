import React, { useEffect, } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import NewRequestList from './NewRequestList';
import AddFriendForm from './AddFriendForm';
import { receivedRequests } from './store/actions/friends';

const Dashboard = () => {

    // useEffect(() => {
    //     const userId = useSelector((state) => state.authReducer.user.id)
    //     console.log(userId);
    //     receivedRequests(userId)
    //   })

    return (
        <main>
            <h1>Recent Activity</h1>
            <NewRequestList />
        </main>
    )
}

const DashboardContainer = () => {
    return (
        <Dashboard />
    )
}

export default DashboardContainer;
