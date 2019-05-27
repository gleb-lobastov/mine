/* global window __IS_DEV_MODE__  */
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { requestReducer, requestMiddleware } from 'core/connection';

const reducer = combineReducers({
  requestKit: requestReducer,
});

export default () => {
  const store = createStore(reducer, applyMiddleware(requestMiddleware));

  if (__IS_DEV_MODE__) {
    // eslint-disable-next-line no-underscore-dangle
    window.__store = store;
  }

  return store;
};