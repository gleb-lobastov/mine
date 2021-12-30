import React from 'react';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import Suggest, { QUERY_FORMATS } from 'modules/components/muiExtended/Suggest';
import RideInfo from 'travel/components/RideInfo';
import { VISIT_TYPES } from 'travel/models/visits/consts';
import * as locators from './locators';

export const VISIT_TYPE_NAMES = {
  [VISIT_TYPES.TRANSIT]: 'Транзит',
  [VISIT_TYPES.REGULAR]: 'Посещение',
  [VISIT_TYPES.BASE_CAMP]: 'Базовый лагерь',
  [VISIT_TYPES.RELOCATION]: 'Переезд',
};

const renderRide = ridesDict => ({ option: rideId }) => (
  <RideInfo ride={ridesDict[rideId]} isLong={true} />
);
const renderVisitType = ({ option: visitType }) =>
  visitType ? VISIT_TYPE_NAMES[visitType] : 'Не указан';

const useStyles = makeStyles({
  option: {
    width: '100%',
  },
});

export default function VisitEditFormSection({
  tripRidesIds,
  ridesDict,
  formikProps: {
    values: {
      locationName,
      visitType,
      visitComment,
      arrivalRideId,
      departureRideId,
    },
    handleChange,
    handleBlur,
    setFieldValue,
  },
}) {
  const classes = useStyles();
  const isTripHasRides = tripRidesIds && tripRidesIds.length > 0;
  return (
    <Grid container={true} spacing={3} alignItems="center">
      <Grid item={true} xs={12}>
        <Suggest
          data-locator={locators.LOCATION_SUGGEST}
          inputProps={{
            placeholder: 'Место посещения...',
          }}
          initialInputValue={locationName}
          onChange={({ suggestion: { geonameId } }) =>
            setFieldValue('geonameId', geonameId)
          }
          onBlur={handleBlur}
          sourceProps={{
            domain: 'visitEditFormSection.geoname',
            modelName: 'geonames',
            filterField: 'locationName',
            queryFormat: QUERY_FORMATS.SEARCH,
          }}
          transformSuggestionToOption={transformSuggestionToOption}
          triggerProps={{ label: 'Место посещения' }}
        />
      </Grid>
      {isTripHasRides && (
        <>
          <Grid item={true} xs={6}>
            <OptionsSelect
              name="arrivalRideId"
              caption="Прибытие"
              inputId="RideEditCard-arrivalVisitId"
              hasNullOption={false}
              optionRender={renderRide(ridesDict)}
              options={tripRidesIds}
              onChange={handleChange}
              value={arrivalRideId}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <OptionsSelect
              name="departureRideId"
              caption="Отправление"
              inputId="RideEditCard-departureVisitId"
              optionRender={renderRide(ridesDict)}
              hasNullOption={false}
              options={tripRidesIds}
              value={departureRideId}
              onChange={handleChange}
            />
          </Grid>
        </>
      )}
      <Grid item={true} xs={6}>
        <OptionsSelect
          data-locator={locators.VISIT_TYPE_SELECT}
          name="visitType"
          value={visitType}
          onChange={handleChange}
          caption="Тип посещения"
          inputId="VisitEditCard-VisitTypeOptions"
          optionRender={renderVisitType}
          options={Object.values(VISIT_TYPES)}
          hasNullOption={true}
        />
      </Grid>
      <Grid item={true} xs={12}>
        <TextField
          className={classes.option}
          name="visitComment"
          value={visitComment}
          onChange={handleChange}
          label="Комментарий"
          fullWidth={true}
          multiline={true}
          rows={1}
          rowsMax={12}
        />
      </Grid>
    </Grid>
  );
}

VisitEditFormSection.defaultProps = {};

function transformSuggestionToOption(suggestion) {
  const { locationName, countryName, regionName } = suggestion;
  return {
    label: locationName,
    details: [countryName, regionName].filter(Boolean).join(', '),
    suggestion,
  };
}
