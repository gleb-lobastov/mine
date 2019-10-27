import React from 'react';
import groupBy from 'lodash/groupBy';
import PropTypes from 'prop-types';
import withTripsData, {
  DATA_CHUNKS,
} from 'travel/components/common/withTripsData/withTripsData';
import { selectIsReady } from 'core/connection';
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
  userRides: { data: ridesList = [] } = {},
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

export default withTripsData({
  domain: 'ridesPage',
  mapStateToProps,
  requirementsConfig: {
    [DATA_CHUNKS.USER.TRIPS]: true,
    [DATA_CHUNKS.USER.RIDES]: true,
  },
})(RidesPage);
