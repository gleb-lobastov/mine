import React from 'react';
import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import withProvision from 'core/connection/withProvision';
import { selectPlaceholder, selectIsReady } from 'core/connection';
import WelcomeScreen from 'travel/components/common/WelcomeScreen';
import ridesPropTypes from 'travel/models/rides/propTypes';
import { VEHICLE_NAMES } from 'travel/components/models/rides/RideEditDialog/localization';

const withCounter = (text, counter) => {
  if (!counter || counter === 1) {
    return text;
  }
  return `${text} x${counter}`;
};

const byRidesCount = ([, ridesA], [, ridesB]) => ridesB.length - ridesA.length;

const RidesPage = ({
  isRidesComplete,
  rides: { data: ridesList = [] } = {},
}) => {
  if (isRidesComplete && !ridesList.length) {
    return <WelcomeScreen />;
  }

  const ridesByType = Object.entries(groupBy(ridesList, 'vehicleType')).sort(
    byRidesCount,
  );

  return (
    <div>
      {ridesByType.map(([vehicleType, rides]) => (
        <div key={`id${vehicleType}`}>
          <span>{withCounter(VEHICLE_NAMES[vehicleType], rides.length)}</span>
        </div>
      ))}
    </div>
  );
};
RidesPage.propTypes = {
  isRidesComplete: PropTypes.bool.isRequired,
  rides: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(ridesPropTypes)),
  }),
};
RidesPage.defaultProps = {
  rides: { data: [] },
};

const mapStateToProps = state => ({
  isRidesComplete: selectIsReady(state, 'ridesPage.rides'),
});

const mapStateToRequirements = (
  state,
  {
    match: {
      params: { userAlias },
    },
  },
) => {
  const { data: userTripsIds = [] } =
    selectPlaceholder(state, 'ridesPage.trips') || {};
  return {
    domain: 'ridesPage',
    request: {
      trips: {
        modelName: 'trips',
        observe: userAlias,
        query: { userAlias, navigation: { isDisabled: true } },
      },
      rides: {
        modelName: 'rides',
        observe: userTripsIds,
        isNoop: !userTripsIds || !userTripsIds.length,
        query: {
          filter: { trip_id: { comparator: 'in', value: userTripsIds } },
          navigation: { isDisabled: true },
        },
      },
    },
  };
};

export default withProvision(mapStateToRequirements, mapStateToProps)(
  RidesPage,
);
