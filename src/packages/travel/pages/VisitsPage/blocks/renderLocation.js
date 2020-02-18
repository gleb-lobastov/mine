import React from 'react';
import IconStar from '@material-ui/icons/StarBorder';
import IconThumbDown from '@material-ui/icons/ThumbDownOutlined';
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDownOutlined';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import { LOCATION_RATING } from 'travel/models/users/consts';
import { GROUP_VISITS_BY, SORT_VISITS_BY } from '../consts';
import {
  getYearsOfVisits,
  getLocationVisitsByYearCount,
  getLocationVisitsCount,
} from '../calcCounters';

const GROUPS_TO_RENDER_COUNTRY = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.YEARS,
  GROUP_VISITS_BY.TRIPS,
];
const GROUPS_TO_RENDER_YEARS_OF_VISIT = [
  GROUP_VISITS_BY.LOCATIONS,
  GROUP_VISITS_BY.COUNTRIES,
];

export default function renderLocation({
  visit,
  visit: { visitId, locationId, countryId },
  classes,
  changes: {
    isYearChanged,
    isCountryChanged,
    isTripChanged,
    isLocationChanged,
  },
  year,
  provision: { locationsDict, locationsRating, countriesDict },
  groupBy,
  sortBy,
  counters,
}) {
  const isGroupedByTripsOnly = groupBy === GROUP_VISITS_BY.TRIPS;
  const shouldRender =
    isGroupedByTripsOnly || // every visit in trip should be shown
    isTripChanged || // in other grouping show only unique locations
    isYearChanged ||
    isCountryChanged ||
    isLocationChanged;

  if (!shouldRender) {
    return null;
  }

  const shouldRenderCountry = GROUPS_TO_RENDER_COUNTRY.includes(groupBy);
  const countryDetailNode = shouldRenderCountry ? (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.detail}
      isDetail={true}
    />
  ) : null;

  const visitsCount = resolveVisitsCounter(visit, counters, year, groupBy);
  const visitsDetailNode =
    sortBy !== SORT_VISITS_BY.RATING_ALPHABET && visitsCount > 1 ? (
      <span className={classes.detail}>{`${visitsCount} визитов`}</span>
    ) : null;

  const shouldRenderYearOfVisit =
    sortBy !== SORT_VISITS_BY.RATING_ALPHABET &&
    GROUPS_TO_RENDER_YEARS_OF_VISIT.includes(groupBy);
  const yearsOfVisitDetailNode = shouldRenderYearOfVisit ? (
    <span className={classes.detail}>
      {`в ${getYearsOfVisits(counters, locationId).join(', ')}`}
    </span>
  ) : null;

  const ratingNode =
    sortBy === SORT_VISITS_BY.RATING_ALPHABET
      ? renderAlignedRatingNode({
          classes,
          locationRating: locationsRating?.[locationId],
        })
      : null;

  const childrenNodes = joinNodes(
    countryDetailNode,
    ratingNode,
    visitsDetailNode,
    yearsOfVisitDetailNode,
  );

  return (
    <LocationInfo
      key={`l${locationId}_v${visitId}`}
      location={locationsDict[locationId]}
      country={countriesDict[countryId]}
    >
      {childrenNodes}
    </LocationInfo>
  );
}

function renderAlignedRatingNode({ locationRating, classes }) {
  return (
    <div className={classes.ratingBlock}>
      {renderRatingNode({ locationRating, classes })}
    </div>
  );
}

function renderRatingNode({ locationRating, classes }) {
  switch (locationRating) {
    case LOCATION_RATING.PLACE_TO_LIVE:
      return (
        <>
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
        </>
      );
    case LOCATION_RATING.FEW_PER_YEAR:
    case LOCATION_RATING.ONCE_PER_YEAR:
      return (
        <>
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
        </>
      );
    case LOCATION_RATING.ONCE_PER_TWO_YEARS:
    case LOCATION_RATING.ONCE_PER_FIVE_YEARS:
      return (
        <>
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
        </>
      );
    case LOCATION_RATING.ONCE_PER_DECADE:
    case LOCATION_RATING.TWICE_PER_LIVE:
      return (
        <>
          <IconStar className={classes.ratingIcon} />
          <IconStar className={classes.ratingIcon} />
        </>
      );
    case LOCATION_RATING.ONCE_PER_LIVE:
      return <IconStar className={classes.ratingIcon} />;
    case LOCATION_RATING.NEVER:
      return <IconThumbDown className={classes.ratingIcon} />;
    default:
      return <IconThumbsUpDown className={classes.ratingIcon} />;
  }
}

function joinNodes(...nodes) {
  return nodes.filter(Boolean).reduce((nodesMemo, node, index) => {
    if (index > 0) {
      nodesMemo.push(<span> </span>);
    }
    nodesMemo.push(node);
    return nodesMemo;
  }, []);
}

function resolveVisitsCounter(visit, counters = {}, year, groupBy) {
  const { locationId } = visit;
  switch (groupBy) {
    case GROUP_VISITS_BY.LOCATIONS:
      return getLocationVisitsCount(counters, locationId);
    case GROUP_VISITS_BY.COUNTRIES:
      return getLocationVisitsCount(counters, locationId);
    case GROUP_VISITS_BY.YEARS:
    case GROUP_VISITS_BY.COUNTRIES_YEARS:
    case GROUP_VISITS_BY.YEARS_COUNTRIES:
      return getLocationVisitsByYearCount(counters, locationId, year);
    case GROUP_VISITS_BY.TRIPS_COUNTRIES:
    default:
      break;
  }
}
