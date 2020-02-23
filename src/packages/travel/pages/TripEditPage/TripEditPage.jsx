import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { useAuthContext } from 'core/context/AuthContext';
import { useTripsStats } from 'travel/dataSource';
import { initializeTrip } from 'travel/models/trips';
import Trip from './blocks/Trip';
import useTripEditRequests from './useTripEditRequests';

function TripEditPage({
  match: {
    params: { userAlias, strTripId, action },
  },
}) {
  const isCreation = action === 'create';
  const {
    isAuthenticated,
    userAlias: authenticatedUserAlias,
  } = useAuthContext();

  const tripId = strTripId && parseInt(strTripId, 10);
  const provision = useTripsStats({
    userAlias,
    tripsIds: tripId ? [tripId] : [],
  });
  const { tripsDict } = provision;
  const trip = isCreation ? initializeTrip() : tripsDict[tripId];

  const {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleSubmitVisitsOrder,
  } = useTripEditRequests();

  const { isError, isReady, isPending } = provision;
  if ((!tripId || (isReady && !trip)) && !isCreation) {
    return <div>Запрашиваемая вами страница не найдена</div>;
  }
  if (!isAuthenticated || authenticatedUserAlias !== userAlias) {
    return <div>У вас не достаочно прав для просмотра данной страницы</div>;
  }
  if (isError) {
    return <div>...Error</div>;
  }
  if (isPending) {
    return <div>...Loading</div>;
  }

  return (
    <>
      <Typography>
        {isCreation ? 'Создание поездки' : 'Редактирование поездки'}
      </Typography>
      {trip && (
        <Trip
          provision={provision}
          onRideUpdate={handleSubmitRide}
          onTripUpdate={handleSubmitTrip}
          onVisitUpdate={handleSubmitVisit}
          onVisitsOrderUpdate={handleSubmitVisitsOrder}
          trip={trip}
        />
      )}
    </>
  );
}

TripEditPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      userAlias: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default TripEditPage;
