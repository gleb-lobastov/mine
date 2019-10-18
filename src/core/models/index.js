import { travelModels } from 'travel';
import { literatureModels } from 'literature';

export default [
  literatureModels.articles.model,
  travelModels.countries.model,
  travelModels.locations.model,
  travelModels.geonames.model,
  travelModels.rides.model,
  travelModels.trips.model,
  travelModels.visits.model,
];