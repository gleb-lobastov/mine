import { NODE_TYPE } from '../consts';
import renderCountry from './renderCountry';
import renderLocation from './renderLocation';
import renderDepartureLocation from './renderDepartureLocation';
import renderArrivalLocation from './renderArrivalLocation';
import renderTrip from './renderTrip';
import renderYear from './renderYear';

export default function renderNode({ type, renderProps }) {
  switch (type) {
    case NODE_TYPE.YEAR:
      return renderYear(renderProps);
    case NODE_TYPE.DEPARTURE_LOCATION:
      return renderDepartureLocation(renderProps);
    case NODE_TYPE.LOCATION:
      return renderLocation(renderProps);
    case NODE_TYPE.ARRIVAL_LOCATION:
      return renderArrivalLocation(renderProps);
    case NODE_TYPE.TRIP:
      return renderTrip(renderProps);
    case NODE_TYPE.COUNTRY:
      return renderCountry(renderProps);
    default:
      return null;
  }
}
