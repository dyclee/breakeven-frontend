import React, { useState, useEffect } from 'react';

import { CssBaseline } from '@material-ui/core';
import Theme from './Theme';

import Context from './Context';
import App from './App';
import NavBar from './NavBar';

const AppWithContext = (props) => {
    const [token, setToken] = useState('');
    const [formVisible, setFormVisible] = useState(false);

    useEffect(() => {
        (async () => {
            const localToken = window.localStorage.getItem("token");
            if (localToken) {
                setToken(localToken);
            }
        })();
    }, []);

    const value = {
        token,
        setToken,
        formVisible,
        setFormVisible,
    };

    return (
        <Context.Provider value={value}>
            <CssBaseline />
            <Theme>
                <NavBar/>
                <App/>
            </Theme>
        </Context.Provider>
    )
}

export default AppWithContext
