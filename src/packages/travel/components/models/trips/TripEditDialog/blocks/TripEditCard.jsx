import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compose from 'lodash/fp/compose';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import ProvisionedSuggest from 'modules/components/muiExtended/Suggest/modifications/ProvisionedSuggest';
import { selectDict } from 'core/connection';
import { TRIP_TYPES } from 'travel/models/trips/consts';
import { TRIP_TYPE_NAMES } from '../localization';

const renderTripType = ({ option: tripType }) =>
  tripType ? TRIP_TYPE_NAMES[tripType] : 'Не указан';

export const useTripState = ({
  tripName: initialTripName,
  tripType: initialTripType,
  originLocationId: initialOriginLocationId,
}) => {
  const [tripState, setTripState] = useState({
    tripName: initialTripName,
    tripType: initialTripType,
    originLocationId: initialOriginLocationId,
  });

  return {
    tripState,
    setTripState: tripStateUpdate =>
      setTripState({ ...tripState, ...tripStateUpdate }),
  };
};

const styles = {
  optionGroup: {
    display: 'block',
  },
};

const TripEditCard = ({
  classes,
  locationsDict,
  tripState: { tripType, tripName, originLocationId },
  setTripState,
}) => {
  const setTripName = useCallback(
    ({ target: { value: nextTripName } }) =>
      setTripState({ tripName: nextTripName }),
    [setTripState],
  );
  const setTripType = useCallback(
    ({ target: { value: nextTripType } }) =>
      setTripState({ tripType: nextTripType }),
    [setTripState],
  );
  const setOriginLocation = useCallback(
    ({ locationId: nextOriginLocationId }) =>
      setTripState({ originLocationId: nextOriginLocationId }),
    [setTripState],
  );

  const originLocation = locationsDict[originLocationId];
  const { locationName } = originLocation || {};
  return (
    <>
      <div className={classes.optionGroup}>
        <TextField
          label="Название поездки"
          value={tripName}
          onChange={setTripName}
        />
      </div>
      <div className={classes.optionGroup}>
        <ProvisionedSuggest
          textFieldProps={{
            label: 'Старт из',
          }}
          initialInputValue={locationName}
          inputProps={{ placeholder: 'Населенный пункт...' }}
          onChange={setOriginLocation}
          sourceProps={{
            filterField: 'locationName',
            modelName: 'locations',
            domain: 'tripEditCard.location',
          }}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          caption="Тип поездки"
          inputId="TripEditCard-TripTypeOptions"
          onChange={setTripType}
          optionRender={renderTripType}
          options={Object.values(TRIP_TYPES)}
          hasNullOption={true}
          value={tripType}
        />
      </div>
    </>
  );
};

TripEditCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
TripEditCard.defaultProps = {
  className: undefined,
};

const mapStateToProps = state => ({
  locationsDict: selectDict(state, 'locations'),
});

export default compose(
  connect(mapStateToProps),
  withStyles(styles),
)(TripEditCard);
