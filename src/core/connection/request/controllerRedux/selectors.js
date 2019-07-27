import * as consts from './consts';

// Empty state should be threatened as unsent as it was actually not called
const EMPTY_STATE = { readyState: consts.READY_STATE.UNSENT };

const checkHasProperty = (object, property) =>
  Object.prototype.hasOwnProperty.call(object, property);

export const selectIdentity = (state = EMPTY_STATE) => state.identity;

export const selectReadyState = (state = EMPTY_STATE) =>
  state.readyState || consts.READY_STATE.UNSENT;

export const selectIsReady = (state = EMPTY_STATE) =>
  state.readyState === consts.READY_STATE.DONE;

export const selectIsPending = (state = EMPTY_STATE) =>
  !selectIsReady(state) && state.readyState !== consts.READY_STATE.UNSENT;

export const selectIsValid = (state = EMPTY_STATE) => state.isValid;

export const selectRelevantResult = (state = EMPTY_STATE) => {
  if (!state.recent || !checkHasProperty(state.recent, 'result')) {
    return undefined;
  }
  return state.recent.result;
};

export const selectAvailableResult = (state = EMPTY_STATE) => {
  if (state.recent && checkHasProperty(state.recent, 'result')) {
    return state.recent.result;
  }
  if (
    state.lastSuccessful &&
    checkHasProperty(state.lastSuccessful, 'result')
  ) {
    return state.lastSuccessful.result;
  }
  return undefined;
};

export const selectError = (state = EMPTY_STATE) => {
  if (!state.recent || !checkHasProperty(state.recent, 'error')) {
    return undefined;
  }
  return state.recent.error;
};

export const selectIsFulfilled = (state = EMPTY_STATE) =>
  Boolean(selectAvailableResult(state) || selectError(state));
