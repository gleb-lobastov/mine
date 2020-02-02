import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSidebar } from 'core/context/SidebarContext';

export const KEY_GROUP_VISITS_BY = 'group';
export const GROUP_VISITS_BY = {
  LOCATIONS: 'loc',
  COUNTRIES: 'c',
  YEARS: 'yr',
  YEARS_COUNTRIES: 'yr_c',
  COUNTRIES_YEARS: 'c_yr',
};

export default function(setQueryFilter, groupBy) {
  useSidebar(
    () => (
      <List>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.LOCATIONS}
          onClick={() =>
            setQueryFilter({ [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.LOCATIONS })
          }
          selected={groupBy === GROUP_VISITS_BY.LOCATIONS}
        >
          <ListItemText primary="По городам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.COUNTRIES}
          onClick={() =>
            setQueryFilter({ [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.COUNTRIES })
          }
          selected={groupBy === GROUP_VISITS_BY.COUNTRIES}
        >
          <ListItemText primary="По странам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.YEARS}
          onClick={() =>
            setQueryFilter({ [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.YEARS })
          }
          selected={groupBy === GROUP_VISITS_BY.YEARS}
        >
          <ListItemText primary="По годам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.YEARS_COUNTRIES}
          onClick={() =>
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.YEARS_COUNTRIES,
            })
          }
          selected={groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES}
        >
          <ListItemText primary="По годам и странам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.COUNTRIES_YEARS}
          onClick={() =>
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.COUNTRIES_YEARS,
            })
          }
          selected={groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS}
        >
          <ListItemText primary="По странам и годам" />
        </ListItem>
      </List>
    ),
    [groupBy],
  );
}
