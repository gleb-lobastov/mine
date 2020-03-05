import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import { KeyboardDatePicker, TimePicker } from '@material-ui/pickers';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect';
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

const renderVehicleType = ({ option: vehicleType }) =>
  vehicleType ? VEHICLE_NAMES[vehicleType] : 'Не указан';
const renderRideType = ({ option: rideType }) =>
  rideType ? RIDE_TYPES_NAMES[rideType] : 'Не указан';
const renderRideClass = ({ option: rideClass }) =>
  rideClass ? RIDE_CLASSES_NAMES[rideClass] : 'Не указан';
const renderRideOccupation = ({ option: rideOccupation }) =>
  rideOccupation ? RIDE_OCCUPATION_NAMES[rideOccupation] : 'Не указан';

const useStyles = makeStyles({
  optionGroup: {
    display: 'flex',
  },
  option: {
    flexGrow: '1',
  },
});

const RideEditFormSection = ({
  formikProps: {
    values: {
      vehicleType,
      rideType,
      rideComment,
      rideClass,
      rideOccupation,
      departureDateTime,
      arrivalDateTime,
    },
    handleChange,
    setFieldValue,
  },
}) => {
  const classes = useStyles();

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
    <>
      <div className={classes.optionGroup}>
        <OptionsSelect
          name="vehicleType"
          caption="Транспорт"
          inputId="RideEditCard-VehicleTypeOptions"
          optionRender={renderVehicleType}
          options={Object.values(VEHICLE_TYPES)}
          onChange={handleChange}
          value={vehicleType}
        />
        <OptionsSelect
          name="rideType"
          caption="Тип поездки"
          inputId="RideEditCard-RideTypeOptions"
          optionRender={renderRideType}
          options={Object.values(RIDE_TYPES)}
          onChange={handleChange}
          value={rideType}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          name="rideClass"
          caption="Класс поездки"
          inputId="RideEditCard-RideClassOptions"
          optionRender={renderRideClass}
          options={Object.values(RIDE_CLASSES)}
          onChange={handleChange}
          value={rideClass}
        />
        <OptionsSelect
          name="rideOccupation"
          caption="Роль"
          inputId="RideEditCard-RideOccupationOptions"
          optionRender={renderRideOccupation}
          options={Object.values(RIDE_OCCUPATION)}
          onChange={handleChange}
          value={rideOccupation}
        />
      </div>
      <div className={classes.optionGroup}>
        <KeyboardDatePicker
          name="departureDateTime"
          autoOk={true}
          className={classes.option}
          label="Дата отправления"
          value={rideDepartureField.value}
          onChange={rideDepartureField.onChange}
          format="dd/MM/yyyy"
        />
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
      </div>
      <div className={classes.optionGroup}>
        <TimePicker
          name="departureDateTime"
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время отправления"
          value={rideDepartureField.value}
          onChange={rideDepartureField.onChange}
        />
        <TimePicker
          name="arrivalDateTime"
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время прибытия"
          value={rideArrivalField.value}
          onChange={rideArrivalField.onChange}
        />
      </div>
      <div className={classes.optionGroup}>
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
      </div>
    </>
  );
};

RideEditFormSection.propTypes = {};
RideEditFormSection.defaultProps = {};

export default RideEditFormSection;
