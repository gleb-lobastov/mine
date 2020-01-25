import { travelModels } from 'travel';
import { literatureModels } from 'literature';

export default [
  literatureModels.articles.model,
  literatureModels.quotes.model,
  travelModels.countries.model,
  travelModels.locations.model,
  travelModels.geonames.model,
  travelModels.rides.model,
  travelModels.visits.model,
  travelModels.trips.model,
];
