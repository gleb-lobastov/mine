import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  photosContainer: { display: 'flex', justifyContent: 'space-between' },
  photoContainer: {
    margin: '4px 12px 12px',
    minWidth: '150px',
    maxHeight: '100px',
    textAlign: 'center',
  },
  photo: {
    maxWidth: '150px',
    borderRadius: '4px',
  },
});

export default function LocationPhotos({
  visitId,
  tripId,
  location,
  visitsDict,
  year,
}) {
  const classes = useStyles();
  const { visitsIds } = location;
  const actualVisits = visitsIds
    .map(visitsId => visitsDict[visitsId])
    .filter(visit => {
      if (!visit) {
        return false;
      }
      const { tripId: tripIdToCompare, visitId: visitIdToCompare } = visit;
      if (visitId && visitId !== visitIdToCompare) {
        return false;
      }
      if (tripId && tripId !== tripIdToCompare) {
        return false;
      }
      if (!year) {
        return true;
      }
      const { arrivalDateTime, departureDateTime } = visit;
      return (
        arrivalDateTime.getFullYear() <= year &&
        departureDateTime.getFullYear() >= year
      );
    });

  const thumbnailsUrls = actualVisits
    .flatMap(({ photos }) => photos.map(({ thumbnailUrl }) => thumbnailUrl))
    .slice(0, 3);

  if (!thumbnailsUrls.length) {
    return null;
  }

  return (
    <div className={classes.photosContainer}>
      {thumbnailsUrls.map(thumbnailUrl => (
        <div key={thumbnailUrl} className={classes.photoContainer}>
          <img className={classes.photo} src={thumbnailUrl} />
        </div>
      ))}
    </div>
  );
}
