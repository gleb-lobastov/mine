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

  const { distributeReducer, selectDomainState } = createDistributor(
    distributorConfig,
  );

  const {
    reducer: provisionReducer,
    provisionStrategyEnhancer,
    createMiddleware,
    provide,
  } = createReactReduxIntegration({
    provisionSelector: (state, requirements) => {
      const { meta: { domain = 'common' } = {}, require = {} } =
        requirements || {};

      return Object.keys(require).reduce((memo, key) => {
        memo[key] = selectDomainState(
          state[requestKitStateKey][STATE_PATHS.PROVISION],
          `${domain}.${key}`,
        );
        return memo;
      }, {});
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
    selectors: entitiesSelectors,
    reducer: combineReducers({
      [STATE_PATHS.ENTITIES]: entitiesReducer,
      [STATE_PATHS.PROVISION]: distributeReducer(provisionReducer),
    }),
    submit,
  };
};

/*
const { models, middleware, provide, reducer } = createRequestKit({
  requestConfig: {
    presetOptions: {},
    plugins: [],
  },
  modelsDefinitions: {
    travelers: {},
    visits: {},
    cities: {},
  },
});

/*
const PAGE_DOMAIN = 'CitiesPage';
const CITIES_KEY = 'cities';
provide((state, { match: { params: { strTravelerId, strCountryId } } }) => ({
meta: {
  domain: 'CitiesPage',
  }
  requests: {
    traveler: {
      modelKey: travelers.modelKey,
      query: {
        id: { id: parseInt(strTravelerId, 10) },
      },
    },
    [CITIES_KEY]: {
      modelKey: cities.modelKey,
      query: {
        filter: {
          countryId: parseInt(strCountryId, 10),
        },
        navigation: false,
      },
    },
    visits: {
      modelKey: visits.modelKey,
      query: {
        filter: {
          citiesIds: cities.selectMissingIds({
            requiredIds: selectProvision(
              state,
              `${PAGE_DOMAIN}.${CITIES_KEY}`,
            ),
          }),
        },
        navigation: false,
      },
    },
  },
}));
*/
