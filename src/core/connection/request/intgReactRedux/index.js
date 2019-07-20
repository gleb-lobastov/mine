import { connect as originalConnect } from 'react-redux';
import createReactProvider from '../provisionReact';
import {
  createRequestAction,
  createInvalidateRequestAction,
  requestStrategyEnhancer as provisionStrategyEnhancer,
  createRequestMiddleware,
  createRequestReducer,
} from '../controllerRedux';

const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

const createReactReduxProvider = ({
  provisionSelector: selectProvision,
  requirementsComparator: compareRequirements,
  connect = originalConnect,
}) => (
  mapStateToRequirements,
  originalMapStateToProps,
  _, // currently mapDispatchToProps is unsupported
  ...forwardedParams
) => {
  const mapStateToProps = (state, props) => {
    const originalMapping = originalMapStateToProps
      ? originalMapStateToProps(state, props)
      : undefined;

    const actualProps = originalMapping
      ? { ...props, ...originalMapping }
      : props;

    const requirements = {
      ...mapStateToRequirements(state, actualProps),
      isProvision: true,
    };

    return {
      ...originalMapping,
      requirements,
      ...selectProvision(state, requirements),
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
