import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import ProvisionedSuggest from 'modules/components/muiExtended/Suggest/modifications/ProvisionedSuggest';
import { TRIP_TYPES } from 'travel/models/trips/consts';
import { TRIP_TYPE_NAMES } from '../localization';

const renderTripType = ({ option: tripType }) =>
  tripType ? TRIP_TYPE_NAMES[tripType] : 'Не указан';

export const useTripState = ({ tripType: initiaTripType }) => {
  const [tripState, setTripState] = useState({
    tripType: initiaTripType,
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
  tripState: { tripType, tripName },
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
          inputProps={{ placeholder: 'Введите название...' }}
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
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
TripEditCard.defaultProps = {
  className: undefined,
};

export default withStyles(styles)(TripEditCard);
