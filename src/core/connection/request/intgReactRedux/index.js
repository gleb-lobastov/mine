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

const provideInternal = createReactProvider({
  // for provider internal use
  request: ({ dispatch, requirements }) =>
    dispatch(createRequestAction(requirements)),
  transformProps: ({ dispatch, provision, ...props }) => ({
    ...props,
    provision,
    invalidateRequest: ({ domain }) =>
      dispatch(createInvalidateRequestAction({ domain })),
    // for passing down to component
    request: ({ requirements }) => dispatch(createRequestAction(requirements)),
  }),
});

const createReactReduxProvider = ({
  provisionSelector: selectProvision,
  connect = originalConnect,
}) => (
  mapStateToRequirements,
  originalMapStateToProps,
  _, // currently mapDispatchToProps is unsupported
  ...forwardedParams
) => {
  let prevIdentity;
  const mapStateToProps = (state, props) => {
    const originalMapping = originalMapStateToProps
      ? originalMapStateToProps(state, props)
      : undefined;

    const actualProps = originalMapping
      ? { ...props, ...originalMapping }
      : props;

    const requirements = {
      ...mapStateToRequirements(state, actualProps, prevIdentity),
      isProvision: true,
    };

    const { identity } = requirements;

    const resolvedProps = {
      ...originalMapping,
      prevIdentity,
      requirements,
      ...selectProvision(state, requirements),
    };
    prevIdentity = identity;
    return resolvedProps;
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
      provideInternal,
    )(WrappedComponent);
};

export default ({ provisionSelector }) => ({
  reducer: createRequestReducer(/* reducerOptions */),
  createMiddleware: createRequestMiddleware,
  provisionStrategyEnhancer,
  provide: createReactReduxProvider({ provisionSelector }),
});
