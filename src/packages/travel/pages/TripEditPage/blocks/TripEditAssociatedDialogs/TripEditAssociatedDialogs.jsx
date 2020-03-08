import React, { useMemo } from 'react';
import { initializeRide } from 'travel/models/rides';
import { initializeVisit } from 'travel/models/visits';
import RideEditDialog from './blocks/RideEditDialog';
import VisitEditDialog from './blocks/VisitEditDialog';
import VisitDeleteDialog from './blocks/VisitDeleteDialog';
import { DIALOG_NAMES } from '../../useTripEditPageDialogs';

export default function TripEditAssociatedDialogs({
  provision,
  dialogsState,
  hideDialog,
  handleSubmitRide,
  handleSubmitVisit,
  handleDeleteVisit,
  trip,
}) {
  const { ridesDict, visitsDict } = provision;
  const { tripId, visits: tripVisitsIds, rides: tripRidesIds } = trip;
  const { dialogName, dialogParams = {} } = dialogsState;

  const initialRideValues = useMemo(
    () => {
      const { rideId } = dialogParams;
      const initialValues = rideId ? ridesDict[rideId] : initializeRide();
      return {
        ...initialValues,
        ...dialogParams,
        tripId,
      };
    },
    [ridesDict, tripId, dialogParams],
  );

  const initialVisitValues = useMemo(
    () => {
      const { visitId } = dialogParams;
      const initialValues = visitId ? visitsDict[visitId] : initializeVisit();
      return {
        ...initialValues,
        ...dialogParams,
        tripId,
      };
    },
    [visitsDict, tripId, dialogParams],
  );

  const isRideEditDialogShown = checkIsRideEditDialogShown(dialogName);
  const isVisitEditDialogShown = checkIsVisitEditDialogShown(dialogName);
  const isVisitDeleteDialogShown = dialogName === DIALOG_NAMES.VISIT_DELETE;
  return (
    <>
      <RideEditDialog
        initialValues={initialRideValues}
        tripVisitsIds={tripVisitsIds}
        isOpen={isRideEditDialogShown}
        onSubmit={values => {
          handleSubmitRide(values);
          hideDialog();
        }}
        onReset={hideDialog}
        isCreation={dialogName === DIALOG_NAMES.RIDE_CREATE}
        visitsDict={visitsDict}
      />
      <VisitEditDialog
        initialValues={initialVisitValues}
        tripRidesIds={tripRidesIds}
        isOpen={isVisitEditDialogShown}
        onSubmit={values => {
          handleSubmitVisit(values);
          hideDialog();
        }}
        onReset={hideDialog}
        isCreation={dialogName === DIALOG_NAMES.VISIT_CREATE}
        ridesDict={ridesDict}
      />
      <VisitDeleteDialog
        visit={visitsDict[dialogParams.visitId]}
        isOpen={isVisitDeleteDialogShown}
        onSubmit={(event, { visitId }) => {
          handleDeleteVisit(visitId);
          hideDialog();
        }}
        onReset={hideDialog}
      />
    </>
  );
}

function checkIsRideEditDialogShown(dialogName) {
  return (
    dialogName === DIALOG_NAMES.RIDE_EDIT ||
    dialogName === DIALOG_NAMES.RIDE_CREATE
  );
}

function checkIsVisitEditDialogShown(dialogName) {
  return (
    dialogName === DIALOG_NAMES.VISIT_EDIT ||
    dialogName === DIALOG_NAMES.VISIT_CREATE
  );
}
