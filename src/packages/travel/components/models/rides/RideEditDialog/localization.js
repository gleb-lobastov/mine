// todo use localization library
import {
  RIDE_CLASSES,
  RIDE_OCCUPATION,
  RIDE_TYPES,
  VEHICLE_TYPES,
} from 'travel/models/rides/consts';

export const RIDE_CLASSES_NAMES = {
  [RIDE_CLASSES.ECONOMY]: 'Эконом',
  [RIDE_CLASSES.COMFORT]: 'Комфорт',
  [RIDE_CLASSES.BUSINESS]: 'Бизнес',
  [RIDE_CLASSES.FIRST]: 'Первый',
  [RIDE_CLASSES.PRIVATE]: 'Частный',
};

export const RIDE_OCCUPATION_NAMES = {
  [RIDE_OCCUPATION.PASSENGER]: 'Пассажир',
  [RIDE_OCCUPATION.STUFF]: 'Персонал', // todo кроме персонального транспорта
  [RIDE_OCCUPATION.DRIVER]: 'Водитель', // todo только для персонального транспорта
};

export const RIDE_TYPES_NAMES = {
  [RIDE_TYPES.SELF_DRIVE]: 'Самостоятельная поездка',
  [RIDE_TYPES.SCHEDULED]: 'Регулярный рейс',
  [RIDE_TYPES.CHARTER]: 'Чартерный рейс', // todo only for aircrafts
  [RIDE_TYPES.TOUR]: 'Тур', // todo except aircrafts
  [RIDE_TYPES.CARPOOL]: 'Попутный автомобиль',
  [RIDE_TYPES.HITCH_HIKING]: 'Автостоп',
};

export const VEHICLE_NAMES = {
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
  [VEHICLE_TYPES.TRAM]: 'Трамвай',
  [VEHICLE_TYPES.TROLLEY]: 'Троллейбус',
  [VEHICLE_TYPES.TAXI]: 'Такси',
  [VEHICLE_TYPES.CITY_BUS]: 'Муниципальный автобус',
  [VEHICLE_TYPES.JITNEY]: 'Маршрутное такси',
  [VEHICLE_TYPES.SUBWAY]: 'Метро',
  [VEHICLE_TYPES.PUBLIC_TRANSPORT]: 'Общественный транспорт',
};
