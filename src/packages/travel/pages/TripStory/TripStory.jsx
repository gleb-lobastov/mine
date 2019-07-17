import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import { memoizeByLastArgs } from 'modules/utilities/memo';
import { toNumber } from 'modules/utilities/types/numbers';
import { selectDict } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import ridesPropTypes from 'travel/models/rides/propTypes';
import tripPropTypes from 'travel/models/trips/propTypes';
import { sortVisitsByTrips } from 'travel/models/trips/utils';
import visitPropTypes from 'travel/models/visits/propTypes';

const memoizedSortVisitsByTrips = memoizeByLastArgs(sortVisitsByTrips);

const styles = {
  container: { fontSize: '16px', lineHeight: '1.5' },
  visitContainer: { margin: '20px 0' },
  location: { fontWeight: 'bold', fontSize: '21px' },
  storyPart: { margin: '12px 0' },
};

const TripStory = ({
  classes,
  visits: { data: visitsList = [] } = {},
  ridesDict,
}) => {
  if (!ridesDict || !visitsList) {
    return <div>None</div>;
  }

  const noDataNode = <div>Заметки о поездке не найдены</div>;
  if (!visitsList.length) {
    return noDataNode;
  }

  const lastVisitIndex = visitsList.length - 1;
  const storiesNodes = memoizedSortVisitsByTrips(visitsList).map(
    (
      { visitId, arrivalRideId, departureRideId, visitComment, locationName },
      visitIndex,
    ) => {
      const { rideComment: arrivalRideComment } =
        ridesDict[arrivalRideId] || {};

      let departureRideComment;
      if (lastVisitIndex === visitIndex) {
        const { rideComment } = ridesDict[departureRideId] || {};
        departureRideComment = rideComment;
      }

      if (!arrivalRideComment && !departureRideComment && !visitComment) {
        return null;
      }
      return (
        <article key={`id${visitId}`} className={classes.visitContainer}>
          <h1 className={classes.location}>{locationName}</h1>
          {Boolean(arrivalRideComment) && (
            <section className={classes.storyPart}>
              {arrivalRideComment}
            </section>
          )}
          {Boolean(visitComment) && (
            <section className={classes.storyPart}>{visitComment}</section>
          )}
          {Boolean(departureRideComment) && (
            <section className={classes.storyPart}>
              {departureRideComment}
            </section>
          )}
        </article>
      );
    },
  );

  const contentNode = storiesNodes.some(Boolean) ? storiesNodes : noDataNode;
  return <div className={classes.container}>{contentNode}</div>;
};

TripStory.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  trips: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(tripPropTypes)),
  }).isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }).isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridesPropTypes)).isRequired,
};

const mapStateToRequirements = (
  state,
  {
    match: {
      params: { strTripId },
    },
  },
) => {
  const tripId = toNumber(strTripId);
  return {
    identity: {
      strTripId,
    },
    require: {
      rides: {
        modelName: 'rides',
        query: {
          filter: { trip_id: { comparator: '=', value: tripId } },
          navigation: { isDisabled: true },
        },
      },
      visits: {
        modelName: 'visits',
        query: {
          filter: { trip_id: { comparator: '=', value: tripId } },
          navigation: { isDisabled: true },
        },
      },
    },
    domain: 'tripStoryPage',
  };
};

const mapStateToProps = state => ({
  ridesDict: selectDict(state, 'rides'),
});

export default compose(
  withRouter,
  withStyles(styles),
  withProvision(mapStateToRequirements, mapStateToProps),
)(TripStory);
