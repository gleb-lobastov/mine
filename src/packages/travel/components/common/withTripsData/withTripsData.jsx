import React from 'react';
import { withRouter } from 'react-router';
import isFunction from 'lodash/isFunction';
import compose from 'lodash/fp/compose';
import withProvision from 'core/connection/withProvision';
import { selectUserTripsIds, selectLocationsIds } from './selectors';

export const DATA_CHUNKS = {
  COMMON: {
    COUNTRIES: 'COMMON.COUNTRIES',
  },
  USER: {
    TRIPS: 'USER.TRIPS',
    LOCATIONS: 'USER.LOCATIONS',
    VISITS: 'USER.VISITS',
    RIDES: 'USER.RIDES',
  },
};

export default ({
  domain,
  mapStateToProps,
  requirementsConfig: mapStateToRequirementsConfig,
}) => Component => {
  const mapStateToRequirements = (state, props) => {
    const {
      countriesDict,
      match: {
        params: { userAlias },
      },
    } = props;
    const userTripsIds = selectUserTripsIds(state, domain);

    const requirementsConfig = isFunction(mapStateToRequirementsConfig)
      ? mapStateToRequirementsConfig(state, props)
      : mapStateToRequirementsConfig;

    const request = {};
    if (requirementsConfig[DATA_CHUNKS.COMMON.COUNTRIES]) {
      request.countries = {
        modelName: 'countries',
        condition: !countriesDict || !Object.keys(countriesDict).length,
        query: { navigation: { isDisabled: true } },
      };
    }
    if (requirementsConfig[DATA_CHUNKS.USER.TRIPS]) {
      request.userTrips = {
        modelName: 'trips',
        observe: userAlias,
        query: { userAlias, navigation: { isDisabled: true } },
      };
    }
    if (requirementsConfig[DATA_CHUNKS.USER.LOCATIONS]) {
      const { requiredLocationsIds, missingLocationsIds } = selectLocationsIds(
        state,
        userTripsIds,
      );

      request.userLocations = {
        modelName: 'locations',
        observe: requiredLocationsIds,
        condition: missingLocationsIds.length,
        query: {
          filter: { id: { comparator: 'in', value: missingLocationsIds } },
          navigation: { isDisabled: true },
        },
      };
    }
    if (requirementsConfig[DATA_CHUNKS.USER.VISITS]) {
      const { year } = requirementsConfig[DATA_CHUNKS.USER.VISITS];
      const actualYear = parseInt(
        /^\d{4}$/.test(String(year)) ? year : undefined,
        10,
      );
      request.userVisits = {
        modelName: 'visits',
        observe: { userTripsIds, year },
        condition: userTripsIds && userTripsIds.length,
        query: {
          filter: {
            trip_id: { comparator: 'in', value: userTripsIds },
            departure_date_time: actualYear
              ? { comparator: '>=', value: `${actualYear}-01-01` }
              : undefined,
            arrival_date_time: actualYear
              ? { comparator: '<', value: `${actualYear + 1}-01-01` }
              : undefined,
          },
          navigation: { isDisabled: true },
        },
      };
    }
    if (requirementsConfig[DATA_CHUNKS.USER.RIDES]) {
      request.userRides = {
        modelName: 'rides',
        observe: userTripsIds,
        condition: userTripsIds && userTripsIds.length,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      };
    }

    return {
      domain,
      request,
    };
  };

  const ProvisionedComponent = compose(
    withRouter,
    withProvision(mapStateToRequirements, mapStateToProps),
  )(Component);

  return props => <ProvisionedComponent {...props} />;
};
