/* globals __GOOGLE_MAP_API_KEY__ */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import { selectProvisionStatus, selectDict } from 'core/connection';
import withProvision from 'core/connection/withProvision';
import locationPropTypes from 'travel/models/locations/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import useMarker from './useMarker';

const styles = {
  container: { fontSize: '16px', lineHeight: '1.5' },
  visitContainer: { margin: '20px 0' },
  location: { fontWeight: 'bold', fontSize: '21px' },
  googleMapContainer: {
    margin: '12px 0',
    width: '800px',
    maxWidth: '100%',
    height: '400px',
    maxHeight: '100%',
  },
};

const renderOrderedAndCountedVisitsByYear = ({ visitsList, ridesDict }) => {
  const visitsCountByYear = visitsList
    .map(({ arrivalRideId }) => {
      const { arrivalDateTime } = ridesDict[arrivalRideId] || {};
      return arrivalDateTime;
    })
    .filter(Boolean)
    .reduce((memo, date) => {
      const year = date.getFullYear();
      if (!memo[year]) {
        memo[year] = 0;
      }
      memo[year] += 1;
      return memo;
    }, {});

  return Object.entries(visitsCountByYear)
    .sort(([keyA], [keyB]) => keyA - keyB)
    .map(([key, value]) => (value > 1 ? `${key} x${value}` : key))
    .join(', ');
};

const LocationCard = ({
  classes,
  location: { locationName, lat, lon } = {},
  visits: { data: visitsList = [] } = {},
  ridesDict,
}) => {
  const noDataNode = <div>Заметки о поездке не найдены</div>;
  if (!visitsList.length) {
    return noDataNode;
  }

  const { handleGoogleApiLoaded } = useMarker({ lat, lon });

  const orderedAndCountedVisitsByYear = renderOrderedAndCountedVisitsByYear({
    visitsList,
    ridesDict,
  });
  return (
    <div className={classes.container}>
      <h1 className={classes.location}>{locationName}</h1>
      <div>
        <span>{`Посещено ${visitsList.length} раз`}</span>
        &nbsp;
        {orderedAndCountedVisitsByYear && (
          <span>{`в ${orderedAndCountedVisitsByYear}`}</span>
        )}
      </div>
      <div className={classes.googleMapContainer}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: __GOOGLE_MAP_API_KEY__ }}
          center={{ lat, lng: lon }}
          defaultZoom={11}
          onGoogleApiLoaded={handleGoogleApiLoaded}
        />
      </div>
    </div>
  );
};

LocationCard.propTypes = {
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape(locationPropTypes).isRequired,
  visits: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  }).isRequired,
  ridesDict: PropTypes.objectOf(PropTypes.shape(ridePropTypes)).isRequired,
};

const mapStateToProps = state => ({
  ridesDict: selectDict(state, 'rides'),
});

const mapStateToRequirements = (state, { locationId }) => {
  const {
    value: { 'locationPage.visits': { data: requiredVisitIds } = {} } = {},
  } = selectProvisionStatus(state, 'locationPage.visits') || {};
  return {
    request: {
      location: {
        modelName: 'locations',
        observe: locationId,
        query: { id: locationId },
      },
      visits: {
        modelName: 'visits',
        observe: locationId,
        query: {
          filter: { location_id: { comparator: '=', value: locationId } },
          navigation: { isDisabled: true },
        },
      },
      rides: {
        modelName: 'rides',
        isNoop: !requiredVisitIds || !requiredVisitIds.length,
        observe: requiredVisitIds,
        query: {
          filter: { visit_id: { comparator: 'in', value: requiredVisitIds } },
          navigation: { isDisabled: true },
        },
      },
    },
    domain: 'locationPage',
  };
};

export default compose(
  withStyles(styles),
  withProvision(mapStateToRequirements, mapStateToProps),
)(LocationCard);
