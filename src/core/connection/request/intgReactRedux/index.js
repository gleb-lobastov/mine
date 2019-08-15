import { connect as originalConnect } from 'react-redux';
import createReactProvider from '../provisionReact';
import {
  createRequestAction,
  createInvalidateRequestAction,
  strategyEnhancer as provisionStrategyEnhancer,
  createMiddleware as createRequestMiddleware,
  createReducer as createRequestReducer,
} from '../controllerRedux';

export { READY_STATE, EMPTY_STATE } from '../controllerRedux';

const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

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
      createReactProvider({
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

export default ({ provisionSelector, requirementsComparator }) => ({
  reducer: createRequestReducer(/* reducerOptions */),
  createMiddleware: createRequestMiddleware,
  provisionStrategyEnhancer,
  provide: createReactReduxProvider({
    provisionSelector,
    requirementsComparator,
  }),
});
