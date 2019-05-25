import React from 'react';
import PropTypes from 'prop-types';
import { SortableContainer, SortableElement } from 'react-sortable-hoc';
import Visit from './Visit';

const SortableTrip = SortableContainer(({ children }) => <div>{children}</div>);
const SortableVisit = SortableElement(Visit);

const Trip = ({
  trip: { tripId } = {},
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
  if (!visitsByTrip) {
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

  if (!isSortable) {
    return <div>{visitsNodes}</div>;
  }
  return (
    <SortableTrip
      onSortEnd={(data, event) =>
        handleSortEndOfVisit({ ...data, collection: visitsByTrip }, event)
      }
    >
      {visitsNodes}
    </SortableTrip>
  );
};
Trip.propTypes = {
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
  onSortEndOfVisit: undefined,
};

export default Trip;
