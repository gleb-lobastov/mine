import { INITIATE_REQUEST } from './actionTypes';

function checkIsInitiateRequestAction(action) {
  const { type: actionType } = action;
  return action.payload !== undefined && actionType === INITIATE_REQUEST;
}

export default ({ requestStrategy }) => store => next => action => {
  if (!checkIsInitiateRequestAction(action)) {
    return next(action);
  }
  const { payload: requirements = {} } = action;
  return requestStrategy(requirements, store.dispatch, store.getState);
};
