export const READY_STATE = {
  UNSENT: 0,
  OPENED: 1,
  HEADERS_RECEIVED: 2,
  LOADING: 3,
  DONE: 4,
};

export const EMPTY_STATE = {
  readyState: READY_STATE.UNSENT,
  isError: false,
  isValid: true,
  counters: { sent: 0, fail: 0, success: 0 },
};
