import React from 'react';
import groupByFn from 'lodash/groupBy';
import { makeStyles } from '@material-ui/core/styles';
import { PLAIN_GROUPS, PLAIN_GROUPS_MAPPING } from '../../consts';
import CountryVisitsGroup from './components/CountryVisitsGroup';
import LocationVisitsGroup from './components/LocationVisitsGroup';
import YearVisitsGroup from './components/YearVisitsGroup';
import TripVisitsGroup from './components/TripVisitsGroup';
import VisitsItselfGroup from './components/VisitsItselfGroup';
import {
  resolveGroupingCountry,
  resolveGroupingLocation,
  resolveGroupingYear,
} from './utils';
import createCalcByYearUtils from '../StatsPanel/utils/createCalcByYearUtils';

const HEADING_VARIANTS = ['h2', 'h4', 'body1'];
const HEADING_CLASSNAMES = ['level0', 'level1', 'level2'];
const PLAIN_GROUPS_CONFIG = {
  [PLAIN_GROUPS.TRIPS]: {
    groupingFieldName: 'tripId',
    component: TripVisitsGroup,
  },
  [PLAIN_GROUPS.YEARS]: {
    groupingFieldName: ({ arrivalDateTime }) => arrivalDateTime.getFullYear(),
    component: YearVisitsGroup,
  },
  [PLAIN_GROUPS.COUNTRIES]: {
    groupingFieldName: 'countryId',
    component: CountryVisitsGroup,
  },
  [PLAIN_GROUPS.LOCATIONS]: {
    groupingFieldName: 'locationId',
    component: LocationVisitsGroup,
  },
  [PLAIN_GROUPS.JUST_VISITS]: {
    groupingFieldName: 'visitId',
    component: VisitsItselfGroup,
  },
};

const useStyles = makeStyles({
  level0: {
    marginTop: '64px',
  },
  level1: {
    marginTop: '18px',
    marginBottom: '6px',
    paddingLeft: '32px',
  },
  level2: {
    paddingLeft: '96px',
  },
});

export default function VisitsGroup({ visitsList, ...forwardingProps }) {
  const classes = useStyles();
  const { groupBy } = forwardingProps;
  return renderRecursive({
    classes,
    visitsList,
    groupingOrder: resolveGroupingOrder(groupBy),
    forwardingProps,
  });
}

function renderRecursive({
  classes,
  visitsList,
  groupingOrder,
  groupingLevel = 0,
  groupingFields = [],
  forwardingProps,
}) {
  const { provision } = forwardingProps;
  const plainGroup = groupingOrder[groupingLevel];
  if (!plainGroup) {
    return null;
  }
  const {
    groupingFieldName,
    component: VisitsGroupComponent,
  } = PLAIN_GROUPS_CONFIG[plainGroup];

  const groupedVisits =
    plainGroup === PLAIN_GROUPS.JUST_VISITS
      ? [[null, visitsList]]
      : Object.entries(groupByFn(visitsList, groupingFieldName));

  return groupedVisits.map(([groupingFieldValue, visitsByGroup]) => {
    const groupingField = {
      plainGroup,
      fieldName: groupingFieldName,
      value: groupingFieldValue,
    };
    const nestedGroupingFields = [...groupingFields, groupingField];
    const stats = calcStats(visitsByGroup, nestedGroupingFields, provision);
    groupingField.stats = stats; // ! affect nestedGroupingFields
    return (
      <VisitsGroupComponent
        key={groupingFieldValue}
        visitsList={visitsByGroup}
        groupingLevel={groupingLevel}
        groupingField={groupingField}
        groupingFields={nestedGroupingFields}
        headingVariant={HEADING_VARIANTS[groupingLevel]}
        className={classes[HEADING_CLASSNAMES[groupingLevel]]}
        {...forwardingProps}
      >
        {renderRecursive({
          classes,
          visitsList: visitsByGroup,
          groupingOrder,
          groupingLevel: groupingLevel + 1,
          groupingFields: nestedGroupingFields,
          forwardingProps,
        })}
      </VisitsGroupComponent>
    );
  });
}

function resolveGroupingOrder(groupBy) {
  const groupingOrder = groupBy
    .split('_')
    .map(currentGroupBy => PLAIN_GROUPS_MAPPING[currentGroupBy]);

  const shouldShowVisits = groupingOrder.includes(PLAIN_GROUPS.TRIPS);
  const lastGroup = groupingOrder[groupingOrder.length - 1];

  if (!shouldShowVisits && lastGroup !== PLAIN_GROUPS.LOCATIONS) {
    groupingOrder.push(PLAIN_GROUPS.LOCATIONS);
  }
  if (shouldShowVisits) {
    groupingOrder.push(PLAIN_GROUPS.JUST_VISITS);
  }
  return groupingOrder;
}

function calcStats(visitsList, groupingFields, provision) {
  const locationId = resolveGroupingLocation(groupingFields);
  const countryId = resolveGroupingCountry(groupingFields);
  const year = resolveGroupingYear(groupingFields);

  return {
    countriesStats: countryId
      ? null
      : calcCountriesStats(visitsList, provision, { year }),
    locationsStats: locationId
      ? null
      : calcLocationsStats(visitsList, provision, { year }),
  };
}

const {
  calcTotal: calcCountriesTotal,
  calcByYear: calcCountriesByYear,
} = createCalcByYearUtils('countryId');

function calcCountriesStats(visitsList, { visitsDict }, { year }) {
  const { newAtYear, totalAtYear, total, newbies } = year
    ? calcCountriesByYear(visitsDict, visitsList, year)
    : calcCountriesTotal(visitsList);
  return { year, newAtYear, totalAtYear, total, newbies };
}

const {
  calcTotal: calcLocationsTotal,
  calcByYear: calcLocationsByYear,
} = createCalcByYearUtils('locationId');

function calcLocationsStats(visitsList, { visitsDict }, { year }) {
  const { newAtYear, totalAtYear, total, newbies } = year
    ? calcLocationsByYear(visitsDict, visitsList, year)
    : calcLocationsTotal(visitsList);
  return {
    year,
    newAtYear,
    totalAtYear,
    total,
    newbies,
  };
}
