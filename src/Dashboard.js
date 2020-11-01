import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import AddFriendForm from './AddFriendForm';
import { hideForm, showForm } from './store/actions/ui';

const Dashboard = ({hideForm, showForm, formVisible}) => {

    return (
        <main>
            <h1>Dashboard</h1>
        </main>
    )
}

const DashboardContainer = () => {
    const dispatch = useDispatch();
    return (
        <Dashboard/>
    )
}

export default DashboardContainer;
