import mapValues from 'lodash/mapValues';
import max from 'lodash/max';

export default function calcCountriesRating(
  locationsIds,
  locationsDict,
  locationsRating,
) {
  const ratingsGroupedByCountries = locationsIds.reduce((memo, locationId) => {
    const location = locationsDict[locationId];
    if (!location) {
      return memo;
    }
    const locationRating = locationsRating[locationId];
    const { countryId } = location;
    if (!memo[countryId]) {
      memo[countryId] = [];
    }
    memo[countryId].push(locationRating);
    return memo;
  }, {});

  return mapValues(ratingsGroupedByCountries, ratingsByCountry =>
    averageRating(ratingsByCountry),
  );
}

function averageRating(ratings) {
  if (!ratings.length) {
    return Infinity;
  }
  const avg =
    ratings.length / ratings.map(rating => 1 / rating).reduce((a, b) => a + b);

  const best = max(ratings);

  const lengthRatio = Math.log(ratings.length);

  return 1 / (1 / avg + lengthRatio / best);
}
