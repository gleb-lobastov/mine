import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useSidebar } from 'core/context/SidebarContext';
import { GROUP_VISITS_BY, KEY_GROUP_VISITS_BY } from './consts';

export default function(setQueryFilter, groupBy) {
  useSidebar(
    ({ closeSidebar }) => (
      <List>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.LOCATIONS}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.LOCATIONS,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.LOCATIONS}
        >
          <ListItemText primary="По городам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.COUNTRIES}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.COUNTRIES,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.COUNTRIES}
        >
          <ListItemText primary="По странам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.YEARS}
          onClick={() => {
            closeSidebar();
            setQueryFilter({ [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.YEARS });
          }}
          selected={groupBy === GROUP_VISITS_BY.YEARS}
        >
          <ListItemText primary="По годам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.YEARS_COUNTRIES}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.YEARS_COUNTRIES,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.YEARS_COUNTRIES}
        >
          <ListItemText primary="По годам и странам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.COUNTRIES_YEARS}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.COUNTRIES_YEARS,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.COUNTRIES_YEARS}
        >
          <ListItemText primary="По странам и годам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.TRIPS}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.TRIPS,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.TRIPS}
        >
          <ListItemText primary="По поездкам" />
        </ListItem>
        <ListItem
          button={true}
          key={GROUP_VISITS_BY.TRIPS_COUNTRIES}
          onClick={() => {
            closeSidebar();
            setQueryFilter({
              [KEY_GROUP_VISITS_BY]: GROUP_VISITS_BY.TRIPS_COUNTRIES,
            });
          }}
          selected={groupBy === GROUP_VISITS_BY.TRIPS_COUNTRIES}
        >
          <ListItemText primary="По поездкам и странам" />
        </ListItem>
      </List>
    ),
    [groupBy],
  );
}
