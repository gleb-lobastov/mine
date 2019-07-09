import { combineReducers } from 'redux';
import createDistributor from './distributeReducer';
import createReactReduxIntegration from './intgReactRedux';
import createReduxModelIntegration from './intgReduxModelNormalized';
import {
  multiRequestEnhancer,
  multiProvisionSelector,
  multiProvisionAdapter,
  mergeProvisionState,
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
  const {
    selectors: entitiesSelectors,
    reducer: entitiesReducer,
    modelsStrategyEnhancer,
    denormalize,
    submit,
  } = createReduxModelIntegration({
    entitiesSelectorRoot: state =>
      state[requestKitStateKey][STATE_PATHS.ENTITIES],
    modelsConfig,
  });

  const {
    distributeReducer,
    selectDomainState,
    selectDomainStates,
  } = createDistributor(distributorConfig);

  const {
    reducer: provisionReducer,
    provisionStrategyEnhancer,
    createMiddleware,
    provide,
  } = createReactReduxIntegration({
    provisionSelector: (state, requirements) => {
      const provisionState = state[requestKitStateKey][STATE_PATHS.PROVISION];
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
    },
  });

  return {
    reduxMiddleware: createMiddleware({
      requestStrategy: compose(
        multiRequestEnhancer,
        provisionStrategyEnhancer,
        modelsStrategyEnhancer,
      )(requestHandler),
    }),
    provide,
    selectors: {
      ...entitiesSelectors,
      selectProvisionStatus: (state, domain) => {
        const provisionState = state[requestKitStateKey][STATE_PATHS.PROVISION];
        // note this is array, when expected an object
        return mergeProvisionState(selectDomainStates(provisionState, domain));
      },
    },
    reducer: combineReducers({
      [STATE_PATHS.ENTITIES]: entitiesReducer,
      [STATE_PATHS.PROVISION]: distributeReducer(provisionReducer),
    }),
    submit,
  };
};
