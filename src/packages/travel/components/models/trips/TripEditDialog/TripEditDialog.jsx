import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import ridePropTypes from 'travel/models/rides/propTypes';
import TripEditCard, { useTripState } from './blocks/TripEditCard';

const TripEditDialog = ({ initialState, onSubmit: handleSubmit }) => {
  const { tripState, setTripState } = useTripState(initialState);

  return <TripEditCard tripState={tripState} setTripState={setTripState} />;
};

TripEditDialog.propTypes = {
  initialState: PropTypes.shape(ridePropTypes).isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
TripEditDialog.defaultProps = {};

export default TripEditDialog;
