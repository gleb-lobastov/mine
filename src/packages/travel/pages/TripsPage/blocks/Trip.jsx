import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import IconHome from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import Path from 'modules/utilities/routing/Path';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
import locationPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import tripPropTypes from 'travel/models/trips/propTypes';
import { TRIP_TYPES } from 'travel/models/trips/consts';
import { resolveTripCaption } from 'travel/models/trips/utils';
import visitPropTypes from 'travel/models/visits/propTypes';
import Location from 'travel/components/models/locations/Location';
import { checkTripHasStory } from '../utils';
import VisitWithRides from './VisitWithRides';
import Ride from './Ride';

const styles = {
  container: {
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
};

const resolveVisitsWindow = (tripVisitsList, indexOfVisit, overstepIndex) => {
  const prevVisitIndex =
    indexOfVisit - 1 - (indexOfVisit > overstepIndex ? 1 : 0);
  const nextVisitIndex =
    indexOfVisit + 1 - (indexOfVisit + 1 > overstepIndex ? 1 : 0);
  const prevVisit = prevVisitIndex >= 0 ? tripVisitsList[prevVisitIndex] : null;
  const nextVisit =
    nextVisitIndex < tripVisitsList.length
      ? tripVisitsList[nextVisitIndex]
      : null;
  return [prevVisit, nextVisit];
};

const Trip = ({
  classes,
  countriesDict,
  isEditable,
  locationsDict,
  ridesDict,
  trip: { originLocationId, tripName, tripType },
  tripIndex,
  tripVisitsList,
  tripEditUrl,
  tripStoryUrl,
  locationPath,
}) => {
  const addVisitControlIndex = tripVisitsList.length;

  const visitsNodes = tripVisitsList.map((visit, indexOfVisit) => {
    const { visitId } = visit;
    const [prevVisit, nextVisit] = resolveVisitsWindow(
      tripVisitsList,
      indexOfVisit,
      addVisitControlIndex,
    );

    return (
      <VisitWithRides
        isArrivalRideMatch={checkIsVisitsConnectedByRide(prevVisit, visit)}
        isDepartureRideMatch={checkIsVisitsConnectedByRide(visit, nextVisit)}
        key={visitId}
        ridesDict={ridesDict}
        isEditable={isEditable}
        visit={visit}
        locationPath={locationPath}
      />
    );
  });

  const originLocationNode = (
    <Location
      location={locationsDict[originLocationId]}
      Icon={IconHome}
      locationPath={locationPath}
    />
  );

  const tripEditControlsNode = (
    <IconButton
      data-sort-handler="disabled"
      size="small"
      variant="outlined"
      color="primary"
      component={Link}
      to={tripEditUrl}
    >
      <EditIcon className={classes.visibleOnlyOnHover} />
    </IconButton>
  );

  const lastVisit = tripVisitsList[tripVisitsList.length - 1];
  const { departureRideId: rideToOriginId } = lastVisit || {};

  const isRelocation = tripType === TRIP_TYPES.RELOCATION;
  const rideToOriginNode = isRelocation ? null : (
    <Ride ride={ridesDict[rideToOriginId]} showDetails={false} />
  );

  const hasStory = checkTripHasStory(tripVisitsList, ridesDict);
  return (
    <>
      <h1 className={classes.container}>
        {`${tripIndex + 1}. ${resolveTripCaption(
          tripVisitsList,
          countriesDict,
          locationsDict[originLocationId] &&
            locationsDict[originLocationId].countryId,
          tripName,
        )}`}
        {isEditable && tripEditControlsNode}
      </h1>
      {originLocationNode}
      {<div>{visitsNodes}</div>}
      {!isRelocation && (
        <>
          {rideToOriginNode}
          {originLocationNode}
        </>
      )}
      {hasStory && (
        <div>
          <Link to={tripStoryUrl}>Заметки</Link>
        </div>
      )}
    </>
  );
};
Trip.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  tripIndex: PropTypes.number.isRequired,
  isEditable: PropTypes.bool,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  onTripUpdate: PropTypes.func.isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
  trip: PropTypes.shape(tripPropTypes).isRequired,
  tripVisitsList: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  locationPath: PropTypes.instanceOf(Path).isRequired,
  tripEditUrl: PropTypes.string.isRequired,
  tripStoryUrl: PropTypes.string.isRequired,
};

Trip.defaultProps = {
  tripVisitsList: [],
};

export default withStyles(styles)(Trip);
