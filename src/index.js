import React from 'react';
import ReactDOM from 'react-dom';
import AppWithContext from './AppWithContext';
import './index.css';

// import configureStore from './store/configureStore';

// const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <AppWithContext />
    </React.StrictMode>,
    document.getElementById('root')
)
