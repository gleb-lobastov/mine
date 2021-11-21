import React, { useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
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
  formControl: {
    display: 'block',
    margin: '24px 12px',
    width: '100%',
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

  const handleChangeRating = useCallback(
    event => {
      const nextRating = event.target.value;
      if (nextRating && nextRating !== locationRating) {
        setRating(nextRating);
        onSubmitLocationRating(locationId, event.target.value);
      }
    },
    [locationId, locationRating],
  );

  return (
    <div className={classes.container}>
      {Boolean(rating) && (
        <Rating
          name="locationRating"
          readOnly={true}
          size="large"
          value={ratingToStars(rating)}
          precision={0.5}
        />
      )}
      {Boolean(!isEditable && rating) && (
        <Box ml={2}>{RATING_LOCALIZATION[rating]}</Box>
      )}
      {isEditable && (
        <FormControl className={classes.formControl}>
          <InputLabel shrink={true} id="select-location-rating-label">
            Задать рейтинг
          </InputLabel>
          <Select
            labelId="select-location-rating-label"
            id="select-location-rating"
            value={locationRating}
            onChange={handleChangeRating}
          >
            {Object.values(LOCATION_RATING).map(ratingOption => (
              <MenuItem key={ratingOption} value={ratingOption}>
                {RATING_LOCALIZATION[ratingOption]}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      )}
    </div>
  );
}

function ratingToStars(rating) {
  if (rating >= 7) {
    return 9 - Math.ceil(rating);
  }
  return 5 - (rating - 1) / 2;
}
