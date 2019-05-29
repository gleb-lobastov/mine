import PropTypes from 'prop-types';

export default {
  arrivalDateTime: PropTypes.instanceOf(Date),
  departureDateTime: PropTypes.instanceOf(Date),
  rideId: PropTypes.number,
  rideType: PropTypes.string,
  rideClass: PropTypes.string,
  rideOccupation: PropTypes.string,
  vehicleType: PropTypes.string,
};
