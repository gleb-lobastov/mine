import React, { useState, useCallback, useEffect } from 'react';
import { useDeepCompareEffect } from 'react-use';
import { makeStyles } from '@material-ui/core/styles';
import { switchFilteringFn } from './arrangement/filtering';
import renderGroupsRecursive from './renderGroupsRecursive';

const useStyles = makeStyles(theme => ({
  link: {
    cursor: 'pointer',
  },
  header0: {
    ...theme.typography.h2,
  },
  container0: {
    display: 'flex',
    alignItems: 'self-start',
    '&:not(:first-child)': {
      marginTop: '64px',
    },
  },
  level0: {},

  header1: {
    ...theme.typography.h4,
  },
  container1: {
    display: 'flex',
    alignItems: 'self-start',
    marginTop: '18px',
    marginBottom: '6px',
  },
  level1: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '32px',
    },
  },

  header2: {
    ...theme.typography.body1,
  },
  container2: {
    display: 'flex',
    alignItems: 'center',
  },
  level2: {
    [theme.breakpoints.up('sm')]: {
      paddingLeft: '96px',
    },
  },
}));

export default function VisitsArranger({
  visitsList,
  groupsOrder,
  sortingOrder,
  filteringOption,
  provision,
  urls,
  config,
  mapSectionLevel,
  photosSectionLevel,
  children,
  ...forwardingProps
}) {
  const classes = useStyles();

  const [expandedGroups, setExpandedGroups] = useState({});
  const toggleExpandedGroups = useCallback(fieldSignature => {
    setExpandedGroups(prevExpandedGroups => ({
      ...prevExpandedGroups,
      [fieldSignature]: !prevExpandedGroups[fieldSignature],
    }));
  }, []);
  useDeepCompareEffect(
    () => {
      setExpandedGroups({});
    },
    [groupsOrder, sortingOrder, filteringOption],
  );

  const actualVisitsList = visitsList.filter(
    switchFilteringFn(provision, filteringOption),
  );

  return renderGroupsRecursive({
    classes,
    children,
    provision,
    urls,
    config,
    visitsList: actualVisitsList,
    groupsOrder,
    sortingOrder,
    mapSectionLevel,
    photosSectionLevel,
    expandedGroups,
    toggleExpandedGroups,
    forwardingProps,
  });
}

VisitsArranger.defaultProps = {
  mapSectionLevel: 1,
  photosSectionLevel: 1,
};
