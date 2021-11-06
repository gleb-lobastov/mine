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
  VISITS_SECTION_DEFAULT,
  VISITS_SECTIONS,
  VISITS_SECTIONS_GROUPS,
  GROUP_VISITS_BY_DEFAULTS,
} from './consts';
import {
  FILTER_VISITS_BY,
  KEY_FILTER_VISITS_BY,
  FILTER_VISITS_BY_DEFAULT,
} from './components/VisitsArranger/arrangement/filtering/consts';
import {
  SORT_VISITS_BY,
  KEY_SORT_VISITS_BY,
  SORT_VISITS_BY_DEFAULT,
} from './components/VisitsArranger/arrangement/sorting/consts';
import {
  GROUP_VISITS_BY,
  KEY_GROUP_VISITS_BY,
} from './components/VisitsArranger/arrangement/groupping/consts';

const useStyles = makeStyles({
  formControl: {
    width: '100%',
  },
});

export default function(setQueryFilter, queryFilter, section) {
  const classes = useStyles();

  const {
    [KEY_GROUP_VISITS_BY]: groupByQuery,
    [KEY_SORT_VISITS_BY]: sortByQuery,
    [KEY_FILTER_VISITS_BY]: filterByQuery,
  } = queryFilter || {};

  const sortBy = resolveActualSortBy(sortByQuery);
  const filterBy = resolveActualFilterBy(filterByQuery);
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
                <MenuItem value={SORT_VISITS_BY.FIRST_VISIT_ALPHABET}>
                  По первому посещению
                </MenuItem>
                <MenuItem value={SORT_VISITS_BY.LAST_VISIT_ALPHABET}>
                  По последнему посещению
                </MenuItem>
                <MenuItem value={SORT_VISITS_BY.RATING_ALPHABET}>
                  По рейтингу
                </MenuItem>
              </Select>
            </FormControl>
          </ListItem>
        )}
        <ListItem>
          <FormControl className={classes.formControl}>
            <InputLabel shrink={true} id="select-filterBy-filter-label">
              Фильтровать
            </InputLabel>
            <Select
              labelId="select-filterBy-filter-label"
              autoWidth={true}
              id="select-filterBy-filter"
              value={filterBy}
              onChange={event => {
                closeSidebar();
                setQueryFilter({
                  [KEY_FILTER_VISITS_BY]: event.target.value,
                });
              }}
            >
              <MenuItem value={FILTER_VISITS_BY.ANY}>Показать все</MenuItem>
              <MenuItem value={FILTER_VISITS_BY.FOREIGN}>
                Только зарубежные
              </MenuItem>
              <MenuItem value={FILTER_VISITS_BY.DOMESTIC}>
                Только местные
              </MenuItem>
            </Select>
          </FormControl>
        </ListItem>
      </List>
    ),
    [groupBy, sortBy, filterBy],
  );

  return { groupBy, sortBy, filterBy };
}

function resolveActualSortBy(sortByQuery) {
  return Object.values(SORT_VISITS_BY).includes(sortByQuery)
    ? sortByQuery
    : SORT_VISITS_BY_DEFAULT;
}

function resolveActualFilterBy(filterByQuery) {
  return Object.values(FILTER_VISITS_BY).includes(filterByQuery)
    ? filterByQuery
    : FILTER_VISITS_BY_DEFAULT;
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
