import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {
  MARKERS_SCALES,
  KEY_MARKERS_SCALE_BY,
  KEY_MARKERS_RATING_LEVEL,
} from '../../consts';

export default function MarkersScaleSelect({
  classes,
  scaleBy,
  onClose,
  onChange,
}) {
  return (
    <List>
      <ListItem>
        <FormControl className={classes.formControl}>
          <InputLabel shrink={true} id="select-scaleBy-filter-label">
            Раскрасить маркеры
          </InputLabel>
          <Select
            labelId="select-scaleBy-filter-label"
            autoWidth={true}
            id="select-scaleBy-filter"
            value={scaleBy}
            onChange={event => {
              onClose();
              const nextScaleBy = event.target.value;
              const updates = { [KEY_MARKERS_SCALE_BY]: nextScaleBy };
              if (nextScaleBy !== MARKERS_SCALES.BY_RATING) {
                updates[KEY_MARKERS_RATING_LEVEL] = undefined;
              }
              onChange(updates);
            }}
          >
            <MenuItem
              key={MARKERS_SCALES.BY_FIRST_VISIT}
              value={MARKERS_SCALES.BY_FIRST_VISIT}
            >
              По первому посещению
            </MenuItem>
            <MenuItem
              key={MARKERS_SCALES.BY_LAST_VISIT}
              value={MARKERS_SCALES.BY_LAST_VISIT}
            >
              По последнему посещению
            </MenuItem>
            <MenuItem
              key={MARKERS_SCALES.BY_VISITS_COUNT}
              value={MARKERS_SCALES.BY_VISITS_COUNT}
            >
              По числу посещений
            </MenuItem>
            <MenuItem
              key={MARKERS_SCALES.BY_RATING}
              value={MARKERS_SCALES.BY_RATING}
            >
              По рейтингу
            </MenuItem>
          </Select>
        </FormControl>
      </ListItem>
    </List>
  );
}
