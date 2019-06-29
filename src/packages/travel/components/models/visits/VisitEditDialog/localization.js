/* eslint-disable import/prefer-default-export */
// todo use localization library
import { VISIT_TYPES } from 'travel/models/visits/consts';

export const VISIT_TYPE_NAMES = {
  [VISIT_TYPES.TRANSIT]: 'Транзит',
  [VISIT_TYPES.REGULAR]: 'Посещение',
  [VISIT_TYPES.BASE_CAMP]: 'Базовый лагерь',
  [VISIT_TYPES.RELOCATION]: 'Переезд',
};
