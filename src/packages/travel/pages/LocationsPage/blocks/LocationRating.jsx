import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { LOCATION_RATING } from 'travel/models/users/consts';

const RATING_LOCALIZATION = {
  [LOCATION_RATING.PLACE_TO_LIVE]: 'Жил бы здесь',
  [LOCATION_RATING.FEW_PER_YEAR]: 'Несколько раз в год',
  [LOCATION_RATING.ONCE_PER_YEAR]: 'Раз в год',
  [LOCATION_RATING.ONCE_PER_TWO_YEARS]: 'Раз в пару лет',
  [LOCATION_RATING.ONCE_PER_FIVE_YEARS]: 'Раз в пять лет',
  [LOCATION_RATING.ONCE_PER_DECADE]: 'Раз в десятилетие',
  [LOCATION_RATING.TWICE_PER_LIVE]: 'Пару раз в жизни',
  [LOCATION_RATING.ONCE_PER_LIVE]: 'Раз в жизни',
  [LOCATION_RATING.NEVER]: 'Никогда',
};

const useStyles = makeStyles({
  formControl: {
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
  if (!isEditable) {
    return <div>{RATING_LOCALIZATION[locationRating]}</div>;
  }
  return (
    <FormControl className={classes.formControl}>
      <InputLabel shrink={true} id="select-location-rating-label">
        Я бы ездил сюда
      </InputLabel>
      <Select
        labelId="select-location-rating-label"
        id="select-location-rating"
        value={locationRating}
        onChange={event => {
          onSubmitLocationRating(event, locationId, event.target.value);
        }}
      >
        <MenuItem value={LOCATION_RATING.PLACE_TO_LIVE}>
          {RATING_LOCALIZATION[LOCATION_RATING.PLACE_TO_LIVE]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.FEW_PER_YEAR}>
          {RATING_LOCALIZATION[LOCATION_RATING.FEW_PER_YEAR]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.ONCE_PER_YEAR}>
          {RATING_LOCALIZATION[LOCATION_RATING.ONCE_PER_YEAR]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.ONCE_PER_TWO_YEARS}>
          {RATING_LOCALIZATION[LOCATION_RATING.ONCE_PER_TWO_YEARS]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.ONCE_PER_FIVE_YEARS}>
          {RATING_LOCALIZATION[LOCATION_RATING.ONCE_PER_FIVE_YEARS]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.ONCE_PER_DECADE}>
          {RATING_LOCALIZATION[LOCATION_RATING.ONCE_PER_DECADE]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.TWICE_PER_LIVE}>
          {RATING_LOCALIZATION[LOCATION_RATING.TWICE_PER_LIVE]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.ONCE_PER_LIVE}>
          {RATING_LOCALIZATION[LOCATION_RATING.ONCE_PER_LIVE]}
        </MenuItem>
        <MenuItem value={LOCATION_RATING.NEVER}>
          {RATING_LOCALIZATION[LOCATION_RATING.NEVER]}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

LocationRating.defaultProps = { locationRating: null };
