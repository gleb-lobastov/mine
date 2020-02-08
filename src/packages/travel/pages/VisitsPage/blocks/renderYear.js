import React from 'react';
import YearInfo from 'travel/components/common/YearInfo';
import { GROUP_VISITS_BY } from '../consts';

export default function renderYear({
  visit: { visitId },
  changes: { isYearChanged, isCountryChanged },
  groupBy,
  year,
}) {
  const isGroupedByCountriesYear = groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS;
  const shouldRender =
    isYearChanged || (isGroupedByCountriesYear && isCountryChanged);
  if (!shouldRender) {
    return null;
  }
  return (
    <YearInfo
      key={`y${year}_v${visitId}`}
      year={year}
      isSubgroup={isGroupedByCountriesYear}
    />
  );
}
