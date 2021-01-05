import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { loadToken } from './store/actions/auth';
import {PrivateRoute, ProtectedRoute } from './util/route-util';
import LoginPanel from './LoginPanel';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';
import FriendBrowser from './FriendBrowser';
import ExpenseBrowser from './ExpenseBrowser';
import NavBar from './NavBar';
import Drawer from './Drawer';
import { CssBaseline } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';

//change to expenseBrowser later
import ExpenseForm from './ExpenseForm';


const drawerWidth = 240;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  }));

const App = ({needLogin, loadToken}) => {
    const [loaded, setLoaded] = useState(false);
    const classes = useStyles();

    useEffect(() => {
        setLoaded(true);
        loadToken();
    }, []);
    // const friendRequests = useSelector(state => state.friendReducer.friendRequests);
    const token = useSelector(state => state.authReducer.token);
    if (token) {
        needLogin = false;
    }

    return (

        <div className={classes.root}>
            <BrowserRouter>
                <CssBaseline />
                <NavBar />
                <Drawer needLogin={needLogin}/>
                <main className={classes.content}>
                <Toolbar />
                <Switch>
                    <ProtectedRoute
                        path="/login"
                        exact={true}
                        needLogin={needLogin}
                        component={LoginPanel}
                    />
                    <ProtectedRoute
                        path="/signup"
                        exact={true}
                        needLogin={needLogin}
                        component={SignUpForm}
                    />
                    <PrivateRoute
                        path="/"
                        exact={true}
                        needLogin={needLogin}
                        component={Dashboard}
                    />
                    <PrivateRoute
                        path="/friends"
                        exact={true}
                        needLogin={needLogin}
                        component={FriendBrowser}
                    />
                    <PrivateRoute
                        path="/expenses"
                        exact={true}
                        needLogin={needLogin}
                        component={ExpenseBrowser}
                    />
                    <Redirect to='/' />
                </Switch>

                </main>

            </BrowserRouter>
        </div>
    )
}

const AppContainer = () => {
    const needLogin = useSelector((state) => !state.authReducer.token);
    const dispatch = useDispatch();
    return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
}
export default AppContainer;
