import { useState, useEffect } from 'react';
import {
  connect as originalConnect,
  useDispatch,
  useSelector,
} from 'react-redux';
import merge from 'lodash/merge';
import observeIsChanged from '../observeIsChanged';
import { createProvider, createUseProvisionHook } from '../provisionReact';
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

export { READY_STATE, EMPTY_STATE } from '../controllerRedux';

const compose = (...funcs) => (...args) => {
  const lastFn = funcs[funcs.length - 1] || (arg => arg);
  return funcs
    .slice(0, -1)
    .reduceRight((composed, f) => f(composed), lastFn(...args));
};

const createReactReduxProvider = ({
  provisionSelector: mapStateToProvision,
  requirementsComparator: compareRequirements,
  connect = originalConnect,
}) => (
  mapStateToRequirements,
  originalMapStateToProps,
  _, // currently mapDispatchToProps is unsupported
  ...forwardedParams
) => {
  const mapStateToProps = (state, props) => {
    const originalPropsMapping = originalMapStateToProps
      ? originalMapStateToProps(state, props)
      : undefined;

    const actualProps = originalPropsMapping
      ? { ...props, ...originalPropsMapping }
      : props;

    const requirements = {
      ...mapStateToRequirements(state, actualProps),
      isProvision: true,
    };

    const provisionPropsMapping = mapStateToProvision(state, requirements);
    return {
      ...originalPropsMapping,
      requirements,
      ...provisionPropsMapping,
    };
  };

  // react-redux perform optimization when props is not used in state calculation
  // usage of props is determined through mapper func arity
  const canOptimize =
    mapStateToRequirements.length === 1 &&
    (!originalMapStateToProps || originalMapStateToProps.length <= 1);

  const actualMapStateToProps = canOptimize
    ? state => mapStateToProps(state)
    : mapStateToProps;

  return WrappedComponent =>
    compose(
      connect(
        actualMapStateToProps,
        null, // dispatch method should be accessible through props
        ...forwardedParams,
      ),
      createProvider({
        requirementsComparator: compareRequirements,
        // for provider internal use
        request: ({ dispatch, requirements }) =>
          dispatch(createRequestAction(requirements)),
        transformProps: ({ dispatch, requirements, provision, ...props }) => ({
          ...props,
          provision,
          invalidateRequest: ({ domain }) =>
            dispatch(createInvalidateRequestAction({ domain })),
          // for passing down to component
          request: customRequirements =>
            // this is an arbitrary requirements, not same that resolved
            // in mapStateToRequirements func
            dispatch(createRequestAction(customRequirements)),
        }),
      }),
    )(WrappedComponent);
};

function connectUseProvisionHook({
  requirementsComparator,
  provisionSelector: selectProvision,
}) {
  const useProvision = createUseProvisionHook({
    requirementsComparator,
    requestHandler: ({ dispatch, requirements }) =>
      dispatch(createRequestAction(requirements)),
  });
  return function useConnectedProvision(requirements) {
    const dispatch = useDispatch();
    const provision = useSelector(state =>
      selectProvision(state, requirements),
    );
    return useProvision({
      provision,
      requirements,
      requestParams: { dispatch },
    });
  };
}

function makeRequest({ provisionSelector: selectProvision }) {
  return function useRequest(preRequirements) {
    const [requirements, setRequirements] = useState();
    const dispatch = useDispatch();
    const provision = useSelector(state =>
      selectProvision(state, requirements),
    );
    useEffect(
      () => {
        if (!requirements) {
          return;
        }
        dispatch(
          createRequestAction(merge({}, requirements, preRequirements || {})),
        );
      },
      [requirements],
    );
    return [setRequirements, provision];
  };
}

const checkIsInvalidated = (prevProvision, nextProvision) => {
  if (!prevProvision) {
    return false;
  }
  const { isValid: prevIsValid = {} } = prevProvision || {};
  const { isValid: nextIsValid = {} } = nextProvision || {};
  return prevIsValid && !nextIsValid;
};

export const checkIsRequirementsChanged = (
  { requirements: prevRequirements, provision: prevProvision },
  { requirements: nextRequirements, provision: nextProvision },
) =>
  checkIsInvalidated(prevProvision, nextProvision) ||
  observeIsChanged(prevRequirements, nextRequirements);

export default ({
  provisionSelector,
  provisionSelectorSimple,
  stateSelector,
  requirementsComparator,
}) => ({
  useProvision: connectUseProvisionHook({
    requirementsComparator: checkIsRequirementsChanged,
    provisionSelector: provisionSelectorSimple,
  }),
  useRequest: makeRequest({
    provisionSelector: provisionSelectorSimple,
  }),
  provide: createReactReduxProvider({
    provisionSelector,
    requirementsComparator,
  }),
  createMiddleware,
  strategyEnhancer,
  reducer: createRequestReducer(/* reducerOptions */),
  selectors: {
    selectError: compose(
      selectError,
      stateSelector,
    ),
    selectIsError: compose(
      selectIsError,
      stateSelector,
    ),
    selectIsPending: compose(
      selectIsPending,
      stateSelector,
    ),
    selectIsReady: compose(
      selectIsReady,
      stateSelector,
    ),
    selectIsUnsent: compose(
      selectIsUnsent,
      stateSelector,
    ),
    selectIsValid: compose(
      selectIsValid,
      stateSelector,
    ),
    selectLastError: compose(
      selectLastError,
      stateSelector,
    ),
    selectPlaceholder: compose(
      selectPlaceholder,
      stateSelector,
    ),
    selectReadyState: compose(
      selectReadyState,
      stateSelector,
    ),
    selectResult: compose(
      selectResult,
      stateSelector,
    ),
  },
});
