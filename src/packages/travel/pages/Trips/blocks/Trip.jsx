import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import IconHome from '@material-ui/icons/Home';
import Visit from './Visit';
import Location from './Location';
import Ride from './Ride';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisit = SortableElement(Visit);

const Trip = ({
  trip: { tripId, originLocationId } = {},
  visitsList,
  locationsDict,
  ridesDict,
  isEditable,
  onSortEndOfVisit: handleSortEndOfVisit,
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

  const isSortable = isEditable;
  const VisitComponent = isSortable ? SortableVisit : Visit;
  const visitsNodes = visitsByTrip.map((visit, index) => (
    <VisitComponent
      key={visit.visitId}
      index={index}
      visit={visit}
      locationsDict={locationsDict}
      ridesDict={ridesDict}
      isSorting={isSorting}
      isEditable={isEditable}
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
