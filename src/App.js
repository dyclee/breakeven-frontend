import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';

import LoginPanel from './LoginPanel';

const PrivateRoute = props => {
    return (<Route render= {() => {
        return (
            props.needLogin === true ? <Redirect to='/login' /> : props.children
        );
    }}/>);
}
