import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { useAuthContext } from 'core/context/AuthContext';
import { useTripsStats } from 'travel/dataSource';
import { initializeTrip } from 'travel/models/trips';
import { initializeRide } from 'travel/models/rides';
import { initializeVisit } from 'travel/models/visits';
import TripEditForm from './blocks/TripEditForm';
import RideEditDialog from './blocks/RideEditDialog';
import VisitEditDialog from './blocks/VisitEditDialog';
import useTripEditRequests from './useTripEditRequests';
import useTripEditPageDialogsState, {
  DIALOG_NAMES,
} from './useTripEditPageDialogsState';

function resolveInitialValues(dict, ids, defaultValue) {
  return ids.reduce((accumulator, id) => {
    accumulator[id] = dict[id] || defaultValue;
    return accumulator;
  }, {});
}

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
  const { tripsDict, ridesDict, visitsDict } = provision;
  const trip = isCreation ? initializeTrip() : tripsDict[tripId];

  const {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleSubmitVisitOrder,
  } = useTripEditRequests();

  const {
    rideIdToEdit,
    visitIdToEdit,
    shownDialogName,
    showDialog,
    hideDialog,
  } = useTripEditPageDialogsState();

  const isRideEditDialogShown =
    shownDialogName === DIALOG_NAMES.RIDE_EDIT ||
    shownDialogName === DIALOG_NAMES.RIDE_CREATE;
  const isVisitEditDialogShown =
    shownDialogName === DIALOG_NAMES.VISIT_EDIT ||
    shownDialogName === DIALOG_NAMES.VISIT_CREATE;

  const initialRideValues = useMemo(
    () => (rideIdToEdit ? ridesDict[rideIdToEdit] : initializeRide()),
    [rideIdToEdit],
  );

  const initialVisitValues = useMemo(
    () => (visitIdToEdit ? visitsDict[visitIdToEdit] : initializeVisit()),
  );

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

  const { visits: tripVisitsIds, rides: tripRidesIds } = trip;
  const actualVisitsDict = resolveInitialValues(visitsDict, tripVisitsIds, {});
  const actualRidesDict = resolveInitialValues(ridesDict, tripRidesIds, {});

  return (
    <>
      <Formik
        initialValues={{
          trip,
          visitsDict: actualVisitsDict,
          ridesDict: actualRidesDict,
        }}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 100);
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
      <RideEditDialog
        initialValues={initialRideValues}
        isOpen={isRideEditDialogShown}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 100);
        }}
        onReset={hideDialog}
        title={
          shownDialogName === DIALOG_NAMES.RIDE_CREATE
            ? 'Создание маршрута'
            : 'Редактирование маршрута'
        }
      />
      <VisitEditDialog
        initialValues={initialVisitValues}
        isOpen={isVisitEditDialogShown}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            alert(JSON.stringify(values, null, 2));
            actions.setSubmitting(false);
          }, 100);
        }}
        onReset={hideDialog}
        title={
          shownDialogName === DIALOG_NAMES.VISIT_CREATE
            ? 'Создание посешения'
            : 'Редактирование посещения'
        }
        availableRidesIds={trip.rides}
        ridesDict={ridesDict}
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
