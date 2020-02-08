import { READY_STATE, EMPTY_STATE } from './consts';

export const selectReadyState = ({ readyState } = EMPTY_STATE) =>
  readyState || READY_STATE.UNSENT;

export const selectIsUnsent = (state = EMPTY_STATE) =>
  selectReadyState(state) === READY_STATE.UNSENT;

export const selectIsReady = (state = EMPTY_STATE) =>
  selectReadyState(state) === READY_STATE.DONE;

export const selectIsPending = (state = EMPTY_STATE) =>
  !selectIsReady(state) && !selectIsUnsent(state);

export const selectIsValid = (state = EMPTY_STATE) => state.isValid;
export const selectIsError = (state = EMPTY_STATE) => state.isError;

export const selectResult = ({ isValid, isError, lastResult } = EMPTY_STATE) =>
  isValid && !isError ? lastResult : undefined;

export const selectPlaceholder = ({ lastResult } = EMPTY_STATE) => lastResult;

export const selectError = ({ isError, lastError } = EMPTY_STATE) =>
  isError ? lastError : undefined;

export const selectLastError = ({ lastError } = EMPTY_STATE) => lastError;

export const selectUpdatesCounter = ({
  counters: { success: updatesCounter },
} = EMPTY_STATE) => updatesCounter;
