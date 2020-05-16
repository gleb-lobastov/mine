import React from 'react';
import Markdown from 'modules/components/Markdown';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { usePaths } from 'modules/packages';
import { plural } from 'modules/utilities/l10n';
import { useTripsStats } from 'travel/dataSource';
import LocationsMap from 'travel/components/common/LocationsMap';
import { LOCATION_CLASSES_ID } from 'travel/models/locations/consts';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    flexDirection: 'column',
    height: ' 100%',
  },
  mapContainer: {
    flexGrow: 1,
  },
});

export default function TravelDashboard() {
  const classes = useStyles();
  const {
    travel: { visits: visitsPaths },
  } = usePaths();

  const { countriesIds, locationsIds, locationsDict, isReady } = useTripsStats({
    userAlias: 'my',
  });

  const countriesCounter = resolvePlural(isReady ? countriesIds.length : null, {
    one: 'стране',
    many: 'странах',
  });
  const locationsCounter = resolvePlural(
    isReady ? calcCitiesCount(locationsIds, locationsDict) : null,
    {
      one: 'городе',
      many: 'городах',
    },
  );

  return (
    <div className={classes.content}>
      <Markdown
        source={`
Статистика по моим путешествиям.

Здесь будет красивая инфографика, рассказы и фотки про 250 стран и
территорий. Пока я побывал только в
[${countriesCounter}](${visitsPaths.toUrl()}) и 
[${locationsCounter}](${visitsPaths.toUrl()}),
а раз так, то и на инфографику пока забил.
  `}
      />
      <LocationsMap
        className={classes.mapContainer}
        locationsDict={locationsDict}
        locationsIds={locationsIds}
        minHeight={300}
      />
      <div>
        <Button
          component="a"
          target="_blank"
          rel="nofollow noreferrer noopener"
          href="https://lobastov.livejournal.com/tag/%D0%9F%D1%83%D1%82%D0%B5%D1%88%D0%B5%D1%81%D1%82%D0%B2%D0%B8%D0%B5"
        >
          Про путешествия в ЖЖ
        </Button>
      </div>
      <a
        href="https://my.flightradar24.com/lobastov"
        target="_blank"
        rel="nofollow noreferrer noopener"
      >
        <img
          src="https://banners-my.flightradar24.com/lobastov.png"
          alt="My Flightdiary.net profile"
        />
      </a>
    </div>
  );
}

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
