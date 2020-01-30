import {
  createPendingAction,
  createFailureAction,
  createSuccessAction,
} from './actionCreators';

export default requestStrategy => (requirements, dispatch, getState) => {
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
