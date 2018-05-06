import * as React from 'react';
import App from './App';
import {
    applyMiddleware,
} from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './configureStore';

const logger = (createLogger as any)();

var middleware = applyMiddleware(logger, thunk);

if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
}

const { persistor, store } = configureStore();

class ReduxRoot extends React.Component {

    state = {
        mobileOpen: true,
    };

    render() {

        return (
            <Provider store={store}>
                <PersistGate loading={<p>Loading...</p>} persistor={persistor}>
                    <App />
                </PersistGate>
            </Provider>
        );
    }
}

export default ReduxRoot;
