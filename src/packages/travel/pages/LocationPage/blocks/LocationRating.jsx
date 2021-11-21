import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Rating from '@material-ui/lab/Rating';
import { LOCATION_RATING } from 'travel/models/users/consts';

const RATING_LOCALIZATION = {
  [LOCATION_RATING.PLACE_TO_LIVE]: 'Готов тут жить',
  [LOCATION_RATING.FEW_PER_YEAR]: 'Готов бывать по нескольку раз в год',
  [LOCATION_RATING.ONCE_PER_YEAR]: 'Приезжал бы каждый год',
  [LOCATION_RATING.ONCE_PER_TWO_YEARS]: 'Приезжал бы раз в пару лет',
  [LOCATION_RATING.ONCE_PER_FIVE_YEARS]: 'Приезжал бы раз в пять лет',
  [LOCATION_RATING.ONCE_PER_DECADE]: 'Можно заглянуть раз в десятилетие',
  [LOCATION_RATING.TWICE_PER_LIVE]: 'Пары посещений за всю жизнь достаточно',
  [LOCATION_RATING.ONCE_PER_LIVE]: 'Одного посещения достаточно',
  [LOCATION_RATING.NEVER]: 'Лучше бы тут и не бывать',
};

const useStyles = makeStyles({
  container: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default function LocationRating({
  locationId,
  locationRating,
  isEditable,
  onSubmitLocationRating,
}) {
  const classes = useStyles();
  const [rating, setRating] = React.useState(locationRating);
  const [hoverRating, setHoverRating] = React.useState(locationRating);

  const handleChangeRating = useCallback(
    (event, nextStarsCount) => {
      const nextRating = starsToRating(nextStarsCount);
      if (nextRating && nextRating !== locationRating) {
        setRating(nextRating);
        onSubmitLocationRating(locationId, rating);
      }
    },
    [locationId, locationRating],
  );

  const handleHover = useCallback(
    (event, nextHoverStarsCount) =>
      setHoverRating(starsToRating(nextHoverStarsCount)),
    [locationId, locationRating],
  );

  const starsCount = ratingToStars(rating);
  const hintRating = hoverRating ?? rating;
  return (
    <div className={classes.container}>
      <Rating
        name="locationRating"
        readOnly={!isEditable}
        size="large"
        value={starsCount}
        precision={0.5}
        onChange={handleChangeRating}
        onChangeActive={handleHover}
      />
      {hintRating && <Box ml={2}>{RATING_LOCALIZATION[hintRating]}</Box>}
    </div>
  );
}

function starsToRating(starsCount) {
  if (starsCount === -1) {
    return null;
  }
  if (starsCount <= 2) {
    return 9 - Math.floor(starsCount);
  }
  return (5 - starsCount) * 2 + 1;
}

function ratingToStars(rating) {
  if (rating >= 7) {
    return 9 - Math.ceil(rating);
  }
  return (rating - 1) / 2;
}
