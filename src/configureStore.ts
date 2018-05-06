import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import * as localforage from 'localforage';
import rootReducer from './reducers';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension';

const persistConfig = {
    key: 'root',
    storage: localforage,
};

const logger = (createLogger as any)();

var middleware = applyMiddleware(logger, thunk);

if (process.env.NODE_ENV === 'development') {
    middleware = composeWithDevTools(middleware);
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default () => {
    let store = createStore(persistedReducer, {}, middleware);
    let persistor = persistStore(store);
    return { store, persistor };
};