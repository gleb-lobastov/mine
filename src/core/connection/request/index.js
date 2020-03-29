import { combineReducers } from 'redux';
import createDistributor from './distributeReducer';
import createReactReduxIntegration, { EMPTY_STATE } from './intgReactRedux';
import createReduxModelIntegration from './intgReduxModelNormalized';
import { mergeProvisionState } from './utils';

const DEFAULT_DOMAIN = '__unassigned';
const STATE_PATHS = { ENTITIES: 'entities', PROVISION: 'provision' };
const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

export default ({
  modelsConfig,
  requestHandler,
  requestKitStateKey = 'requestKit',
}) => {
  const {
    selectors: entitiesSelectors,
    reducer: entitiesReducer,
    modelsStrategyEnhancer,
    denormalize,
  } = createReduxModelIntegration({
    entitiesSelector: selectEntitiesState,
    modelsConfig,
  });

  const {
    reducer: provisionReducer,
    selectors: provisionSelectors,
    strategyEnhancer: provisionStrategyEnhancer,
    createMiddleware: createReduxMiddleware,
    useProvision,
    useRequest,
  } = createReactReduxIntegration({
    provisionSelector: selectProvision,
  });

  const {
    distributeReducer,
    selectDomainState,
    selectDomainStates,
  } = createDistributor({
    emptyState: EMPTY_STATE,
  });

  const requestStrategy = compose(
    provisionStrategyEnhancer,
    modelsStrategyEnhancer,
  )(requestHandler);

  const reducer = combineReducers({
    [STATE_PATHS.ENTITIES]: entitiesReducer,
    [STATE_PATHS.PROVISION]: distributeReducer(provisionReducer),
  });

  return {
    reduxMiddleware: createReduxMiddleware({ requestStrategy }),
    selectors: {
      ...entitiesSelectors,
      ...provisionSelectors,
      selectProvisionStatus,
    },
    denormalize,
    useProvision,
    useRequest,
    reducer,
  };

  function selectEntitiesState(state) {
    return state[requestKitStateKey][STATE_PATHS.ENTITIES];
  }
  function selectProvisionState(state) {
    return state[requestKitStateKey][STATE_PATHS.PROVISION];
  }
  function selectProvision(state, requirements) {
    const { domain = DEFAULT_DOMAIN } = requirements || {};
    return selectDomainState(selectProvisionState(state), domain);
  }
  function selectProvisionStatus(state, domain, { excludeDomains = [] } = {}) {
    const provisionState = selectProvision(state);
    return mergeProvisionState(
      selectDomainStates(provisionState, domain),
      particularDomain => !excludeDomains.includes(particularDomain),
    );
  }
};
