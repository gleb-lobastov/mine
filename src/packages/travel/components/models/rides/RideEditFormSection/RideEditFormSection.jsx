import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
import VisitInfo from 'travel/components/models/visits/VisitInfo';
import {
  RIDE_CLASSES,
  RIDE_OCCUPATION,
  RIDE_TYPES,
  VEHICLE_TYPES,
} from 'travel/models/rides/consts';
import {
  VEHICLE_NAMES,
  RIDE_CLASSES_NAMES,
  RIDE_TYPES_NAMES,
  RIDE_OCCUPATION_NAMES,
} from './localization';
import tieDateTimeFields from './tieDateTimeFields';

// if ride was started/ended in origin, then it has no corresponding
// related visit. Relation is null. So this is not a magic, but real value
const ORIGIN_OF_TRIP = null;

const renderVisit = visitsDict => ({ option: visitId }) => {
  if (visitId === ORIGIN_OF_TRIP) {
    return 'Пункт отправления';
  }
  return <VisitInfo visit={visitsDict[visitId]} />;
};
const renderVehicleType = ({ option: vehicleType }) =>
  vehicleType ? VEHICLE_NAMES[vehicleType] : 'Не указан';
const renderRideType = ({ option: rideType }) =>
  rideType ? RIDE_TYPES_NAMES[rideType] : 'Не указан';
const renderRideClass = ({ option: rideClass }) =>
  rideClass ? RIDE_CLASSES_NAMES[rideClass] : 'Не указан';
const renderRideOccupation = ({ option: rideOccupation }) =>
  rideOccupation ? RIDE_OCCUPATION_NAMES[rideOccupation] : 'Не указан';

const useStyles = makeStyles({
  option: {
    width: '100%',
  },
});

const RideEditFormSection = ({
  tripVisitsIds,
  visitsDict,
  formikProps: {
    values: {
      vehicleType,
      rideType,
      rideComment,
      rideClass,
      rideOccupation,
      departureVisitId,
      departureDateTime,
      arrivalVisitId,
      arrivalDateTime,
    },
    handleChange,
    setFieldValue,
  },
}) => {
  const classes = useStyles();
  const isTripHasVisits = tripVisitsIds && tripVisitsIds.length > 0;
  const {
    rideArrivalField,
    rideDepartureField,
    isSameDateField,
  } = tieDateTimeFields({
    values: {
      rideDeparture: departureDateTime,
      rideArrival: arrivalDateTime,
    },
    setFieldValue,
  });

  return (
    <Grid container={true} spacing={3} alignItems="center">
      {isTripHasVisits && (
        <>
          <Grid item={true} xs={6}>
            <OptionsSelect
              name="departureVisitId"
              caption="Отправление из"
              inputId="RideEditCard-departureVisitId"
              optionRender={renderVisit(visitsDict)}
              hasNullOption={false}
              options={[ORIGIN_OF_TRIP, ...tripVisitsIds]}
              value={departureVisitId}
              onChange={handleChange}
            />
          </Grid>
          <Grid item={true} xs={6}>
            <OptionsSelect
              name="arrivalVisitId"
              caption="Прибытие в"
              inputId="RideEditCard-arrivalVisitId"
              hasNullOption={false}
              optionRender={renderVisit(visitsDict)}
              options={[...tripVisitsIds, ORIGIN_OF_TRIP]}
              onChange={handleChange}
              value={arrivalVisitId}
            />
          </Grid>
        </>
      )}
      <Grid item={true} xs={6}>
        <OptionsSelect
          name="vehicleType"
          caption="Транспорт"
          inputId="RideEditCard-VehicleTypeOptions"
          optionRender={renderVehicleType}
          options={Object.values(VEHICLE_TYPES)}
          onChange={handleChange}
          value={vehicleType}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <OptionsSelect
          name="rideType"
          caption="Тип поездки"
          inputId="RideEditCard-RideTypeOptions"
          optionRender={renderRideType}
          options={Object.values(RIDE_TYPES)}
          onChange={handleChange}
          value={rideType}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <OptionsSelect
          name="rideClass"
          caption="Класс поездки"
          inputId="RideEditCard-RideClassOptions"
          optionRender={renderRideClass}
          options={Object.values(RIDE_CLASSES)}
          onChange={handleChange}
          value={rideClass}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <OptionsSelect
          name="rideOccupation"
          caption="Роль"
          inputId="RideEditCard-RideOccupationOptions"
          optionRender={renderRideOccupation}
          options={Object.values(RIDE_OCCUPATION)}
          onChange={handleChange}
          value={rideOccupation}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <KeyboardDatePicker
          name="departureDateTime"
          autoOk={true}
          className={classes.option}
          label="Дата отправления"
          value={rideDepartureField.value}
          onChange={rideDepartureField.onChange}
          format="dd/MM/yyyy"
        />
      </Grid>
      <Grid item={true} xs={6}>
        {isSameDateField.value ? (
          <FormControlLabel
            control={
              <Checkbox
                checked={isSameDateField.value}
                onChange={event =>
                  isSameDateField.onChange(event.target.checked)
                }
              />
            }
            label="Прибытие в тот же день"
          />
        ) : (
          <KeyboardDatePicker
            name="arrivalDateTime"
            autoOk={true}
            className={classes.option}
            label="Дата прибытия"
            value={rideArrivalField.value}
            onChange={rideArrivalField.onChange}
            format="dd/MM/yyyy"
          />
        )}
      </Grid>
      <Grid item={true} xs={6}>
        <TimePicker
          name="departureDateTime"
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время отправления"
          value={rideDepartureField.value}
          onChange={rideDepartureField.onChange}
        />
      </Grid>
      <Grid item={true} xs={6}>
        <TimePicker
          name="arrivalDateTime"
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время прибытия"
          value={rideArrivalField.value}
          onChange={rideArrivalField.onChange}
        />
      </Grid>
      <Grid item={true} xs={12}>
        <TextField
          name="rideComment"
          className={classes.option}
          label="Комментарий"
          multiline={true}
          onChange={handleChange}
          rows={1}
          rowsMax={12}
          value={rideComment}
        />
      </Grid>
    </Grid>
  );
};

RideEditFormSection.propTypes = {};
RideEditFormSection.defaultProps = {};

export default RideEditFormSection;
