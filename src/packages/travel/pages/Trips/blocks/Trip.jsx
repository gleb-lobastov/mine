import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Visit from './Visit';
import Location from './Location';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisit = SortableElement(Visit);

const Trip = ({
  trip: { tripId, originLocationId } = {},
  visitsList,
  locationsDict,
  isSortable,
  onSortEndOfVisit: handleSortEndOfVisit,
}) => {
  const visitsByTrip = visitsList
    .filter(({ tripId: visitTripId }) => visitTripId === tripId)
    .sort(
      ({ orderInTrip: orderInTripA }, { orderInTrip: orderInTripB }) =>
        orderInTripA - orderInTripB,
    );
  if (!visitsByTrip || !visitsByTrip.length) {
    return null;
  }
  const VisitComponent = isSortable ? SortableVisit : Visit;
  const visitsNodes = visitsByTrip.map((visit, index) => (
    <VisitComponent
      key={visit.visitId}
      index={index}
      visit={visit}
      locationsDict={locationsDict}
    />
  ));

  const wrappedVisitsNodes = !isSortable ? (
    <div>{visitsNodes}</div>
  ) : (
    <SortableTrip
      onSortEnd={(data, event) =>
        handleSortEndOfVisit &&
        handleSortEndOfVisit({ ...data, collection: visitsByTrip }, event)
      }
    >
      {visitsNodes}
    </SortableTrip>
  );

  const originLocation = locationsDict[originLocationId];
  return (
    <>
      <Location location={originLocation} />
      {wrappedVisitsNodes}
      <Location location={originLocation} />
    </>
  );
};
Trip.propTypes = {
  isSortable: PropTypes.bool,
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
