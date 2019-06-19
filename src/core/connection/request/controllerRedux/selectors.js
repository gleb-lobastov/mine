import * as consts from './consts';

const checkHasProperty = (object, property) =>
  Object.prototype.hasOwnProperty.call(object, property);

export const selectIdentity = (state = {}) => state.identity;

export const selectReadyState = (state = {}) =>
  state.readyState || consts.READY_STATE.UNSENT;

export const selectIsReady = (state = {}) =>
  state.readyState === consts.READY_STATE.DONE;

export const selectIsPending = (state = {}) =>
  Boolean(state.readyState) &&
  !selectIsReady(state) &&
  state.readyState !== consts.READY_STATE.UNSENT;

export const selectRelevantResult = state => {
  if (!state || !state.recent || !checkHasProperty(state.recent, 'result')) {
    return undefined;
  }
  return state.recent.result;
};

export const selectAvailableResult = state => {
  if (!state) {
    return undefined;
  }
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

export const selectError = state => {
  if (!state || !state.recent || !checkHasProperty(state.recent, 'error')) {
    return undefined;
  }
  return state.recent.error;
};

export const selectIsFulfilled = state =>
  Boolean(selectAvailableResult(state) || selectError(state));
