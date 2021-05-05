import React from 'react';
import YearInfo from 'travel/components/common/YearInfo';
import { GROUP_VISITS_BY } from '../consts';
import PhotosPreviewTooltip from 'modules/components/PhotosPreviewTooltip';
import { resolvePhotos } from 'travel/pages/VisitsPage/resolvePhotos';

export default function renderYear({
  provision,
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
    <PhotosPreviewTooltip
      key={`y${year}_v${visitId}`}
      caption={String(year)}
      previewUrls={resolvePhotos({ year }, provision)}
    >
      {({ previewTriggerProps, previewTriggerClassName }) => (
        <YearInfo
          previewTriggerProps={previewTriggerProps}
          previewTriggerClassName={previewTriggerClassName}
          year={year}
          isSubgroup={isGroupedByCountriesYear}
        />
      )}
    </PhotosPreviewTooltip>
  );
}
