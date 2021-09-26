import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { LOCATION_RATING } from 'travel/models/users/consts';
import IconStar from '@material-ui/icons/StarBorder';
import IconThumbDown from '@material-ui/icons/ThumbDownOutlined';
import IconThumbsUpDown from '@material-ui/icons/ThumbsUpDownOutlined';
import {
  GROUP_VISITS_BY,
  SORT_VISITS_BY,
} from 'travel/pages/RefactoredVisitsPage/consts';
import {
  getLocationVisitsByYearCount,
  getLocationVisitsCount,
  getYearsOfVisits,
} from 'travel/pages/RefactoredVisitsPage/calcCounters';
import CountryInfo from 'travel/components/models/countries/CountryInfo';
import LocationInfo from 'travel/components/models/locations/LocationInfo';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { visitDateTimePeriodToString } from 'modules/utilities/dateTime/dateTimePeriodToString';
import RideInfo from 'travel/components/models/rides/RideInfo';

const useStyles = makeStyles({});

export default function LocationVisitsGroup({
  groupKey: locationId,
  children,
  groupingOrder,
  className,
  provision: { countriesDict, locationsDict },
  visitsList,
  groupBy,
  sortBy,
  paths,
}) {
  const { countryId } = locationsDict[locationId] ?? {};
  const classes = useStyles();
  const isGroupedByTripsOnly = groupBy === GROUP_VISITS_BY.TRIPS;

  const shouldRenderCountry = !groupingOrder.includes(GROUP_VISITS_BY.COUNTRIES);
  const countryDetailNode = shouldRenderCountry ? (
    <CountryInfo
      country={countriesDict[countryId]}
      className={classes.detail}
      isDetail={true}
    />
  ) : null;

  const visitsCount = visitsList.length;
  const visitsDetailNode =
    sortBy !== SORT_VISITS_BY.RATING_ALPHABET && visitsCount > 1 ? (
      <span className={classes.detail}>{`${visitsCount} визитов`}</span>
    ) : null;

  // const shouldRenderYearOfVisit =
  //   sortBy !== SORT_VISITS_BY.RATING_ALPHABET &&
  //   !parentGroups.includes(GROUP_VISITS_BY.YEARS);
  //
  // const yearsOfVisitDetailNode = shouldRenderYearOfVisit ? (
  //   <span className={classes.detail}>
  //     {`в ${getYearsOfVisits(counters, locationId).join(', ')}`}
  //   </span>
  // ) : null;

  // const ratingNode =
  //   sortBy === SORT_VISITS_BY.RATING_ALPHABET
  //     ? renderAlignedRatingNode({
  //         classes,
  //         locationRating: locationsRating?.[locationId],
  //       })
  //     : null;

  const childrenNodes = joinNodes(
    countryDetailNode,
    // ratingNode,
    visitsDetailNode,
    // yearsOfVisitDetailNode,
  );

  const location = locationsDict[locationId];
  return (
    <>
      <LocationInfo
        className={className}
        location={location}
        country={countriesDict[countryId]}
        shouldJustifyContent={isGroupedByTripsOnly}
      >
        {childrenNodes}
        {isGroupedByTripsOnly && (
          <Grid container={true}>
            <Grid item={true}>
              <Typography className={classes.detail}>
                Hidden
                {/* visitDateTimePeriodToString(visitsDict[visitId], isObscure) */}
              </Typography>
            </Grid>
            <Grid item={true}>
              {/*<RideInfo*/}
              {/*  ride={ridesDict[departureRideId]}*/}
              {/*  className={classes.halfDown}*/}
              {/*/>*/}
            </Grid>
          </Grid>
        )}
      </LocationInfo>
      {children}
    </>
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
