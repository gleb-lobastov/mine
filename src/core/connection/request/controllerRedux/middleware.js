import { INITIATE_REQUEST } from './actionTypes';
import {
  createPendingAction,
  createFailureAction,
  createSuccessAction,
} from './actionCreators';

function checkIsInitiateRequestAction(action) {
  const { type: actionType } = action;
  return action.payload !== undefined && actionType === INITIATE_REQUEST;
}

export const requestStrategyEnhancer = requestStrategy => (
  requirements,
  dispatch,
  getState,
) => {
  dispatch(createPendingAction(requirements));
  return requestStrategy(requirements, dispatch, getState).then(
    result => {
      dispatch(createSuccessAction(requirements, result));
      return result;
    },
    error => {
      dispatch(createFailureAction(requirements, error));
      return error;
    },
  );
};

export default ({ requestStrategy }) => store => next => action => {
  if (!checkIsInitiateRequestAction(action)) {
    return next(action);
  }
  const { payload: requirements = {} } = action;
  return requestStrategy(requirements, store.dispatch, store.getState);
};
