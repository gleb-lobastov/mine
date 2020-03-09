import groupBy from 'lodash/groupBy';
import uniqTrimAndJoin from 'modules/utilities/text/uniqTrimAndJoin';
import { VISIT_TYPES } from 'travel/models/visits/consts';

export default (
  visitsIds,
  visitsDict,
  countriesDict,
  originCountryId,
  fallback = 'Без названия',
) => {
  if (!visitsIds.length) {
    return fallback;
  }
  const visitsByCountries = Object.keys(
    groupBy(
      visitsIds.filter(
        visitId => visitsDict[visitId]?.visitType !== VISIT_TYPES.TRANSIT,
      ),
      'countryId',
    ),
  );
  if (visitsByCountries.length === 1) {
    return (
      uniqTrimAndJoin(
        visitsIds.map(visitId => visitsDict[visitId]?.locationName),
        { maxLength: 4 },
      ) || fallback
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
