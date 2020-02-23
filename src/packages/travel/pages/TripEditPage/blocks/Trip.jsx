import React, { useCallback } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import IconHome from '@material-ui/icons/Home';
import checkIsVisitsConnectedByRide from 'travel/utils/checkIsVisitsConnectedByRide';
import tripPropTypes from 'travel/models/trips/propTypes';
import Location from 'travel/components/models/locations/Location';
import TripEditDialog from 'travel/components/models/trips/TripEditDialog';
import useNodeInsertion from '../useNodeInsertion';
import Sortable from '../Sortable';
import VisitWithRides from './VisitWithRides';
import VisitCreator from './VisitCreator';
import TripEditTitle from './TripEditTitle';

const useStyles = makeStyles({
  container: {
    '&:hover $visibleOnlyOnHover': {
      visibility: 'visible',
    },
  },
  visibleOnlyOnHover: {
    visibility: 'hidden',
  },
});

const Trip = ({
  onRideUpdate,
  onTripUpdate,
  onVisitsOrderUpdate,
  onVisitUpdate,
  provision,
  trip,
}) => {
  const { locationsDict, visitsDict, ridesDict } = provision;
  const { visits: tripVisitsIds, originLocationId } = trip;
  const tripVisitsList = tripVisitsIds
    .map(visitId => visitsDict[visitId])
    .filter(Boolean);

  const classes = useStyles();

  const visitsNodes = tripVisitsList.flatMap((visit, indexOfVisit) => {
    const { visitId } = visit || {};
    const prevVisit = tripVisitsList[indexOfVisit - 1] || null;
    const nextVisit = tripVisitsList[indexOfVisit + 1] || null;
    const { visitId: prevVisitId } = prevVisit || {};
    const { visitId: nextVisitId } = nextVisit || {};
    return (
      <VisitWithRides
        index={indexOfVisit /* for SortableNode */}
        isArrivalRideMatch={checkIsVisitsConnectedByRide(prevVisit, visit)}
        isDepartureRideMatch={checkIsVisitsConnectedByRide(visit, nextVisit)}
        key={visitId}
        nextVisitId={nextVisitId}
        onRideUpdate={onRideUpdate}
        onVisitUpdate={onVisitUpdate}
        prevVisitId={prevVisitId}
        ridesDict={ridesDict}
        tripVisitsList={tripVisitsList}
        visit={visit}
      />
    );
  });

  const [
    visitsNodesWithVisitCreatorNode,
    visitCreatorNodeIndex,
    setVisitCreatorNodeIndex,
  ] = useNodeInsertion(
    visitsNodes,
    <VisitCreator
      key="visitCreator"
      onVisitUpdate={newVisit =>
        onVisitUpdate(newVisit, {
          indexInCollection: visitCreatorNodeIndex,
          collection: tripVisitsList,
        })
      }
    />,
  );

  const handleSortEnd = useCallback(
    (data, event) => {
      const { oldIndex, newIndex } = data;
      const isVisitCreatorNodeMoved = oldIndex === visitCreatorNodeIndex;
      if (isVisitCreatorNodeMoved) {
        setVisitCreatorNodeIndex(newIndex);
      } else {
        onVisitsOrderUpdate(event, {
          oldIndex: oldIndex > visitCreatorNodeIndex ? oldIndex - 1 : oldIndex,
          newIndex: newIndex > visitCreatorNodeIndex ? newIndex - 1 : newIndex,
          collection: tripVisitsList,
        });
      }
    },
    [visitCreatorNodeIndex, onVisitsOrderUpdate],
  );

  return (
    <>
      <TripEditTitle
        className={classes.container}
        provision={provision}
        tripVisitsList={tripVisitsList}
        trip={trip}
      >
        <TripEditDialog
          initialState={trip}
          onSubmit={updatedTrip => onTripUpdate({ ...trip, ...updatedTrip })}
        />
      </TripEditTitle>
      <Location location={locationsDict[originLocationId]} Icon={IconHome} />
      <Sortable onSortEnd={handleSortEnd}>
        {visitsNodesWithVisitCreatorNode}
      </Sortable>
    </>
  );
};

Trip.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  onRideUpdate: PropTypes.func.isRequired,
  onTripUpdate: PropTypes.func.isRequired,
  onVisitsOrderUpdate: PropTypes.func.isRequired,
  trip: PropTypes.shape(tripPropTypes).isRequired,
};

Trip.defaultProps = {
  tripVisitsList: [],
};

export default Trip;
