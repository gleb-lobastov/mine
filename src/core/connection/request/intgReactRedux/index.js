import { connect as originalConnect } from 'react-redux';
import createReactProvider from '../provisionReact';
import {
  createRequestAction,
  requestSelectors,
  requestStrategyEnhancer as provisionStrategyEnhancer,
  createRequestMiddleware,
  createRequestReducer,
} from '../controllerRedux';
import { memoizeByLastArgs } from './memo';

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
    dispatch(createRequestAction(requirements)),
  resolveProvision: ({ provision }) => provision,
  requirementsComparator,
});

const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});

const createReactReduxProvider = ({
  provisionSelector,
  connect = originalConnect,
  provisionAdapter = (state, provision) => ({ provision }),
}) => mapStateToRequirements => {
  const selectProvision = memoizeByLastArgs((state = {}) => {
    const values = Object.values(state);
    return {
      isComplete: values.every(requestSelectors.selectIsReady),
      isPending: values.some(requestSelectors.selectIsPending),
      error: values.find(requestSelectors.selectError),
      errors: values.map(requestSelectors.selectError).filter(Boolean),
      fallback: mapValues(state, requestSelectors.selectAvailableResult),
      value: mapValues(state, requestSelectors.selectRelevantResult),
    };
  });

  const mapStateToProps = (state, props) => {
    const fulfilledRequirements = requestSelectors.selectIsFulfilled(state)
      ? requestSelectors.selectRequirements(state)
      : null;
    const requirements = mapStateToRequirements(state, props) || {};
    const provision = selectProvision(provisionSelector(state, requirements));

    return {
      fulfilledRequirements,
      requirements,
      ...provisionAdapter(state, provision, requirements),
    };
  };

  // react-redux perform optimization when props is not used in state calculation
  // usage of props is determined through mapper func arity
  const actualMapStateToProps =
    mapStateToRequirements.length === 1
      ? state => mapStateToProps(state)
      : mapStateToProps;

  return WrappedComponent =>
    compose(
      connect(actualMapStateToProps),
      provideInternal,
    )(WrappedComponent);
};

export default ({ provisionSelector, provisionAdapter }) => ({
  reducer: createRequestReducer(/* reducerOptions */),
  createMiddleware: createRequestMiddleware,
  provisionStrategyEnhancer,
  provide: createReactReduxProvider({ provisionSelector, provisionAdapter }),
});
