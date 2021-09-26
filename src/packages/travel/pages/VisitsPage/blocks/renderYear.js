import React from 'react';
import YearInfo from 'travel/components/common/YearInfo';
import { GROUP_VISITS_BY } from '../consts';

export default function renderYear({
  changes: { isYearChanged, isCountryChanged },
  groupBy,
  year,
  className,
}) {
  const isGroupedByCountriesYear = groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS;
  const shouldRender =
    isYearChanged || (isGroupedByCountriesYear && isCountryChanged);
  if (!shouldRender) {
    return null;
  }
  return (
    <YearInfo
      className={className}
      year={year}
      isSubgroup={isGroupedByCountriesYear}
    />
  );
}
