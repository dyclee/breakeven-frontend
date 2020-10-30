import React, { useState, useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";

import { loadToken } from './store/actions/auth';
import {PrivateRoute, ProtectedRoute } from './util/route-util';
import LoginPanel from './LoginPanel';

const App = ({needLogin, loadToken}) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
        loadToken();
    }, []);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <Switch>
                <ProtectedRoute
                    path="/login"
                    exact={true}
                    needLogin={needLogin}
                    component={LoginPanel}
                />
                <PrivateRoute
                    path="/"
                    exact={true}
                    needLogin={needLogin}
                    component={LoginPanel}
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
