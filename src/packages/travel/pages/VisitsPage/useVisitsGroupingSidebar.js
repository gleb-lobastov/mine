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
  GROUP_VISITS_BY_DEFAULTS,
  VISITS_SECTION_DEFAULT,
  VISITS_SECTIONS,
  VISITS_SECTIONS_GROUPS,
  SORT_VISITS_BY,
  KEY_SORT_VISITS_BY,
  SORT_VISITS_BY_DEFAULT,
} from './consts';
import useVisitsPageStyles from './useVisitsPageStyles';

export default function(setQueryFilter, queryFilter, section) {
  const classes = useVisitsPageStyles();
  const {
    [KEY_GROUP_VISITS_BY]: groupByQuery,
    [KEY_SORT_VISITS_BY]: sortByQuery,
  } = queryFilter || {};
  const sortBy = resolveActualSortBy(sortByQuery);
  const [groupBy, visitsSectionGroups] = resolveActualGroupBy(
    groupByQuery,
    section,
  );

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
              {visitsSectionGroups.map(visitsSectionGroup => (
                <MenuItem
                  key={visitsSectionGroup.key}
                  value={visitsSectionGroup.key}
                >
                  {visitsSectionGroup.l10n}
                </MenuItem>
              ))}
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

  return { groupBy, sortBy };
}

function resolveActualSortBy(sortByQuery) {
  return Object.values(SORT_VISITS_BY).includes(sortByQuery)
    ? sortByQuery
    : SORT_VISITS_BY_DEFAULT;
}
function resolveActualGroupBy(groupByQuery, section) {
  const actualSection = Object.values(VISITS_SECTIONS).includes(section)
    ? section
    : VISITS_SECTION_DEFAULT;
  const visitsSectionGroups = VISITS_SECTIONS_GROUPS[actualSection] || [];
  const groupBy = visitsSectionGroups.find(({ key }) => key === groupByQuery)
    ? groupByQuery
    : GROUP_VISITS_BY_DEFAULTS[actualSection];
  return [groupBy, visitsSectionGroups];
}
