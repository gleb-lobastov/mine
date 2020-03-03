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
import VisitDeleteDialog from './blocks/VisitDeleteDialog';
import useTripEditRequests from './useTripEditRequests';
import useTripEditPageDialogsState, {
  DIALOG_NAMES,
} from './useTripEditPageDialogsState';

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
  const { tripsDict, ridesDict, visitsDict, tripsProvision } = provision;
  const trip = isCreation ? initializeTrip() : tripsDict[tripId];

  const {
    handleSubmitRide,
    handleSubmitTrip,
    handleSubmitVisit,
    handleDeleteVisit,
  } = useTripEditRequests(tripsProvision.invalidate);

  const {
    rideIdToEdit,
    visitIdToEdit,
    shownDialogName,
    showDialog,
    hideDialog,
    initialValues,
  } = useTripEditPageDialogsState();

  const isRideEditDialogShown =
    shownDialogName === DIALOG_NAMES.RIDE_EDIT ||
    shownDialogName === DIALOG_NAMES.RIDE_CREATE;
  const isVisitEditDialogShown =
    shownDialogName === DIALOG_NAMES.VISIT_EDIT ||
    shownDialogName === DIALOG_NAMES.VISIT_CREATE;

  const initialRideValues = useMemo(
    () => {
      const values = rideIdToEdit ? ridesDict[rideIdToEdit] : initializeRide();
      return {
        ...values,
        ...initialValues,
        tripId,
      };
    },
    [ridesDict, rideIdToEdit, tripId, initialValues],
  );

  // todo order in trip
  const initialVisitValues = useMemo(
    () => {
      const values = visitIdToEdit
        ? visitsDict[visitIdToEdit]
        : initializeVisit();
      return {
        ...values,
        ...initialValues,
        tripId,
      };
    },
    [visitsDict, visitIdToEdit, tripId, initialValues],
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

  return (
    <>
      <Formik
        initialValues={{ trip }}
        onSubmit={values => handleSubmitTrip(values.trip)}
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
        onSubmit={values => {
          handleSubmitRide(values);
          hideDialog();
        }}
        onReset={hideDialog}
        title={
          shownDialogName === DIALOG_NAMES.RIDE_CREATE
            ? 'Создание маршрута'
            : 'Редактирование маршрута'
        }
        isCreation={shownDialogName === DIALOG_NAMES.RIDE_CREATE}
      />
      <VisitEditDialog
        initialValues={initialVisitValues}
        isOpen={isVisitEditDialogShown}
        onSubmit={values => {
          handleSubmitVisit(values);
          hideDialog();
        }}
        onReset={hideDialog}
        title={
          shownDialogName === DIALOG_NAMES.VISIT_CREATE
            ? 'Создание посешения'
            : 'Редактирование посещения'
        }
        isCreation={shownDialogName === DIALOG_NAMES.VISIT_CREATE}
        availableRidesIds={trip.rides}
        ridesDict={ridesDict}
      />
      <VisitDeleteDialog
        visit={visitsDict[visitIdToEdit]}
        isOpen={shownDialogName === DIALOG_NAMES.VISIT_DELETE}
        onSubmit={(event, { visitId }) => {
          handleDeleteVisit(visitId);
          hideDialog();
        }}
        onReset={hideDialog}
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
