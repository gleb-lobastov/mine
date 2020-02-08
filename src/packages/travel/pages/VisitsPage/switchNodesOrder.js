import { GROUP_VISITS_BY } from './consts';

export default function switchNodesOrder(
  { tripNode, countryNode, yearNode, locationNode },
  groupBy,
) {
  switch (groupBy) {
    case GROUP_VISITS_BY.TRIPS:
      return [tripNode, locationNode];
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
      return [tripNode, countryNode, locationNode];
    case GROUP_VISITS_BY.COUNTRIES:
      return [countryNode, locationNode];
    case GROUP_VISITS_BY.YEARS:
      return [yearNode, locationNode];
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return [yearNode, countryNode, locationNode];
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
      return [countryNode, yearNode, locationNode];
    case GROUP_VISITS_BY.LOCATIONS:
    default:
      // return {push:[locationNode], keep: [countryNode, yearNode]};
      return [locationNode];
  }
}
