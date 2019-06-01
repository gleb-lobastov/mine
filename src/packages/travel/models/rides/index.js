import * as adapters from './adapters';
import * as consts from './consts';
import * as propTypes from './propTypes';
import initialize from './initialize';
import model from './model';

export default { adapters, consts, model, propTypes, initialize };
export const ridesAdapters = adapters;
export const ridesConsts = consts;
export const ridesModel = model;
export const ridesPropTypes = propTypes;
export const initializeRide = initialize;
