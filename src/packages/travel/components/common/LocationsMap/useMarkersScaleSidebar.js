import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useSidebar } from 'core/context/SidebarContext';
import {
  MARKERS_SCALES,
  KEY_MARKERS_SCALE_BY,
  MARKERS_SCALE_DEFAULT,
} from './consts';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
});

export default function(setQueryFilter, queryFilter) {
  const classes = useStyles();
  const { [KEY_MARKERS_SCALE_BY]: scaleByQuery } = queryFilter || {};
  const scaleBy = resolveActualScaleBy(scaleByQuery);

  useSidebar(
    ({ closeSidebar }) => (
      <List>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel shrink={true} id="select-groupBy-filter-label">
              Раскрасить маркеры
            </InputLabel>
            <Select
              labelId="select-groupBy-filter-label"
              autoWidth={true}
              id="select-groupBy-filter"
              value={scaleBy}
              onChange={event => {
                closeSidebar();
                setQueryFilter({
                  [KEY_MARKERS_SCALE_BY]: event.target.value,
                });
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
    ),
    [scaleBy],
  );

  return { scaleBy };
}

function resolveActualScaleBy(scaleByQuery) {
  return Object.values(MARKERS_SCALES).includes(scaleByQuery)
    ? scaleByQuery
    : MARKERS_SCALE_DEFAULT;
}
