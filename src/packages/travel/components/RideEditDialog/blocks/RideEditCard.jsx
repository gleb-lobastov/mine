import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { DatePicker, TimePicker } from '@material-ui/pickers';
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
} from '../localization';

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
};

const RideEditCard = ({
  classes,
  availableVisits,
  rideState: {
    departureVisitId,
    arrivalVisitId,
    vehicleType,
    rideType,
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
  const availableVisitsIds = availableVisits.map(({ visitId }) => visitId);
  const visitsDict = Object.fromEntries(
    availableVisits.map(visit => {
      const { visitId } = visit;
      return [visitId, visit];
    }),
  );
  const renderVisit = useCallback(
    ({ option: visitId }) => {
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
          hasNullOption={true}
          inputId="RideEditCard-departureVisitId"
          onChange={setDepartureVisitId}
          optionRender={renderVisit}
          options={availableVisitsIds}
          value={departureVisitId}
        />
        <OptionsSelect
          caption="Прибытие в"
          hasNullOption={true}
          inputId="RideEditCard-arrivalVisitId"
          onChange={setArrivalVisitId}
          optionRender={renderVisit}
          options={availableVisitsIds}
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
          value={departureDateTime}
          onChange={setDepartureDateTime}
          label="Дата отправления"
        />
        <TimePicker
          autoOk={true}
          ampm={false}
          value={departureDateTime}
          onChange={setDepartureDateTime}
          label="Время отправления"
        />
      </div>
      <div className={classes.optionGroup}>
        <DatePicker
          autoOk={true}
          value={arrivalDateTime}
          onChange={setArrivalDateTime}
          label="Дата прибытия"
        />
        <TimePicker
          autoOk={true}
          ampm={false}
          value={arrivalDateTime}
          onChange={setArrivalDateTime}
          label="Время прибытия"
        />
      </div>
    </>
  );
};

RideEditCard.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.arrayOf(PropTypes.string).isRequired,
};
RideEditCard.defaultProps = {
  className: undefined,
};

export default withStyles(styles)(RideEditCard);
