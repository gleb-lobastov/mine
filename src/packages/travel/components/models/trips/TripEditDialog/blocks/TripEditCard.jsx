import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import compose from 'lodash/fp/compose';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import ProvisionedSuggest, {
  QUERY_FORMATS,
} from 'modules/components/muiExtended/Suggest/modifications/ProvisionedSuggest';
import { selectDict } from 'core/connection';
import { TRIP_TYPES } from 'travel/models/trips/consts';
import { TRIP_TYPE_NAMES } from '../localization';

const renderTripType = ({ option: tripType }) =>
  tripType ? TRIP_TYPE_NAMES[tripType] : 'Не указан';

export const useTripState = ({
  tripName: initialTripName,
  tripType: initialTripType,
  originLocationId: initialOriginLocationId,
  originGeonameId: initialOriginGeonameId,
}) => {
  const [tripState, setTripState] = useState({
    tripName: initialTripName,
    tripType: initialTripType,
    originLocationId: initialOriginLocationId,
    originGeonameId: initialOriginGeonameId,
  });

  return {
    tripState,
    setTripState: tripStateUpdate =>
      setTripState({ ...tripState, ...tripStateUpdate }),
  };
};

const styles = {
  optionGroup: {
    display: 'flex',
    minWidth: '400px',
  },
  suggest: {
    flexGrow: 1,
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
  const setOriginGeoname = useCallback(
    ({ geonameId: nextOriginGeonameId }) =>
      setTripState({ originGeonameId: nextOriginGeonameId }),
    [setTripState],
  );

  // origin locations is fetched, so name available through locations dict
  const originLocation = locationsDict[originLocationId];
  const { locationName } = originLocation || {};
  return (
    <>
      <div className={classes.optionGroup}>
        <TextField
          fullWidth={true}
          label="Название поездки"
          value={tripName}
          onChange={setTripName}
        />
      </div>
      <div className={classes.optionGroup}>
        <ProvisionedSuggest
          classes={{ root: classes.suggest }}
          textFieldProps={{
            label: 'Старт из',
          }}
          initialInputValue={locationName}
          inputProps={{ placeholder: 'Населенный пункт...' }}
          onChange={setOriginGeoname}
          sourceProps={{
            filterField: 'locationName',
            modelName: 'geonames',
            domain: 'visitEditCard.geoname',
            queryFormat: QUERY_FORMATS.SEARCH,
            resolveDetails: ({ countryName, regionName }) =>
              [countryName, regionName].filter(Boolean).join(', '),
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
