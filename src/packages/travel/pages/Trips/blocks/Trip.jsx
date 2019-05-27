import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import IconHome from '@material-ui/icons/Home';
import Visit from './Visit';
import Location from './Location';
import Ride from './Ride';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisit = SortableElement(Visit);

const checkIsRidesMatch = (prevVisit, nextVisit) => {
  if (!prevVisit || !nextVisit) {
    return true;
  }
  const { departureRideId: prevVisitDepartureRideId } = prevVisit;
  const { arrivalRideId: nextVisitArrivalRideId } = nextVisit;
  return prevVisitDepartureRideId === nextVisitArrivalRideId;
};
const Trip = ({
  trip: { tripId, originLocationId } = {},
  visitsList,
  locationsDict,
  ridesDict,
  isEditable,
  onSortEndOfVisit: handleSortEndOfVisit,
  onRideUpdate: handleRideUpdate,
}) => {
  const [isSorting, setIsSorting] = useState(false);
  const visitsByTrip = visitsList
    .filter(({ tripId: visitTripId }) => visitTripId === tripId)
    .sort(
      ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
        orderInTripA - orderInTripB,
    );
  if (!visitsByTrip || !visitsByTrip.length) {
    return null;
  }

  const handleRideUpdateInternal = ({ ride, visitId, isArrivalToVisit }) => {
    const visitIndex = visitsByTrip.findIndex(
      ({ visitId: visitIdToCompare }) => visitIdToCompare === visitId,
    );
    const lastVisitIndex = visitsByTrip.length - 1;
    const prevVisitId =
      visitIndex <= 1 ? null : visitsByTrip[visitIndex - 1].visitId;
    const nextVisitId =
      visitIndex >= lastVisitIndex - 1
        ? null
        : visitsByTrip[visitIndex + 1].visitId;

    return handleRideUpdate({
      ride,
      departureFromVisitId: isArrivalToVisit ? prevVisitId : visitId,
      arrivalToVisitId: isArrivalToVisit ? visitId : nextVisitId,
    });
  };

  const isSortable = isEditable;
  const VisitComponent = isSortable ? SortableVisit : Visit;
  const visitsNodes = visitsByTrip.map((visit, index) => (
    <VisitComponent
      index={index}
      isEditable={isEditable}
      isArrivalRideMatch={checkIsRidesMatch(visitsByTrip[index - 1], visit)}
      isDepartureRideMatch={checkIsRidesMatch(visit, visitsByTrip[index + 1])}
      isSorting={isSorting}
      key={visit.visitId}
      locationsDict={locationsDict}
      ridesDict={ridesDict}
      visit={visit}
      onRideUpdate={handleRideUpdateInternal}
    />
  ));

  const wrappedVisitsNodes = !isSortable ? (
    <div>{visitsNodes}</div>
  ) : (
    <SortableTrip
      updateBeforeSortStart={() => setIsSorting(true)}
      shouldCancelStart={event => {
        let element = event.target;
        while (element) {
          if (element.dataset && element.dataset.sortHandler === 'disabled') {
            return true;
          }
          element = element.parentNode;
        }
        return false;
      }}
      onSortEnd={(data, event) => {
        setIsSorting(false);
        if (handleSortEndOfVisit) {
          handleSortEndOfVisit({ ...data, collection: visitsByTrip }, event);
        }
      }}
    >
      {visitsNodes}
    </SortableTrip>
  );

  const originLocation = locationsDict[originLocationId];
  const originLocationNode = (
    <Location location={originLocation} Icon={IconHome} />
  );

  const recentVisit = visitsByTrip[visitsByTrip.length - 1];
  const { departureRideId: rideToHomeId } = recentVisit;
  return (
    <>
      {originLocationNode}
      {wrappedVisitsNodes}
      <Ride ride={ridesDict[rideToHomeId]} showDetails={isSorting} />
      {originLocationNode}
    </>
  );
};
Trip.propTypes = {
  isEditable: PropTypes.bool,
  onSortEndOfVisit: PropTypes.func,
  trip: PropTypes.shape({
    tripName: PropTypes.string,
    tripId: PropTypes.number,
  }).isRequired,
  visitsList: PropTypes.arrayOf(
    PropTypes.shape({
      tripId: PropTypes.number,
      orderInTrip: PropTypes.number,
    }),
  ).isRequired,
  locationsDict: PropTypes.objectOf(
    PropTypes.shape({
      locationId: PropTypes.number,
      locationName: PropTypes.string,
    }),
  ).isRequired,
};

Trip.defaultProps = {
  isSortable: false,
  onSortEndOfVisit: undefined,
};

export default Trip;
