import { connect as originalConnect } from 'react-redux';
import createReactProvider from '../provisionReact';
import {
  createRequestAction,
  createProvisionAction,
  requestSelectors,
  requestStrategyEnhancer as provisionStrategyEnhancer,
  createRequestMiddleware,
  createRequestReducer,
} from '../controllerRedux';

const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

const requirementsComparator = (requirementsA, requirementsB) => {
  if (!requirementsA && !requirementsB) {
    return true;
  }
  if (Boolean(requirementsA) !== Boolean(requirementsB)) {
    return false;
  }

  const {
    query: queryA,
    meta: { domain: domainA },
  } = requirementsA;
  const {
    query: queryB,
    meta: { domain: domainB },
  } = requirementsB;

  return domainA === domainB && queryA === queryB;
};

const provideInternal = createReactProvider({
  requireProvision: ({ requirements, dispatch }) =>
    dispatch(createProvisionAction(requirements)),
  request: ({ requirements, dispatch }) =>
    dispatch(createRequestAction(requirements)),
  resolveProvision: ({ provision }) => provision,
  requirementsComparator,
});

const createReactReduxProvider = ({
  provisionSelector: selectProvision,
  connect = originalConnect,
  provisionAdapter = (state, provision) => ({ provision }),
}) => (
  mapStateToRequirements,
  originalMapStateToProps,
  _, // currently mapDispatchToProps is unsupported
  ...forwardedParams
) => {
  const mapStateToProps = (state, props) => {
    const fulfilledRequirements = requestSelectors.selectIsFulfilled(state)
      ? requestSelectors.selectRequirements(state)
      : null;
    const requirements = mapStateToRequirements(state, props) || {};
    const provision = selectProvision(state, requirements);

    const originalMapping = originalMapStateToProps
      ? originalMapStateToProps(state, props)
      : undefined;

    return {
      ...originalMapping,
      fulfilledRequirements,
      requirements,
      ...provisionAdapter(state, provision, requirements),
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
      provideInternal,
    )(WrappedComponent);
};

export default ({
  provisionSelector,
  provisionAdapter,
}) => ({
  reducer: createRequestReducer(/* reducerOptions */),
  createMiddleware: createRequestMiddleware,
  provisionStrategyEnhancer,
  provide: createReactReduxProvider({ provisionSelector, provisionAdapter }),
});
