/* global window __IS_DEV_MODE__  */
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { requestReducer, requestMiddleware } from 'core/connection';

const reducer = combineReducers({
  requestKit: requestReducer,
});

const composeEnhancers =
  (typeof window !== 'undefined' &&
    // eslint-disable-next-line no-underscore-dangle
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

export default initialState => {
  const store = createStore(
    reducer,
    initialState,
    composeEnhancers(applyMiddleware(requestMiddleware)),
  );

  if (__IS_DEV_MODE__) {
    // eslint-disable-next-line no-underscore-dangle
    window.__store = store;
  }

  return store;
};
