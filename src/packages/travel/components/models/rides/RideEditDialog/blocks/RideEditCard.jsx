import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DatePicker, TimePicker } from '@material-ui/pickers';
import OptionsSelect from 'modules/components/muiExtended/OptionsSelect/OptionsSelect';
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
} from '../localization';

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

export const useRideState = ({
  departureVisitId: initialArrivalVisitId,
  arrivalVisitId: initialDepartureVisitId,
  vehicleType: initialVehicleType,
  rideType: initialRideType,
  rideComment: initialRideComment,
  rideClass: initialRideClass,
  rideOccupation: initialRideOccupation,
  departureDateTime: initialDepartureDateTime,
  arrivalDateTime: initialArrivalDateTime,
}) => {
  const [rideState, setRideState] = useState({
    departureVisitId: initialArrivalVisitId,
    arrivalVisitId: initialDepartureVisitId,
    vehicleType: initialVehicleType,
    rideType: initialRideType,
    rideComment: initialRideComment,
    rideClass: initialRideClass,
    rideOccupation: initialRideOccupation,
    departureDateTime: initialDepartureDateTime,
    arrivalDateTime: initialArrivalDateTime,
  });

  return {
    rideState,
    setRideState: rideStateUpdate =>
      setRideState({ ...rideState, ...rideStateUpdate }),
  };
};

const styles = {
  optionGroup: {
    display: 'flex',
  },
  option: {
    flexGrow: '1',
  },
};

const RideEditCard = ({
  classes,
  availableVisits,
  originLocation,
  rideState: {
    departureVisitId,
    arrivalVisitId,
    vehicleType,
    rideType,
    rideComment,
    rideClass,
    rideOccupation,
    departureDateTime,
    arrivalDateTime,
  },
  setRideState,
}) => {
  const setDepartureVisitId = useCallback(
    ({ target: { value: nextDepartureVisitId } }) =>
      setRideState({ departureVisitId: nextDepartureVisitId }),
    [setRideState],
  );
  const setArrivalVisitId = useCallback(
    ({ target: { value: nextArrivalVisitId } }) =>
      setRideState({ arrivalVisitId: nextArrivalVisitId }),
    [setRideState],
  );
  const setVehicleType = useCallback(
    ({ target: { value: nextVehicleType } }) =>
      setRideState({ vehicleType: nextVehicleType }),
    [setRideState],
  );
  const setRideType = useCallback(
    ({ target: { value: nextRideType } }) =>
      setRideState({ rideType: nextRideType }),
    [setRideState],
  );
  const setRideClass = useCallback(
    ({ target: { value: nextRideClass } }) =>
      setRideState({ rideClass: nextRideClass }),
    [setRideState],
  );
  const setRideOccupation = useCallback(
    ({ target: { value: nextRideOccupation } }) =>
      setRideState({ rideOccupation: nextRideOccupation }),
    [setRideState],
  );
  const setArrivalDateTime = useCallback(
    nextArrivalDateTime =>
      setRideState({ arrivalDateTime: nextArrivalDateTime }),
    [setRideState],
  );
  const setDepartureDateTime = useCallback(
    nextDepartureDateTime =>
      setRideState({ departureDateTime: nextDepartureDateTime }),
    [setRideState],
  );
  const setRideComment = useCallback(
    ({ target: { value: nextRideComment } }) =>
      setRideState({ rideComment: nextRideComment }),
    [setRideState],
  );
  const availableVisitsIds = availableVisits.map(({ visitId }) => visitId);
  const visitsDict = Object.fromEntries(
    availableVisits.map(visit => {
      const { visitId } = visit;
      return [visitId, visit];
    }),
  );
  const renderVisit = useCallback(
    ({ option: visitId }) => {
      if (visitId === ORIGIN_OF_TRIP) {
        const { locationName } = originLocation;
        return locationName;
      }
      const visit = visitsDict[visitId];
      if (!visit) {
        return 'Не указано';
      }
      const { locationName } = visit;
      return locationName;
    },
    [visitsDict],
  );
  return (
    <>
      <div className={classes.optionGroup}>
        <OptionsSelect
          caption="Отправление из"
          inputId="RideEditCard-departureVisitId"
          onChange={setDepartureVisitId}
          optionRender={renderVisit}
          hasNullOption={false}
          options={[ORIGIN_OF_TRIP, ...availableVisitsIds]}
          value={departureVisitId}
        />
        <OptionsSelect
          caption="Прибытие в"
          inputId="RideEditCard-arrivalVisitId"
          onChange={setArrivalVisitId}
          hasNullOption={false}
          optionRender={renderVisit}
          options={[...availableVisitsIds, ORIGIN_OF_TRIP]}
          value={arrivalVisitId}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          caption="Транспорт"
          inputId="RideEditCard-VehicleTypeOptions"
          onChange={setVehicleType}
          optionRender={renderVehicleType}
          options={Object.values(VEHICLE_TYPES)}
          value={vehicleType}
        />
        <OptionsSelect
          caption="Тип поездки"
          inputId="RideEditCard-RideTypeOptions"
          onChange={setRideType}
          optionRender={renderRideType}
          options={Object.values(RIDE_TYPES)}
          value={rideType}
        />
      </div>
      <div className={classes.optionGroup}>
        <OptionsSelect
          caption="Класс поездки"
          inputId="RideEditCard-RideClassOptions"
          onChange={setRideClass}
          optionRender={renderRideClass}
          options={Object.values(RIDE_CLASSES)}
          value={rideClass}
        />
        <OptionsSelect
          caption="Роль"
          inputId="RideEditCard-RideOccupationOptions"
          onChange={setRideOccupation}
          optionRender={renderRideOccupation}
          options={Object.values(RIDE_OCCUPATION)}
          value={rideOccupation}
        />
      </div>
      <div className={classes.optionGroup}>
        <DatePicker
          autoOk={true}
          className={classes.option}
          label="Дата отправления"
          onChange={setDepartureDateTime}
          value={departureDateTime}
        />
        <TimePicker
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время отправления"
          onChange={setDepartureDateTime}
          value={departureDateTime}
        />
      </div>
      <div className={classes.optionGroup}>
        <DatePicker
          autoOk={true}
          className={classes.option}
          label="Дата прибытия"
          onChange={setArrivalDateTime}
          value={arrivalDateTime}
        />
        <TimePicker
          ampm={false}
          autoOk={true}
          className={classes.option}
          label="Время прибытия"
          onChange={setArrivalDateTime}
          value={arrivalDateTime}
        />
      </div>
      <div className={classes.optionGroup}>
        <TextField
          className={classes.option}
          label="Комментарий"
          multiline={true}
          onChange={setRideComment}
          rows={1}
          rowsMax={12}
          value={rideComment}
        />
      </div>
    </>
  );
};

RideEditCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};
RideEditCard.defaultProps = {
  className: undefined,
};

export default withStyles(styles)(RideEditCard);
