import groupBy from 'lodash/groupBy';
import uniqTrimAndJoin from 'modules/utilities/text/uniqTrimAndJoin';
import { VISIT_TYPES } from 'travel/models/visits/consts';

export default (tripVisitsList, countriesDict, originCountryId, fallback) => {
  if (!tripVisitsList.length) {
    return fallback;
  }
  const visitsByCountries = Object.keys(
    groupBy(
      tripVisitsList.filter(
        ({ visitType }) => visitType !== VISIT_TYPES.TRANSIT,
      ),
      'countryId',
    ),
  );
  if (visitsByCountries.length === 1) {
    return (
      uniqTrimAndJoin(tripVisitsList.map(({ locationName }) => locationName), {
        maxLength: 4,
      }) || fallback
    );
  }
  return (
    uniqTrimAndJoin(
      visitsByCountries
        .map(
          countryId =>
            Number(countryId) !== originCountryId &&
            countriesDict[countryId] &&
            countriesDict[countryId].countryName,
        )
        .filter(Boolean),
      { maxLength: 4 },
    ) || fallback
  );
};
