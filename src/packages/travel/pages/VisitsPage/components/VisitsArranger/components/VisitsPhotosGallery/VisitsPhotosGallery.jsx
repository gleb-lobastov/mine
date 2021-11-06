import React from 'react';
import PhotosGallery from 'modules/components/PhotosGallery';
import { findClosestGroupValue } from '../../arrangement/groupping/utils/resolveGroupingUtils';
import { PLAIN_GROUPS } from '../../arrangement/groupping/consts';

export default function VisitsPhotosGallery({
  className,
  visitsGroup,
  provision,
}) {
  const visitPhotos = visitsGroup.visitsList.flatMap(visit =>
    visit.photos.map(photo => ({
      ...photo,
      description: renderDescription(visit, visitsGroup, provision),
    })),
  );

  return <PhotosGallery className={className} photos={visitPhotos} />;
}

function renderDescription(visit, visitsGroup, { countriesDict }) {
  const { locationName, countryId, arrivalYear } = visit;

  let result = '';

  const hasLocationGroup = Boolean(
    findClosestGroupValue(visitsGroup, PLAIN_GROUPS.LOCATIONS),
  );
  const hasCountryGroup =
    hasLocationGroup ||
    Boolean(findClosestGroupValue(visitsGroup, PLAIN_GROUPS.COUNTRIES));
  const hasYearGroup = Boolean(
    findClosestGroupValue(visitsGroup, PLAIN_GROUPS.YEARS),
  );

  if (!hasLocationGroup) {
    result += locationName;
  }
  if (!hasCountryGroup) {
    const { countryName } = countriesDict[countryId] ?? {};
    if (countryName) {
      result += `, ${countryName}`;
    }
  }
  if (!hasYearGroup) {
    result += `/${arrivalYear}`;
  }

  return result;
}
