import React from 'react';
import PropTypes from 'prop-types';
import Markdown from 'modules/components/Markdown';
import { usePaths } from 'modules/packages';
import { plural } from 'modules/utilities/l10n';
import { LOCATION_CLASSES_ID } from 'travel/models/locations/consts';
import locationPropTypes from 'travel/models/locations/propTypes';

export default function Description({
  countriesIds,
  locationsDict,
  locationsIds,
}) {
  const {
    travel: { visits: visitsPaths },
  } = usePaths();

  const countriesCounter = resolvePlural(countriesIds.length, {
    one: 'стране',
    many: 'странах',
  });
  const locationsCounter = resolvePlural(
    calcCitiesCount(locationsIds, locationsDict),
    {
      one: 'городе',
      many: 'городах',
    },
  );

  return (
    <Markdown>
      {`
Статистика по моим путешествиям.

Здесь будет красивая инфографика, рассказы и фотки про 250 стран и
территорий. Пока я побывал только в
[${countriesCounter}](${visitsPaths.toUrl()}) и 
[${locationsCounter}](${visitsPaths.toUrl()}),
а раз так, то и на инфографику пока забил.
  `}
    </Markdown>
  );
}

Description.propTypes = {
  countriesIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  locationsIds: PropTypes.arrayOf(PropTypes.number).isRequired,
};

function calcCitiesCount(locationsIds, locationsDict = {}) {
  return locationsIds.filter(
    locationsId =>
      locationsDict[locationsId]?.locationClass === LOCATION_CLASSES_ID.CITY,
  ).length;
}

function resolvePlural(counter, pluralOptions) {
  if (counter == null) {
    return `... ${pluralOptions.many}`;
  }
  return `${counter} ${plural(counter, pluralOptions)}`;
}
