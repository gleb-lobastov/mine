import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { useSidebar } from 'core/context/SidebarContext';
import {
  GROUP_VISITS_BY,
  KEY_GROUP_VISITS_BY,
  SORT_VISITS_BY,
  KEY_SORT_VISITS_BY,
} from './consts';
import useVisitsPageStyles from './useVisitsPageStyles';

export default function(setQueryFilter, { groupBy, sortBy }) {
  const classes = useVisitsPageStyles();
  useSidebar(
    ({ closeSidebar }) => (
      <List>
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel shrink={true} id="select-groupBy-filter-label">
              Сгруппировать
            </InputLabel>
            <Select
              labelId="select-groupBy-filter-label"
              autoWidth={true}
              id="select-groupBy-filter"
              value={groupBy}
              onChange={event => {
                closeSidebar();
                setQueryFilter({
                  [KEY_GROUP_VISITS_BY]: event.target.value,
                });
              }}
            >
              <MenuItem value={GROUP_VISITS_BY.LOCATIONS}>По городам</MenuItem>
              <MenuItem value={GROUP_VISITS_BY.COUNTRIES}>По странам</MenuItem>
              <MenuItem value={GROUP_VISITS_BY.YEARS}>По годам</MenuItem>
              <MenuItem value={GROUP_VISITS_BY.YEARS_COUNTRIES}>
                По годам и странам
              </MenuItem>
              <MenuItem value={GROUP_VISITS_BY.COUNTRIES_YEARS}>
                По странам и годам
              </MenuItem>
              <MenuItem value={GROUP_VISITS_BY.TRIPS}>По поездкам</MenuItem>
              <MenuItem value={GROUP_VISITS_BY.TRIPS_COUNTRIES}>
                По поездкам и странам
              </MenuItem>
            </Select>
          </FormControl>
        </ListItem>
        {groupBy !== GROUP_VISITS_BY.TRIPS && (
          <ListItem>
            <FormControl className={classes.formControl}>
              <InputLabel shrink={true} id="select-sortBy-filter-label">
                Сортировать
              </InputLabel>
              <Select
                labelId="select-sortBy-filter-label"
                autoWidth={true}
                id="select-sortBy-filter"
                value={sortBy}
                onChange={event => {
                  closeSidebar();
                  setQueryFilter({
                    [KEY_SORT_VISITS_BY]: event.target.value,
                  });
                }}
              >
                <MenuItem value={SORT_VISITS_BY.ALPHABET}>По алфавиту</MenuItem>
                <MenuItem value={SORT_VISITS_BY.VISITS_ALPHABET}>
                  По числу посещений
                </MenuItem>
                <MenuItem value={SORT_VISITS_BY.RATING_ALPHABET}>
                  По рейтингу
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        )}
      </List>
    ),
    [groupBy, sortBy],
  );
}
