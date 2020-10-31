import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import NavBar from './NavBar'
import Drawer from './Drawer';

import './index.css';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';


import Theme from './Theme';


const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <Theme>
            <App />
            </Theme>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
