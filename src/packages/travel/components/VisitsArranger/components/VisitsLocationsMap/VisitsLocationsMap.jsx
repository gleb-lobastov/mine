import React, { useState } from 'react';
import uniq from 'lodash/uniq';
import MUILink from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import LocationsMap, { MARKERS_SCALES } from 'travel/components/LocationsMap';

const useStyles = makeStyles({
  container: { fontSize: '16px', lineHeight: '1.5' },
  visitContainer: { margin: '20px 0' },
  mapVisibilityToggle: { marginLeft: '8px', cursor: 'pointer' },
  googleMapContainer: {
    margin: '12px 0',
    width: '800px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
  },
});

export default function VisitsLocationsMap({
  className,
  visitsGroup,
  provision: { visitsDict, locationsDict, locationsRating },
  onToggle,
}) {
  const classes = useStyles();
  const [mapVisible, setMapVisible] = useState(false);

  const locationsIds = uniq(
    visitsGroup.visitsList.map(({ locationId }) => locationId),
  );

  return (
    <div className={className}>
      <div>
        <MUILink
          variant="body2"
          onClick={() => {
            setMapVisible(prevMapVisible => !prevMapVisible);
            onToggle();
          }}
        >
          {mapVisible ? 'скрыть карту' : 'на карте'}
        </MUILink>
      </div>
      {mapVisible && (
        <LocationsMap
          className={classes.mapContainer}
          locationsDict={locationsDict}
          visitsDict={visitsDict}
          locationsRating={locationsRating}
          locationsIds={locationsIds}
          minHeight={300}
          scaleBy={MARKERS_SCALES.BY_LAST_VISIT}
          ratingLevel={null}
        />
      )}
    </div>
  );
}
