import { combineReducers } from 'redux';
import createDistributor from './distributeReducer';
import createReactReduxIntegration from './intgReactRedux';
import createReduxModelIntegration from './intgReduxModelNormalized';

const STATE_PATHS = { ENTITIES: 'entities', PROVISION: 'provision' };
const compose = (...funcs) => arg =>
  funcs.reduceRight((composed, f) => f(composed), arg);

const splitRequestsEnhancer = strategy => (params, ...forwardedArgs) => {
  const {
    meta,
    meta: { domain = 'common' } = {},
    require, // todo require for fetch, parallel for submit?
    ...sharedRequirements
  } = params;

  const { isProvision } = sharedRequirements; // todo consider split for submits
  if (!isProvision || !require) {
    strategy(params, ...forwardedArgs);
  }
  const entries = Object.entries(require || {});
  return Promise.all(
    entries.map(([key, specificRequirements]) =>
      strategy(
        {
          ...sharedRequirements,
          key,
          ...specificRequirements,
          meta: {
            ...meta,
            domain: `${domain}.${key}`,
          },
        },
        ...forwardedArgs,
      ),
    ),
  ).then(responses =>
    responses.reduce((memo, response, index) => {
      const [key] = entries[index];
      // eslint-disable-next-line
      memo[key] = response;
      return memo;
    }, {}),
  );
};

const mapValues = (object, iteratee) =>
  Object.entries(object).reduce((memo, [key, value]) => {
    memo[key] = iteratee(value, key, object);
    return memo;
  }, {});

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
    selectors: provisionSelectors,
    reducer: provisionReducer,
    provisionStrategyEnhancer,
    createMiddleware,
    provide,
  } = createReactReduxIntegration({
    provisionSelector: (state, requirements) => {
      const { meta: { domain = 'common' } = {}, require = {} } =
        requirements || {};

      const provisionState = state[requestKitStateKey][STATE_PATHS.PROVISION];
      return Object.keys(require).reduce((memo, key) => {
        memo[key] = selectDomainState(provisionState, `${domain}.${key}`);
        return memo;
      }, {});
    },
    selectDomainStates: (state, domain) => {
      const provisionState = state[requestKitStateKey][STATE_PATHS.PROVISION];
      // note this is array, when expected an object
      return selectDomainStates(provisionState, domain);
    },
    provisionAdapter: (state, provision, requirements) => {
      // todo apply or remove:
      // const { expose = 'value' } = requirements;
      // const exposed = ['fallback', 'value'].includes(expose)
      //   ? provision[expose]
      //   : undefined;
      const { value, fallback } = provision;
      return {
        provision,
        // todo value || fallback -- ambiguous!
        ...mapValues(value || fallback || {}, (result, key) =>
          denormalize(state, requirements.require[key], result),
        ),
      };
    },
  });

  return {
    reduxMiddleware: createMiddleware({
      requestStrategy: compose(
        splitRequestsEnhancer,
        provisionStrategyEnhancer,
        modelsStrategyEnhancer,
      )(requestHandler),
    }),
    provide,
    selectors: { ...entitiesSelectors, ...provisionSelectors },
    reducer: combineReducers({
      [STATE_PATHS.ENTITIES]: entitiesReducer,
      [STATE_PATHS.PROVISION]: distributeReducer(provisionReducer),
    }),
    submit,
  };
};
