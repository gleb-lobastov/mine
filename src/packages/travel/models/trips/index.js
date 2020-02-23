import * as adapters from './adapters';
import * as consts from './consts';
import model from './model';
import * as propTypes from './propTypes';
import initialize from './initialize';

export default { adapters, consts, model, propTypes, initialize };
export const tripsAdapters = adapters;
export const tripsConsts = consts;
export const tripsModel = model;
export const tripsPropTypes = propTypes;
export const initializeTrip = initialize;
