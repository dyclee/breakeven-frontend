import React, { useEffect } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import LoginPanel from './LoginPanel';

const PrivateRoute = props => {
    return (<Route render= {() => {
        return (
            props.needLogin === true ? <Redirect to='/login' /> : props.children
        );
    }}/>);
}

const App = () => {

    useEffect(() => {
        (async() => {
            const localToken = window.localStorage.getItem('token');
            if (localToken) {
                setToken(localToken);
            }
        })();
    }, [setToken]);

    const needLogin = !token;

    return (
        <BrowserRouter>
            <Switch>
                <Route
                    path="/login"
                    render={(props) => (
                        <LoginPanel {...props} />
                    )}
                />
                <PrivateRoute
                    path="/"
                    exact={true}
                    needLogin={needLogin}>
                </PrivateRoute>

            </Switch>
        </BrowserRouter>
    )
}

export default App;
