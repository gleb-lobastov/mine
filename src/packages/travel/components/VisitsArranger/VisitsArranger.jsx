import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { switchFilteringFn } from './arrangement/filtering';
import renderGroupsRecursive from './renderGroupsRecursive';

const useStyles = makeStyles(theme => ({
  noMarginTop: {},
  link: {
    cursor: 'pointer',
  },
  header0: {
    ...theme.typography.h2,
    wordBreak: 'break-word',
  },
  container0: {
    display: 'flex',
    alignItems: 'self-start',
    '&:not($noMarginTop)': {
      marginTop: '64px',
    },
  },
  level0: {},

  header1: {
    ...theme.typography.h4,
    wordBreak: 'break-word',
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
    wordBreak: 'break-word',
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
  adaptHeadersSize,
  mapSectionLevel,
  photosSectionLevel,
  children,
  virtualize,
  ...forwardingProps
}) {
  const classes = useStyles();

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
    adaptHeadersSize,
    mapSectionLevel,
    photosSectionLevel,
    virtualize,
    forwardingProps,
  });
}

VisitsArranger.defaultProps = {
  mapSectionLevel: 0,
  photosSectionLevel: 0,
};
