import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useQueryFilter } from 'core/context/QueryFilterContext';
import { useTripsStats } from 'travel/dataSource';
import LocationsMap, {
  useMarkersScaleSidebar,
  MARKERS_SCALES,
} from 'travel/components/LocationsMap';
import Description from './blocks/Description';
import ExternalLinks from './blocks/ExternalLinks';

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

  const { queryFilter, setQueryFilter } = useQueryFilter();
  const { scaleBy, ratingLevel } = useMarkersScaleSidebar(
    setQueryFilter,
    queryFilter,
  );

  const {
    countriesIds,
    isReady,
    locationsDict,
    locationsIds,
    locationsRating,
    visitsDict,
  } = useTripsStats({
    userAlias: 'my',
  });

  if (!isReady) {
    return '...Loading';
  }

  return (
    <div className={classes.content}>
      <Description
        countriesIds={countriesIds}
        isReady={isReady}
        locationsDict={locationsDict}
        locationsIds={locationsIds}
      />
      <LocationsMap
        className={classes.mapContainer}
        locationsDict={locationsDict}
        visitsDict={visitsDict}
        locationsRating={locationsRating}
        locationsIds={locationsIds}
        minHeight={300}
        scaleBy={scaleBy}
        ratingLevel={
          scaleBy === MARKERS_SCALES.BY_RATING ? ratingLevel : undefined
        }
      />
      <ExternalLinks />
    </div>
  );
}
