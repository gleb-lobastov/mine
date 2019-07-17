import {
  INITIATE_REQUEST,
  PROCESS_REQUEST,
  INVALIDATE_REQUEST,
} from './actionTypes';
import * as consts from './consts';

export const createRequestAction = requirements => ({
  type: INITIATE_REQUEST,
  payload: requirements,
});

export const createPendingAction = ({ domain, ...requirements } = {}) => ({
  type: PROCESS_REQUEST,
  meta: {
    domain,
    requirements,
    readyState: consts.READY_STATE.OPENED,
  },
});

export const createFailureAction = ({ domain, ...requirements } = {}, error) => ({
  type: PROCESS_REQUEST,
  payload: error,
  error: true,
  meta: {
    domain,
    requirements,
    readyState: consts.READY_STATE.DONE,
  },
});

export const createSuccessAction = (
  { domain, ...requirements } = {},
  result,
) => ({
  type: PROCESS_REQUEST,
  payload: result,
  meta: {
    domain,
    requirements,
    readyState: consts.READY_STATE.DONE,
  },
});

export const createInvalidateRequestAction = ({ domain }) => ({
  type: INVALIDATE_REQUEST,
  meta: { domain },
});
