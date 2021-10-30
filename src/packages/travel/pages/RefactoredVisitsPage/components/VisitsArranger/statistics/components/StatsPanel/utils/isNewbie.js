import { PLAIN_GROUPS } from '../../../../arrangement/groupping/consts';
import { findClosestGroupValue } from 'travel/pages/RefactoredVisitsPage/components/VisitsArranger/arrangement/groupping/utils/resolveGroupingUtils';

export default function isNewbie(visitsGroup) {
  const {
    plainGroup,
    field: { value: entityId },
  } = visitsGroup;

  switch (plainGroup) {
    case PLAIN_GROUPS.COUNTRIES:
      return isNewbieCountry(visitsGroup, entityId);
    case PLAIN_GROUPS.LOCATIONS:
      return isNewbieLocation(visitsGroup, entityId);
    default:
      return false;
  }
}

function isNewbieCountry(visitsGroup, countryId) {
  return findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.YEARS,
  )?.stats?.countriesStats?.newbies?.has(countryId);
}

function isNewbieLocation(visitsGroup, locationId) {
  const yearVisitsGroup = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.YEARS,
  );
  const countriesVisitsGroup = findClosestGroupValue(
    visitsGroup,
    PLAIN_GROUPS.COUNTRIES,
  );

  const countryLocationStats = countriesVisitsGroup?.stats?.locationsStats;
  const allLocationsIsNew =
    !countryLocationStats ||
    !countryLocationStats.newAtYear ||
    !countryLocationStats.totalAtYear ||
    countryLocationStats.newAtYear === countryLocationStats.totalAtYear;

  return (
    !allLocationsIsNew &&
    yearVisitsGroup?.stats?.locationsStats?.newbies?.has(locationId)
  );
}
