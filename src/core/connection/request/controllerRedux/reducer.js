import { PROCESS_REQUEST, INVALIDATE_REQUEST } from './actionTypes';
import * as consts from './consts';

const checkIsRequestAction = action => {
  const { type: actionType } = action;
  return action.meta !== undefined && actionType === PROCESS_REQUEST;
};

const checkIsInvalidateRequestAction = action => {
  const { type: actionType } = action;
  return action.meta !== undefined && actionType === INVALIDATE_REQUEST;
};

export default (/* further configuration */) => (
  state = consts.EMPTY_STATE,
  action,
) => {
  if (checkIsInvalidateRequestAction(action)) {
    return consts.EMPTY_STATE;
  }

  if (!checkIsRequestAction(action)) {
    return state;
  }

  const { payload, error, meta: { readyState = undefined } = {} } = action;

  if (readyState === consts.READY_STATE.OPENED) {
    return {
      ...state,
      readyState,
      recent: {},
    };
  }
  if (readyState === consts.READY_STATE.DONE) {
    if (error) {
      return {
        ...state,
        readyState,
        recent: { error: payload },
      };
    }
    return {
      ...state,
      readyState,
      recent: { result: payload },
      lastSuccessful: { result: payload },
    };
  }
  return state;
};
