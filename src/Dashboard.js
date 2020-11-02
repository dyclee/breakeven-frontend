import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import NewRequestList from './NewRequestList';
import AddFriendForm from './AddFriendForm';
import { hideForm, showForm } from './store/actions/ui';

const Dashboard = ({friendRequests}) => {

    return (
        <main>
            <h1>Recent Activity</h1>
            <NewRequestList />
        </main>
    )
}



export default Dashboard;
