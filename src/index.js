import React from 'react';
import ReactDOM from 'react-dom';
import AppWithContext from './AppWithContext';
import './index.css';

import { CssBaseline } from '@material-ui/core';
import Theme from './Theme';

// import configureStore from './store/configureStore';

// const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <CssBaseline/>
        <Theme>
            <AppWithContext />
        </Theme>
    </React.StrictMode>,
    document.getElementById('root')
)
