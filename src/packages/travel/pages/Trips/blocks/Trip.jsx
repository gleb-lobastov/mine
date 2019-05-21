import React from 'react';
import PropTypes from 'prop-types';
import Visit from './Visit';

const Trip = ({ trip: { tripId } = {}, visitsList, locationsDict }) => {
  const visitsByTrip = visitsList
    .filter(({ tripId: visitTripId }) => visitTripId === tripId)
    .sort(
      ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
        orderInTripA - orderInTripB,
    );
  if (!visitsByTrip) {
    return null;
  }
  return (
    <div>
      {visitsByTrip.map(visit => (
        <Visit
          key={visit.visitId}
          visit={visit}
          locationsDict={locationsDict}
        />
      ))}
    </div>
  );
};
Trip.propTypes = {
  trip: PropTypes.shape({
    tripName: PropTypes.string,
    tripId: PropTypes.number,
  }).isRequired,
  visitsList: PropTypes.arrayOf(
    PropTypes.shape({
      tripId: PropTypes.number,
      orderInTrip: PropTypes.number,
    }),
  ).isRequired,
  locationsDict: PropTypes.objectOf(
    PropTypes.shape({
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }),
  ).isRequired,
};

export default Trip;
