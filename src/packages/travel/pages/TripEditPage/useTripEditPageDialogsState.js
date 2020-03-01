import { useState, useCallback } from 'react';

export const DIALOG_NAMES = {
  RIDE_CREATE: 'RIDE_CREATE_DIALOG',
  RIDE_EDIT: 'RIDE_EDIT_DIALOG',
  RIDE_DELETE: 'RIDE_DELETE_DIALOG',
  VISIT_CREATE: 'VISIT_CREATE_DIALOG',
  VISIT_EDIT: 'VISIT_EDIT_DIALOG',
  VISIT_DELETE: 'VISIT_DELETE_DIALOG',
};

const ENTITIES = {
  RIDES: 'RIDES',
  VISITS: 'VISITS',
};

const DIALOG_TO_ENTITY_MAPPING = {
  [DIALOG_NAMES.RIDE_CREATE]: ENTITIES.RIDES,
  [DIALOG_NAMES.RIDE_EDIT]: ENTITIES.RIDES,
  [DIALOG_NAMES.RIDE_DELETE]: ENTITIES.RIDES,
  [DIALOG_NAMES.VISIT_CREATE]: ENTITIES.VISITS,
  [DIALOG_NAMES.VISIT_EDIT]: ENTITIES.VISITS,
  [DIALOG_NAMES.VISIT_DELETE]: ENTITIES.VISITS,
};

export default function useTripEditPageDialogsState() {
  const [shownDialogName, setShownDialog] = useState(null);
  const [entityIdToEdit, setEntityIdToEdit] = useState(null);

  const showDialog = useCallback((dialogName, entityId) => {
    setShownDialog(dialogName);
    setEntityIdToEdit(entityId || null);
  });

  const hideDialog = useCallback(() => {
    setShownDialog(null);
    setEntityIdToEdit(null);
  });

  return {
    ...resolveEntitiesState(shownDialogName, entityIdToEdit),
    entityIdToEdit,
    shownDialogName,
    showDialog,
    hideDialog,
  };
}

function resolveEntitiesState(shownDialogName, entityId) {
  const entity = DIALOG_TO_ENTITY_MAPPING[shownDialogName];
  switch (entity) {
    case ENTITIES.VISITS:
      return { rideIdToEdit: null, visitIdToEdit: entityId };
    case ENTITIES.RIDES:
      return { rideIdToEdit: entityId, visitIdToEdit: null };
    default:
      return { rideIdToEdit: null, visitIdToEdit: null };
  }
}
