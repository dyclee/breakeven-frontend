import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { loadToken } from './store/actions/auth';
import {PrivateRoute, ProtectedRoute } from './util/route-util';
import LoginPanel from './LoginPanel';
import SignUpForm from './SignUpForm';
import Dashboard from './Dashboard';
import NavBar from './NavBar';

const App = ({needLogin, loadToken}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        loadToken();
    }, []);

    const token = useSelector(state => state.authReducer.token);
    if (token) {
        needLogin = false;
    }

    return (
        <BrowserRouter>
            <NavBar />
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
                <Redirect to='/' />
            </Switch>
        </BrowserRouter>
    )
}

const AppContainer = () => {
    const needLogin = useSelector((state) => !state.authReducer.token);
    const dispatch = useDispatch();
    return <App needLogin={needLogin} loadToken={() => dispatch(loadToken())} />;
}
export default AppContainer;
