import { combineReducers } from 'redux';
import createDistributor from './distributeReducer';
import createReactReduxIntegration, { EMPTY_STATE } from './intgReactRedux';
import createReduxModelIntegration from './intgReduxModelNormalized';
import {
  multiRequestEnhancer,
  multiProvisionSelector,
  multiProvisionAdapter,
  multiCheckIsRequirementsChanged,
} from './multiRequest';
import mergeProvisionState from './mergeProvisionState';

const STATE_PATHS = { ENTITIES: 'entities', PROVISION: 'provision' };
const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

export default ({
  modelsConfig,
  requestHandler,
  distributorConfig = {},
  requestKitStateKey = 'requestKit',
}) => {
  const selectEntities = state =>
    state[requestKitStateKey][STATE_PATHS.ENTITIES];
  const selectProvision = state =>
    state[requestKitStateKey][STATE_PATHS.PROVISION];

  const {
    selectors: entitiesSelectors,
    reducer: entitiesReducer,
    modelsStrategyEnhancer,
    denormalize,
    submit,
  } = createReduxModelIntegration({
    entitiesSelector: selectEntities,
    modelsConfig,
  });

  const {
    distributeReducer,
    selectDomainState,
    selectDomainStates,
  } = createDistributor({ ...distributorConfig, emptyState: EMPTY_STATE });

  const provisionSelector = (state, requirements) => {
    const provisionState = selectProvision(state);
    const provision = multiProvisionSelector(
      provisionState,
      requirements,
      selectDomainState,
    );
    const { noFallback } = requirements;
    const { value, fallback } = provision;
    return {
      provision,
      ...multiProvisionAdapter({
        originalAdapter: denormalize,
        provisionValues:
          noFallback || typeof value !== 'undefined' ? value : fallback,
        requirements,
        state,
      }),
    };
  };

  const provisionSelectorSimple = (state, requirements) => {
    const { domain = '__unassigned' } = requirements || {};
    return selectDomainState(selectProvision(state), domain);
  };

  const {
    reducer: provisionReducer,
    selectors: provisionSelectors,
    strategyEnhancer: provisionStrategyEnhancer,
    createMiddleware: createReduxMiddleware,
    provide,
    useProvision,
    useRequest,
  } = createReactReduxIntegration({
    requirementsComparator: multiCheckIsRequirementsChanged,
    provisionSelector,
    provisionSelectorSimple,
    stateSelector: (state, domain) =>
      selectDomainState(selectProvision(state), domain),
  });

  const requestStrategy = compose(
    multiRequestEnhancer,
    provisionStrategyEnhancer,
    modelsStrategyEnhancer,
  )(requestHandler);

  const reducer = combineReducers({
    [STATE_PATHS.ENTITIES]: entitiesReducer,
    [STATE_PATHS.PROVISION]: distributeReducer(provisionReducer),
  });

  return {
    reduxMiddleware: createReduxMiddleware({ requestStrategy }),
    provide,
    selectors: {
      ...entitiesSelectors,
      ...provisionSelectors,
      selectProvisionStatus: (state, domain, { excludeDomains = [] } = {}) => {
        const provisionState = selectProvision(state);
        return mergeProvisionState(
          selectDomainStates(provisionState, domain),
          particularDomain => !excludeDomains.includes(particularDomain),
        );
      },
    },
    denormalize,
    useProvision,
    useRequest,
    reducer,
    submit,
  };
};
