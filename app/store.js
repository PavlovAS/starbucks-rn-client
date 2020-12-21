import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import index from './reducers';

const initialState = {};

const middleware = [thunk];

const store = createStore(
    index,
    initialState,
    applyMiddleware(...middleware)
);

export default store;
