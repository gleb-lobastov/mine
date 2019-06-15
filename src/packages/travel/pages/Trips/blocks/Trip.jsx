import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import IconHome from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import locationPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import tripPropTypes from 'travel/models/trips/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import Location from 'travel/components/models/locations/Location';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import VisitWithRides from './VisitWithRides';
import Ride from './Ride';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisitWithRides = SortableElement(VisitWithRides);

const checkIsRidesMatch = (prevVisit, nextVisit) => {
  if (!prevVisit || !nextVisit) {
    return true;
  }
  const { departureRideId: prevVisitDepartureRideId } = prevVisit;
  const { arrivalRideId: nextVisitArrivalRideId } = nextVisit;
  return prevVisitDepartureRideId === nextVisitArrivalRideId;
};
const checkIsNodeNotSortable = event => {
  let element = event.target;
  while (element) {
    if (element.dataset && element.dataset.sortHandler === 'disabled') {
      return true;
    }
    element = element.parentNode;
  }
  return false;
};

const Trip = ({
  isEditable,
  locationsDict,
  onRideUpdate: handleRideUpdate,
  onVisitsOrderUpdate: handleVisitsOrderUpdate,
  ridesDict,
  trip,
  trip: { originLocationId, tripName },
  tripIndex,
  tripVisitsList,
  onTripUpdate: handleTripUpdate,
}) => {
  const [isSorting, setIsSorting] = useState(false);
  if (!tripVisitsList.length) {
    return null;
  }

  const isSortable = isEditable;
  const VisitWithRidesComponent = isSortable
    ? SortableVisitWithRides
    : VisitWithRides;
  const visitsNodes = tripVisitsList.map((visit, indexOfVisit) => {
    const { visitId } = visit;
    const prevVisit =
      indexOfVisit > 0 ? tripVisitsList[indexOfVisit - 1] : null;
    const nextVisit =
      indexOfVisit < tripVisitsList.length - 1
        ? tripVisitsList[indexOfVisit + 1]
        : null;
    return (
      <VisitWithRidesComponent
        key={visitId}
        index={indexOfVisit /* for SortableVisitWithRides */}
        isArrivalRideMatch={checkIsRidesMatch(prevVisit, visit)}
        isDepartureRideMatch={checkIsRidesMatch(visit, nextVisit)}
        isEditable={isEditable}
        isSorting={isSorting}
        onRideUpdate={handleRideUpdate}
        prevVisitId={prevVisit && prevVisit.visitId}
        nextVisitId={nextVisit && nextVisit.visitId}
        ridesDict={ridesDict}
        locationsDict={locationsDict}
        tripVisitsList={tripVisitsList}
        visit={visit}
      />
    );
  });

  const handleSortEnd = (data, event) => {
    setIsSorting(false);
    handleVisitsOrderUpdate(event, {
      ...data,
      collection: tripVisitsList,
    });
  };
  const wrappedVisitsNodes = !isSortable ? (
    <div>{visitsNodes}</div>
  ) : (
    <SortableTrip
      onSortEnd={handleSortEnd}
      shouldCancelStart={checkIsNodeNotSortable}
      updateBeforeSortStart={() => setIsSorting(true)}
    >
      {visitsNodes}
    </SortableTrip>
  );

  const originLocationNode = (
    <Location location={locationsDict[originLocationId]} Icon={IconHome} />
  );

  const recentVisit = tripVisitsList[tripVisitsList.length - 1];
  const preRecentVisit = tripVisitsList[tripVisitsList.length - 2];
  const { departureRideId: rideToHomeId, visitId: recentVisitId } = recentVisit;
  return (
    <>
      <h1>{`${tripIndex + 1}. ${tripName}`}</h1>
      {isEditable && (
        <TripEditDialog
          initialState={trip}
          onSubmit={updatedTrip =>
            handleTripUpdate({ ...trip, ...updatedTrip })
          }
        >
          <EditIcon />
        </TripEditDialog>
      )}
      {originLocationNode}
      {wrappedVisitsNodes}
      <Ride
        ride={ridesDict[rideToHomeId]}
        showDetails={
          isSorting || checkIsRidesMatch(preRecentVisit, recentVisit)
        }
        onRideUpdate={handleRideUpdate}
        isEditable={isEditable}
        availableVisits={tripVisitsList}
        defaultDepartureVisitId={recentVisitId}
      />
      {originLocationNode}
    </>
  );
};
Trip.propTypes = {
  tripIndex: PropTypes.number.isRequired,
  isEditable: PropTypes.bool,
  locationsDict: PropTypes.objectOf(PropTypes.shape(locationPropTypes))
    .isRequired,
  onRideUpdate: PropTypes.func.isRequired,
  onTripUpdate: PropTypes.func.isRequired,
  onVisitsOrderUpdate: PropTypes.func.isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
  trip: PropTypes.shape(tripPropTypes).isRequired,
  tripVisitsList: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
};

Trip.defaultProps = {
  isSortable: false,
  tripVisitsList: [],
};

export default Trip;
