import { createStore, combineReducers, applyMiddleware } from 'redux';
import { requestReducer, requestMiddleware } from 'core/request';

const reducer = combineReducers({
  provision: requestReducer,
});

export default createStore(reducer, applyMiddleware(requestMiddleware));
