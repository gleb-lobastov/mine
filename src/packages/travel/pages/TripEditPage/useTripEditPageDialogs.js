import { useState } from 'react';

export const DIALOG_NAMES = {
  RIDE_CREATE: 'RIDE_CREATE_DIALOG',
  RIDE_EDIT: 'RIDE_EDIT_DIALOG',
  RIDE_DELETE: 'RIDE_DELETE_DIALOG',
  VISIT_CREATE: 'VISIT_CREATE_DIALOG',
  VISIT_EDIT: 'VISIT_EDIT_DIALOG',
  VISIT_DELETE: 'VISIT_DELETE_DIALOG',
};

export default function useTripEditPageDialogs() {
  const [dialogsState, setDialogsState] = useState({ name: null });
  const showDialog = (dialogName, dialogParams) => {
    setDialogsState({ dialogName, dialogParams });
  };
  const hideDialog = () => {
    setDialogsState({ name: null });
  };
  return { showDialog, hideDialog, dialogsState };
}
