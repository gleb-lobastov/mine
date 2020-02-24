import * as yup from 'yup';
import { TRIP_TYPES } from './consts';

export default yup.object({
  originLocationId: yup
    .number('Выберите место начала путешествия')
    .required('Необходимо выбрать место начала путешествия'),
  tripName: yup
    .string('Дайте название путешествию')
    .required(
      'Дайте название путешествию или включите автогенирируемое название',
    ),
  tripType: yup
    .string('Выберите тип путешествия')
    .oneOf(Object.values(TRIP_TYPES), 'Выберите доступный тип путешествия')
    .required('Необходимо выбрать тип путешествия'),
});
