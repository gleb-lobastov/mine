import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import startOfDay from 'date-fns/startOfDay';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { DatePicker, TimePicker } from '@material-ui/pickers';

const VEHICLE_TYPES = {
  CAR: 'Car',
  TRAIN: 'Train',
  AIRCRAFT: 'Aircraft',
  BUS: 'Bus',
  MOTORHOME: 'Motorhome',
  LOCAL_TRAIN: 'LocalTrain',
  FERRY: 'Ferry',
  BIKE: 'Bike',
  BY_FEET: 'ByFeet',
  ROPEWAY: 'Ropeway',
  FUNICULAR: 'Funicular',
  MOTORBIKE: 'Motorbike',
  TRUCK: 'Truck',
  ALL_TERRAIN_VEHICLE: 'AllTerrain',
};
const VEHICLE_NAMES = {
  [VEHICLE_TYPES.CAR]: 'Автомобиль',
  [VEHICLE_TYPES.TRAIN]: 'Поезд',
  [VEHICLE_TYPES.AIRCRAFT]: 'Самолет',
  [VEHICLE_TYPES.BUS]: 'Автобус',
  [VEHICLE_TYPES.MOTORHOME]: 'Дом на колесах',
  [VEHICLE_TYPES.LOCAL_TRAIN]: 'Электричка',
  [VEHICLE_TYPES.FERRY]: 'Паром',
  [VEHICLE_TYPES.BIKE]: 'Велосипед',
  [VEHICLE_TYPES.BY_FEET]: 'Пешком',
  [VEHICLE_TYPES.ROPEWAY]: 'Канатная дорога',
  [VEHICLE_TYPES.FUNICULAR]: 'Фуникулер',
  [VEHICLE_TYPES.MOTORBIKE]: 'Мотоцикл',
  [VEHICLE_TYPES.TRUCK]: 'Грузовик',
  [VEHICLE_TYPES.ALL_TERRAIN_VEHICLE]: 'Вездеход',
};

const RIDE_TYPES = {
  SELF_DRIVE: 'SelfDrive',
  SCHEDULED: 'Scheduled',
  CHARTER: 'Charter',
  TOUR: 'Tour',
  CARPOOL: 'Carpool',
  HITCH_HIKING: 'HitchHiking',
};
const RIDE_TYPES_NAMES = {
  [RIDE_TYPES.SELF_DRIVE]: 'Самостоятельная поездка',
  [RIDE_TYPES.SCHEDULED]: 'Регулярный рейс',
  [RIDE_TYPES.CHARTER]: 'Чартерный рейс', // todo only for aircrafts
  [RIDE_TYPES.TOUR]: 'Тур', // todo except aircrafts
  [RIDE_TYPES.CARPOOL]: 'Попутный автомобиль',
  [RIDE_TYPES.HITCH_HIKING]: 'Автостоп',
};

const RIDE_CLASSES = {
  ECONOMY: 'Economy',
  COMFORT: 'Comfort',
  BUSINESS: 'Business',
  FIRST: 'First',
  PRIVATE: 'Private',
};
const RIDE_CLASSES_NAMES = {
  [RIDE_CLASSES.ECONOMY]: 'Эконом',
  [RIDE_CLASSES.COMFORT]: 'Комфорт',
  [RIDE_CLASSES.BUSINESS]: 'Бизнес',
  [RIDE_CLASSES.FIRST]: 'Первый',
  [RIDE_CLASSES.PRIVATE]: 'Частный',
};

const RIDE_OCCUPATION = {
  PASSENGER: 'Passenger',
  STUFF: 'Stuff',
  DRIVER: 'Driver',
};
const RIDE_OCCUPATION_NAMES = {
  [RIDE_OCCUPATION.PASSENGER]: 'Пассажир',
  [RIDE_OCCUPATION.STUFF]: 'Персонал', // todo кроме персонального транспорта
  [RIDE_OCCUPATION.DRIVER]: 'Водитель', // todo только для персонального транспорта
};

const createOptionsSelect = (options, optionNames) => {
  const OptionsSelect = ({ caption, onChange: handleChange, value }) => (
    <div>
      <InputLabel shrink={true} htmlFor="age-simple">
        {caption}
      </InputLabel>
      <Select
        value={value}
        onChange={handleChange}
        input={<Input id="age-simple" />}
      >
        {Object.values(options).map(option => (
          <MenuItem key={option} value={option}>
            {optionNames[option]}({option})
          </MenuItem>
        ))}
      </Select>
    </div>
  );
  OptionsSelect.propTypes = {
    caption: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  };
  OptionsSelect.defaultProps = {
    value: undefined,
  };
  return OptionsSelect;
};

const VehicleTypeOptions = createOptionsSelect(VEHICLE_TYPES, VEHICLE_NAMES);
const RideTypeOptions = createOptionsSelect(RIDE_TYPES, RIDE_TYPES_NAMES);
const RideClassOptions = createOptionsSelect(RIDE_CLASSES, RIDE_CLASSES_NAMES);
const RideOccupationOptions = createOptionsSelect(
  RIDE_OCCUPATION,
  RIDE_OCCUPATION_NAMES,
);

export const useRideState = ({
  initialState: {
    vehicleType: initialVehicleType = VEHICLE_TYPES.AIRCRAFT,
    rideType: initialRideType = RIDE_TYPES.SCHEDULED,
    rideClass: initialRideClass = RIDE_CLASSES.ECONOMY,
    rideOccupation: initialRideOccupation = RIDE_OCCUPATION.PASSENGER,
    departureDateTime: initialDepartureDateTime = startOfDay(new Date()),
    arrivalDateTime: initialArrivalDateTime = startOfDay(new Date()),
  } = {},
}) => {
  const [rideState, setRideState] = useState({
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

const RideEditCard = ({
  rideState: {
    vehicleType,
    rideType,
    rideClass,
    rideOccupation,
    departureDateTime,
    arrivalDateTime,
  },
  setRideState,
}) => {
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

  return (
    <>
      <VehicleTypeOptions
        caption="Транспорт"
        value={vehicleType}
        onChange={setVehicleType}
      />
      <RideTypeOptions
        caption="Тип поездки"
        value={rideType}
        onChange={setRideType}
      />
      <RideClassOptions
        caption="Класс поездки"
        value={rideClass}
        onChange={setRideClass}
      />
      <RideOccupationOptions
        caption="Роль"
        value={rideOccupation}
        onChange={setRideOccupation}
      />
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
    </>
  );
};

RideEditCard.propTypes = {
  className: PropTypes.string,
};
RideEditCard.defaultProps = {
  className: undefined,
};

export default RideEditCard;
