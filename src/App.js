import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Context from './Context';
import LoginPanel from './LoginPanel';

const PrivateRoute = props => {
    return (<Route render= {() => {
        return (
            props.needLogin === true ? <Redirect to='/login' /> : props.children
        );
    }}/>);
}

const App = () => {
    const { token, setToken } = useContext(Context);

    useEffect(() => {
        (async() => {
            const localToken = window.localStorage.getItem('token');
        })
    })
}
