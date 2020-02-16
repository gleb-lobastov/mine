import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

const RATING = {
  PLACE_TO_LIVE: 1,
  FEW_PER_YEAR: 2,
  ONCE_PER_YEAR: 3,
  ONCE_PER_TWO_YEARS: 4,
  ONCE_PER_FIVE_YEARS: 5,
  ONCE_PER_DECADE: 6,
  TWICE_PER_LIVE: 7,
  ONCE_PER_LIVE: 8,
  NEVER: 9,
};

const RATING_LOCALIZATION = {
  [RATING.PLACE_TO_LIVE]: 'Жил бы здесь',
  [RATING.FEW_PER_YEAR]: 'Несколько раз в год',
  [RATING.ONCE_PER_YEAR]: 'Раз в год',
  [RATING.ONCE_PER_TWO_YEARS]: 'Раз в пару лет',
  [RATING.ONCE_PER_FIVE_YEARS]: 'Раз в пять лет',
  [RATING.ONCE_PER_DECADE]: 'Раз в десятилетие',
  [RATING.TWICE_PER_LIVE]: 'Пару раз в жизни',
  [RATING.ONCE_PER_LIVE]: 'Раз в жизни',
  [RATING.NEVER]: 'Никогда',
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
        <MenuItem value={RATING.PLACE_TO_LIVE}>
          {RATING_LOCALIZATION[RATING.PLACE_TO_LIVE]}
        </MenuItem>
        <MenuItem value={RATING.FEW_PER_YEAR}>
          {RATING_LOCALIZATION[RATING.FEW_PER_YEAR]}
        </MenuItem>
        <MenuItem value={RATING.ONCE_PER_YEAR}>
          {RATING_LOCALIZATION[RATING.ONCE_PER_YEAR]}
        </MenuItem>
        <MenuItem value={RATING.ONCE_PER_TWO_YEARS}>
          {RATING_LOCALIZATION[RATING.ONCE_PER_TWO_YEARS]}
        </MenuItem>
        <MenuItem value={RATING.ONCE_PER_FIVE_YEARS}>
          {RATING_LOCALIZATION[RATING.ONCE_PER_FIVE_YEARS]}
        </MenuItem>
        <MenuItem value={RATING.ONCE_PER_DECADE}>
          {RATING_LOCALIZATION[RATING.ONCE_PER_DECADE]}
        </MenuItem>
        <MenuItem value={RATING.TWICE_PER_LIVE}>
          {RATING_LOCALIZATION[RATING.TWICE_PER_LIVE]}
        </MenuItem>
        <MenuItem value={RATING.ONCE_PER_LIVE}>
          {RATING_LOCALIZATION[RATING.ONCE_PER_LIVE]}
        </MenuItem>
        <MenuItem value={RATING.NEVER}>
          {RATING_LOCALIZATION[RATING.NEVER]}
        </MenuItem>
      </Select>
    </FormControl>
  );
}

LocationRating.propTypes = {
  locationRating: PropTypes.number,
  locationId: PropTypes.number.isRequired,
  isEditable: PropTypes.bool.isRequired,
  onSubmitLocationRating: PropTypes.func.isRequired,
};

LocationRating.defaultProps = { locationRating: null };
