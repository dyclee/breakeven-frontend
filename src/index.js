import React from 'react';
import ReactDOM from 'react-dom';
import AppWithContext from './AppWithContext';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

const store = configureStore();

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <AppWithContext />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
