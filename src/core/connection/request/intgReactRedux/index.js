import { useDispatch, useSelector } from 'react-redux';
import { makeProvisionHook, makeRequestHook } from '../provisionReact';
import {
  selectError,
  selectIsError,
  selectIsPending,
  selectIsReady,
  selectIsUnsent,
  selectIsValid,
  selectLastError,
  selectPlaceholder,
  selectReadyState,
  selectResult,
  createRequestAction,
  createInvalidateRequestAction,
  strategyEnhancer,
  createMiddleware,
  createReducer as createRequestReducer,
} from '../controllerRedux';
import { compose } from '../utils';

export { READY_STATE, EMPTY_STATE } from '../controllerRedux';

function connectProvisionHook({ provisionSelector: selectProvision }) {
  const useProvision = makeProvisionHook({
    requestHandler: ({ dispatch, requirements }) =>
      dispatch(createRequestAction(requirements)),
    invalidateRequestHandler: ({ dispatch, requirements }) =>
      dispatch(createInvalidateRequestAction(requirements)),
  });

  return function useConnectedProvision(requirements) {
    const dispatch = useDispatch();
    const provision = useSelector(state =>
      selectProvision(state, requirements),
    );
    return useProvision({
      requirements,
      provision,
      dispatch,
    });
  };
}

function connectRequestHook({ provisionSelector: selectProvision }) {
  const useRequest = makeRequestHook({
    requestHandler: ({ dispatch, requirements }) =>
      dispatch(createRequestAction(requirements)),
  });

  return function useConnectedRequest(preRequirements) {
    const dispatch = useDispatch();
    const [request, requirements] = useRequest({ preRequirements, dispatch });

    const provision = useSelector(state =>
      selectProvision(state, requirements),
    );
    return [request, provision];
  };
}

export default ({ provisionSelector }) => ({
  useProvision: connectProvisionHook({ provisionSelector }),
  useRequest: connectRequestHook({ provisionSelector }),
  createMiddleware,
  strategyEnhancer,
  reducer: createRequestReducer(/* reducerOptions */),
  selectors: {
    selectError: compose(
      selectError,
      provisionSelector,
    ),
    selectIsError: compose(
      selectIsError,
      provisionSelector,
    ),
    selectIsPending: compose(
      selectIsPending,
      provisionSelector,
    ),
    selectIsReady: compose(
      selectIsReady,
      provisionSelector,
    ),
    selectIsUnsent: compose(
      selectIsUnsent,
      provisionSelector,
    ),
    selectIsValid: compose(
      selectIsValid,
      provisionSelector,
    ),
    selectLastError: compose(
      selectLastError,
      provisionSelector,
    ),
    selectPlaceholder: compose(
      selectPlaceholder,
      provisionSelector,
    ),
    selectReadyState: compose(
      selectReadyState,
      provisionSelector,
    ),
    selectResult: compose(
      selectResult,
      provisionSelector,
    ),
  },
});
