import renderCountry from './renderCountry';
import renderLocation from './renderLocation';
import renderOriginLocation from './renderOriginLocation';
import renderTrip from './renderTrip';
import renderYear from './renderYear';
import { GROUP_VISITS_BY } from '../consts';

export default function renderNodesInOrder(renderProps) {
  const {
    groupBy,
    changes: { isTripChanged, willTripChange },
  } = renderProps;
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return [
        renderTrip(renderProps),
        isTripChanged &&
          renderOriginLocation({ ...renderProps, shouldRenderRide: true }),
        renderLocation(renderProps),
        willTripChange &&
          renderOriginLocation({ ...renderProps, shouldRenderRide: false }),
      ];
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return [
        renderTrip(renderProps),
        renderCountry(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.COUNTRIES:
      return [renderCountry(renderProps), renderLocation(renderProps)];
    case GROUP_VISITS_BY.YEARS:
      return [renderYear(renderProps), renderLocation(renderProps)];
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return [
        renderYear(renderProps),
        renderCountry(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return [
        renderCountry(renderProps),
        renderYear(renderProps),
        renderLocation(renderProps),
      ];
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      // return {push:[locationNode], keep: [countryNode, yearNode]};
      return [renderLocation(renderProps)];
  }
}
