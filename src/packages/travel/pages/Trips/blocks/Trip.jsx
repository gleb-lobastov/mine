import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import IconHome from '@material-ui/icons/Home';
import EditIcon from '@material-ui/icons/Edit';
import checkIsNodeNotSortable from 'modules/utilities/dom/checkIsNodeNotSortable';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
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

const resolveVisitsWindow = (tripVisitsList, indexOfVisit) => {
  const prevVisit = indexOfVisit > 0 ? tripVisitsList[indexOfVisit - 1] : null;
  const nextVisit =
    indexOfVisit < tripVisitsList.length - 1
      ? tripVisitsList[indexOfVisit + 1]
      : null;
  return [prevVisit, nextVisit];
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
  const isSortable = isEditable;
  const [isSorting, setIsSorting] = useState(false);
  const handleSortEnd = (data, event) => {
    setIsSorting(false);
    handleVisitsOrderUpdate(event, {
      ...data,
      collection: tripVisitsList,
    });
  };

  const VisitWithRidesComponent = isSortable
    ? SortableVisitWithRides
    : VisitWithRides;

  const visitsNodes = tripVisitsList.map((visit, indexOfVisit) => {
    const { visitId } = visit;
    const [prevVisit, nextVisit] = resolveVisitsWindow(
      tripVisitsList,
      indexOfVisit,
    );
    const { visitId: prevVisitId } = prevVisit || {};
    const { visitId: nextVisitId } = nextVisit || {};
    return (
      <VisitWithRidesComponent
        index={indexOfVisit /* for SortableVisitWithRides */}
        isArrivalRideMatch={checkIsVisitsConnectedByRide(prevVisit, visit)}
        isDepartureRideMatch={checkIsVisitsConnectedByRide(visit, nextVisit)}
        isEditable={isEditable}
        isSorting={isSorting}
        key={visitId}
        nextVisitId={nextVisitId}
        onRideUpdate={handleRideUpdate}
        originLocation={locationsDict[originLocationId]}
        prevVisitId={prevVisitId}
        ridesDict={ridesDict}
        tripVisitsList={tripVisitsList}
        visit={visit}
      />
    );
  });

  const wrappedVisitsNodes = isSortable ? (
    <SortableTrip
      onSortEnd={handleSortEnd}
      shouldCancelStart={checkIsNodeNotSortable}
      updateBeforeSortStart={() => setIsSorting(true)}
    >
      {visitsNodes}
    </SortableTrip>
  ) : (
    <div>{visitsNodes}</div>
  );

  const originLocationNode = (
    <Location location={locationsDict[originLocationId]} Icon={IconHome} />
  );

  const tripEditControlsNode = (
    <TripEditDialog
      initialState={trip}
      onSubmit={updatedTrip => handleTripUpdate({ ...trip, ...updatedTrip })}
    >
      <EditIcon />
    </TripEditDialog>
  );

  const lastVisit = tripVisitsList[tripVisitsList.length - 1];
  const lastButOneVisit = tripVisitsList[tripVisitsList.length - 2];
  const { departureRideId: rideToOriginId, visitId: recentVisitId } =
    lastVisit || {};
  const rideToOriginNode = (
    <Ride
      availableVisits={tripVisitsList}
      defaultDepartureVisitId={recentVisitId}
      isEditable={isEditable}
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
      <h1>
        {`${tripIndex + 1}. ${tripName}`}
        {isEditable && tripEditControlsNode}
      </h1>

      {originLocationNode}
      {wrappedVisitsNodes}

      {rideToOriginNode}
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
