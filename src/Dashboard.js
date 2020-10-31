import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, Redirect, Route, Switch, useParams } from "react-router-dom";
import { Button } from '@material-ui/core';

import AddFriendForm from './AddFriendForm';
import { hideForm, showForm } from './store/actions/ui';

const Dashboard = ({hideForm, showForm, formVisible}) => {

    return (
        <main>
            <div>
                <Button type="button" color="primary" hidden={formVisible} onClick={showForm}>Add friend</Button>
            </div>
            {formVisible ? (
                <AddFriendForm />
            ) : (
                <h1>Dashboard</h1>
            )}
        </main>
    )
}

const DashboardContainer = () => {
    const formVisible = useSelector((state) => state.uiReducer.formVisible);
    const dispatch = useDispatch();
    return (
        <Dashboard
            formVisible={formVisible}
            hideForm={() => dispatch(hideForm())}
            showForm={() => dispatch(showForm())}
        />
    )
}

export default DashboardContainer;
