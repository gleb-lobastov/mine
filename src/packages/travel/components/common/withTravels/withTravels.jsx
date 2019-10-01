import React from 'react';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import withProvision from 'core/connection/withProvision';
import { selectPlaceholder } from 'core/connection';

export default ({ domain, mapStateToProps }) => Component => {
  const mapStateToRequirements = (
    state,
    {
      countriesDict,
      match: {
        params: { userAlias },
      },
    },
  ) => {
    const { data: userTripsIds = [] } =
      selectPlaceholder(state, `${domain}.trips`) || {};
    return {
      domain,
      request: {
        countries: {
          modelName: 'countries',
          condition: !countriesDict || !Object.keys(countriesDict).length,
          query: { navigation: { isDisabled: true } },
        },
        trips: {
          modelName: 'trips',
          observe: userAlias,
          query: { userAlias, navigation: { isDisabled: true } },
        },
        visits: {
          modelName: 'visits',
          observe: userTripsIds,
          condition: userTripsIds && userTripsIds.length,
          query: {
            filter: { trip_id: { comparator: 'in', value: userTripsIds } },
            navigation: { isDisabled: true },
          },
        },
        rides: {
          modelName: 'rides',
          observe: userTripsIds,
          condition: userTripsIds && userTripsIds.length,
          query: {
            filter: { trip_id: { comparator: 'in', value: userTripsIds } },
            navigation: { isDisabled: true },
          },
        },
      },
    };
  };

  const ProvisionedComponent = compose(
    withRouter,
    withProvision(mapStateToRequirements, mapStateToProps),
  )(Component);

  return props => <ProvisionedComponent {...props} />;
};
