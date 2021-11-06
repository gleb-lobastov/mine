import React from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { MARKERS_RATING_LEVELS, KEY_MARKERS_RATING_LEVEL } from '../../consts';

export default function MarkersRatingLevelSelect({
  classes,
  ratingLevel,
  onClose,
  onChange,
}) {
  return (
    <List>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel shrink={true} id="select-ratingLevel-filter-label">
            Фильтр по рейтингу
          </InputLabel>
          <Select
            labelId="select-ratingLevel-filter-label"
            autoWidth={true}
            id="select-ratingLevel-filter"
            value={ratingLevel}
            onChange={event => {
              onClose();
              onChange({
                [KEY_MARKERS_RATING_LEVEL]: event.target.value,
              });
            }}
          >
            <MenuItem
              key={MARKERS_RATING_LEVELS.ALL}
              value={MARKERS_RATING_LEVELS.ALL}
            >
              Все
            </MenuItem>
            <MenuItem
              key={MARKERS_RATING_LEVELS.WANT_COME_BACK}
              value={MARKERS_RATING_LEVELS.WANT_COME_BACK}
            >
              Куда бы вернулся
            </MenuItem>
            <MenuItem
              key={MARKERS_RATING_LEVELS.LOVE_THIS_PLACE}
              value={MARKERS_RATING_LEVELS.LOVE_THIS_PLACE}
            >
              Лучшие места
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}

MarkersRatingLevelSelect.propTypes = {
  classes: PropTypes.shape({ formControl: PropTypes.string.isRequired })
    .isRequired,
  ratingLevel: PropTypes.oneOf(Object.values(MARKERS_RATING_LEVELS)).isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
};
