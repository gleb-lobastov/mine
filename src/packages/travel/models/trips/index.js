import * as adapters from './adapters';
import * as consts from './consts';
import model from './model';
import initialize from './initialize';
import validationSchema from './validationSchema';

export default {
  adapters,
  consts,
  model,
  initialize,
  validationSchema,
};

export const tripsAdapters = adapters;
export const tripsConsts = consts;
export const tripsModel = model;
export const initializeTrip = initialize;
export const tripValidationSchema = validationSchema;
