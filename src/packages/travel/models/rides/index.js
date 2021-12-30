import * as adapters from './adapters';
import * as consts from './consts';
import initialize from './initialize';
import model from './model';

export default { adapters, consts, model, initialize };
export const ridesAdapters = adapters;
export const ridesConsts = consts;
export const ridesModel = model;
export const initializeRide = initialize;
