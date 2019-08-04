/* globals __GOOGLE_MAP_API_KEY__ */
import React from 'react';
import PropTypes from 'prop-types';
import GoogleMapReact from 'google-map-react';
import compose from 'lodash/fp/compose';
import { withStyles } from '@material-ui/core/styles';
import withProvision from 'core/connection/withProvision';
import locationPropTypes from 'travel/models/locations/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
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

const LocationCard = ({
  classes,
  location: { locationName, lat, lon } = {},
  visits: { data: visitsList = [] } = {},
}) => {
  const noDataNode = <div>Заметки о поездке не найдены</div>;
  if (!visitsList.length) {
    return noDataNode;
  }

  const { handleGoogleApiLoaded } = useMarker({ lat, lon });

  return (
    <div className={classes.container}>
      <h1 className={classes.location}>{locationName}</h1>
      <div>{`Посещено ${visitsList.length} раз`}</div>
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
};

const mapStateToRequirements = (state, { locationId }) => ({
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
  },
  domain: 'locationPage',
});

export default compose(
  withStyles(styles),
  withProvision(mapStateToRequirements),
)(LocationCard);
