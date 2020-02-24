import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useAuthContext } from 'core/context/AuthContext';
import { useTripsStats } from 'travel/dataSource';
import { initializeTrip } from 'travel/models/trips';
import TripVisitsAndRidesEditForm from './blocks/TripEditForm/TripVisitsAndRidesEditForm';
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
    handleSubmitVisitOrder,
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

  if (!trip) {
    return <div>...Error, no trip is provided</div>;
  }

  const { visitsDict, ridesDict } = provision;
  const { visits: tripVisitsIds, rides: tripRidesIds } = trip;
  const tripVisitsList = tripVisitsIds
    .map(visitId => visitsDict[visitId])
    .filter(Boolean);
  const tripRidesList = tripRidesIds
    .map(rideId => ridesDict[rideId])
    .filter(Boolean);

  return (
    <Formik
      initialValues={{ trip, visits: tripVisitsList, rides: tripRidesList }}
      onSubmit={(values, actions) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          actions.setSubmitting(false);
        }, 100);
      }}
    >
      {formikProps => (
        <TripVisitsAndRidesEditForm
          isCreation={isCreation}
          formikProps={formikProps}
          provision={provision}
        />
      )}
    </Formik>
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
