import * as adapters from './adapters';
import * as consts from './consts';
import model from './model';
import * as propTypes from './propTypes';
import initialize from './initialize';
import validationSchema from './validationSchema';

export default {
  adapters,
  consts,
  model,
  propTypes,
  initialize,
  validationSchema,
};

export const tripsAdapters = adapters;
export const tripsConsts = consts;
export const tripsModel = model;
export const tripsPropTypes = propTypes;
export const initializeTrip = initialize;
export const tripValidationSchema = validationSchema;
