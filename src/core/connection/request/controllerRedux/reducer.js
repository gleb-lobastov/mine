import { PROCESS_REQUEST, INVALIDATE_REQUEST } from './actionTypes';
import { EMPTY_STATE, READY_STATE } from './consts';

const checkIsRequestAction = action => {
  const { type: actionType } = action;
  return action.meta !== undefined && actionType === PROCESS_REQUEST;
};

const checkIsInvalidateRequestAction = action => {
  const { type: actionType } = action;
  return action.meta !== undefined && actionType === INVALIDATE_REQUEST;
};

export default (/* further configuration */) => (
  state = EMPTY_STATE,
  action,
) => {
  if (checkIsInvalidateRequestAction(action)) {
    return {
      ...state,
      isValid: false,
    };
  }

  if (!checkIsRequestAction(action)) {
    return state;
  }

  const { payload, error, meta: { readyState = undefined } = {} } = action;

  if (readyState === READY_STATE.OPENED) {
    return {
      ...state,
      readyState,
      counters: { ...state.counters, sent: state.counters.sent + 1 },
    };
  }
  if (readyState === READY_STATE.DONE) {
    if (error) {
      return {
        ...state,
        readyState,
        lastError: error,
        isError: true,
        counters: { ...state.counters, fail: state.counters.fail + 1 },
      };
    }
    return {
      ...state,
      readyState,
      lastResult: payload,
      isError: false,
      isValid: true,
      counters: { ...state.counters, success: state.counters.success + 1 },
    };
  }
  return state;
};
