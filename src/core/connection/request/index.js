import { combineReducers } from 'redux';
import createDistributor from './distributeReducer';
import createReactReduxIntegration, { EMPTY_STATE } from './intgReactRedux';
import createReduxModelIntegration from './intgReduxModelNormalized';
import {
  multiRequestEnhancer,
  multiProvisionSelector,
  multiProvisionAdapter,
  mergeProvisionState,
  multiRequirementsComparator,
} from './multiRequest';

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

  const {
    reducer: provisionReducer,
    provisionStrategyEnhancer,
    createMiddleware,
    provide,
  } = createReactReduxIntegration({
    requirementsComparator: multiRequirementsComparator,
    provisionSelector,
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
    reduxMiddleware: createMiddleware({ requestStrategy }),
    provide,
    selectors: {
      ...entitiesSelectors,
      selectProvisionStatus: (state, domain) => {
        const provisionState = selectProvision(state);
        // note this is array, when expected an object
        return mergeProvisionState(selectDomainStates(provisionState, domain));
      },
    },
    reducer,
    submit,
  };
};
