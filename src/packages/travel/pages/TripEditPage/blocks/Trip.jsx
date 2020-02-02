import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import IconHome from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import checkIsNodeNotSortable from 'modules/utilities/dom/checkIsNodeNotSortable';
import { withItem } from 'modules/utilities/types/array';
import Path from 'modules/utilities/routing/Path';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
import locationPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import tripPropTypes from 'travel/models/trips/propTypes';
import { TRIP_TYPES } from 'travel/models/trips/consts';
import { resolveTripCaption } from 'travel/models/trips/utils';
import visitPropTypes from 'travel/models/visits/propTypes';
import Location from 'travel/components/models/locations/Location';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import VisitWithRides from './VisitWithRides';
import Ride from './Ride';
import VisitCreator from './VisitCreator';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisitWithRides = SortableElement(
  ({ replaceWithNode, onVisitUpdate: handleVisitUpdate, ...props }) =>
    replaceWithNode || (
      <VisitWithRides onVisitUpdate={handleVisitUpdate} {...props} />
    ),
);

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
  locationsDict,
  onRideUpdate: handleRideUpdate,
  onVisitsOrderUpdate: handleVisitsOrderUpdate,
  ridesDict,
  trip,
  trip: { tripId, originLocationId, tripName, tripType },
  tripVisitsList,
  onTripUpdate: handleTripUpdate,
  onVisitUpdate: handleVisitUpdate,
  locationPath,
}) => {
  const [isSorting, setIsSorting] = useState(false);
  const [addVisitControlIndex, setAddVisitControlIndex] = useState(
    tripVisitsList.length,
  );
  const handleSortEnd = (data, event) => {
    setIsSorting(false);
    const { oldIndex, newIndex } = data;
    if (oldIndex === addVisitControlIndex) {
      setAddVisitControlIndex(newIndex);
    } else {
      handleVisitsOrderUpdate(event, {
        oldIndex: oldIndex > addVisitControlIndex ? oldIndex - 1 : oldIndex,
        newIndex: newIndex > addVisitControlIndex ? newIndex - 1 : newIndex,
        collection: tripVisitsList,
      });
    }
  };

  const actualTripVisitsList = withItem(
    tripVisitsList,
    { isItVisitCreatorControl: true },
    addVisitControlIndex,
  );

  const visitsNodes = actualTripVisitsList.map((visit, indexOfVisit) => {
    const { isItVisitCreatorControl, visitId } = visit;
    if (isItVisitCreatorControl) {
      return (
        <SortableVisitWithRides
          key="visitCreator"
          index={indexOfVisit}
          replaceWithNode={
            <VisitCreator
              isSorting={isSorting}
              onVisitUpdate={newVisit =>
                handleVisitUpdate(newVisit, {
                  indexInCollection: addVisitControlIndex,
                  collection: tripVisitsList,
                  tripId,
                })
              }
            />
          }
        />
      );
    }
    const [prevVisit, nextVisit] = resolveVisitsWindow(
      tripVisitsList,
      indexOfVisit,
      addVisitControlIndex,
    );
    const { visitId: prevVisitId } = prevVisit || {};
    const { visitId: nextVisitId } = nextVisit || {};
    return (
      <SortableVisitWithRides
        index={indexOfVisit /* for SortableVisitWithRides */}
        isArrivalRideMatch={checkIsVisitsConnectedByRide(prevVisit, visit)}
        isDepartureRideMatch={checkIsVisitsConnectedByRide(visit, nextVisit)}
        isEditable={true}
        isSortable={true}
        isSorting={isSorting}
        key={visitId}
        nextVisitId={nextVisitId}
        onRideUpdate={handleRideUpdate}
        onVisitUpdate={handleVisitUpdate}
        originLocation={locationsDict[originLocationId]}
        prevVisitId={prevVisitId}
        ridesDict={ridesDict}
        tripVisitsList={tripVisitsList}
        visit={visit}
        locationPath={locationPath}
      />
    );
  });

  const wrappedVisitsNodes = (
    <SortableTrip
      onSortEnd={handleSortEnd}
      shouldCancelStart={checkIsNodeNotSortable}
      updateBeforeSortStart={() => setIsSorting(true)}
      lockAxis="y"
      lockToContainerEdges={true}
    >
      {visitsNodes}
    </SortableTrip>
  );

  const originLocationNode = (
    <Location
      location={locationsDict[originLocationId]}
      Icon={IconHome}
      locationPath={locationPath}
    />
  );

  const tripEditControlsNode = (
    <TripEditDialog
      initialState={trip}
      onSubmit={updatedTrip => handleTripUpdate({ ...trip, ...updatedTrip })}
    >
      <IconButton
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
      >
        <EditIcon className={classes.visibleOnlyOnHover} />
      </IconButton>
    </TripEditDialog>
  );

  const lastVisit = tripVisitsList[tripVisitsList.length - 1];
  const lastButOneVisit = tripVisitsList[tripVisitsList.length - 2];
  const { departureRideId: rideToOriginId, visitId: recentVisitId } =
    lastVisit || {};

  const isRelocation = tripType === TRIP_TYPES.RELOCATION;
  const rideToOriginNode = isRelocation ? null : (
    <Ride
      availableVisits={tripVisitsList}
      defaultDepartureVisitId={recentVisitId}
      isEditable={true}
      onRideUpdate={handleRideUpdate}
      originLocation={locationsDict[originLocationId]}
      ride={ridesDict[rideToOriginId]}
      showDetails={
        isSorting || checkIsVisitsConnectedByRide(lastButOneVisit, lastVisit)
      }
    />
  );

  return (
    <>
      <h1 className={classes.container}>
        {resolveTripCaption(
          tripVisitsList,
          countriesDict,
          locationsDict[originLocationId] &&
            locationsDict[originLocationId].countryId,
          tripName,
        )}
        {tripEditControlsNode}
      </h1>
      {originLocationNode}
      {wrappedVisitsNodes}
      {!isRelocation && (
        <>
          {rideToOriginNode}
          {originLocationNode}
        </>
      )}
    </>
  );
};
Trip.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  tripIndex: PropTypes.number.isRequired,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  onRideUpdate: PropTypes.func.isRequired,
  onTripUpdate: PropTypes.func.isRequired,
  onVisitsOrderUpdate: PropTypes.func.isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
  trip: PropTypes.shape(tripPropTypes).isRequired,
  tripVisitsList: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  tripStoryPath: PropTypes.instanceOf(Path).isRequired,
  locationPath: PropTypes.instanceOf(Path).isRequired,
};

Trip.defaultProps = {
  tripVisitsList: [],
};

export default withStyles(styles)(Trip);