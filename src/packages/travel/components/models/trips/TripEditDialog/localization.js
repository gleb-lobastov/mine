/* eslint-disable import/prefer-default-export */
// todo use localization library
import { TRIP_TYPES } from 'travel/models/trips/consts';

export const TRIP_TYPE_NAMES = {
  [TRIP_TYPES.LEISURE]: 'Отдых',
  [TRIP_TYPES.BUSINESS]: 'Работа',
  [TRIP_TYPES.MIXED]: 'Смешанный',
  [TRIP_TYPES.OTHER]: 'Другой',
};
