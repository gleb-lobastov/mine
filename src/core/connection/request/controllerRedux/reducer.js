import { PROCESS_REQUEST } from './actionTypes';
import * as consts from './consts';

const checkIsRequestAction = action => {
  const { type: actionType } = action;
  return action.meta !== undefined && actionType === PROCESS_REQUEST;
};

export default (/* further configuration */) => (state, action) => {
  if (!checkIsRequestAction(action)) {
    return state;
  }

  const {
    payload,
    error,
    meta: { readyState = undefined, requirements = undefined } = {},
  } = action;

  if (readyState === consts.READY_STATE.OPENED) {
    return {
      ...state,
      readyState,
      recent: {},
      requirements,
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
