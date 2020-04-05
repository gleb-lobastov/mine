import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { Formik } from 'formik';
import { usePaths } from 'modules/packages';
import { useAuthContext } from 'core/context/AuthContext';
import { useTripsStats } from 'travel/dataSource';
import { initializeTrip } from 'travel/models/trips';
import TripEditForm from './blocks/TripEditForm';
import TripEditAssociatedDialogs from './blocks/TripEditAssociatedDialogs';
import useTripEditRequests from './useTripEditRequests';
import useTripEditPageDialogs from './useTripEditPageDialogs';

function TripEditPage({
  match: {
    params: { userAlias, strTripId, action },
  },
}) {
  const {
    travel: { tripEdit: tripEditPath },
  } = usePaths();
  const history = useHistory();
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
  const { tripsDict, tripsProvision } = provision;
  const trip = isCreation ? initializeTrip() : tripsDict[tripId];

  const {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleDeleteVisit,
  } = useTripEditRequests(tripsProvision.invalidate);

  const { showDialog, hideDialog, dialogsState } = useTripEditPageDialogs();

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

  return (
    <>
      <Formik
        initialValues={{ trip }}
        onSubmit={values => {
          return handleSubmitTrip(values.trip).then(newTripId => {
            if (tripId || !newTripId) {
              return;
            }
            const tripEditPageUrl = tripEditPath.toUrl({
              userAlias,
              strTripId: String(newTripId),
            });
            history.push(tripEditPageUrl);
          });
        }}
      >
        {formikProps => (
          <TripEditForm
            isCreation={isCreation}
            showDialog={showDialog}
            formikProps={formikProps}
            provision={provision}
          />
        )}
      </Formik>
      <TripEditAssociatedDialogs
        provision={provision}
        dialogsState={dialogsState}
        hideDialog={hideDialog}
        handleSubmitRide={handleSubmitRide}
        handleSubmitVisit={handleSubmitVisit}
        handleDeleteVisit={handleDeleteVisit}
        trip={trip}
      />
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
