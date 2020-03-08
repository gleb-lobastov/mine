import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import VisitEditFormSection from 'travel/components/models/visits/VisitEditFormSection';

export default function VisitEditDialog({
  isCreation,
  tripRidesIds,
  ridesDict,
  ...forwardingProps
}) {
  return (
    <FormDialog
      title={isCreation ? 'Создание посешения' : 'Редактирование посещения'}
      {...forwardingProps}
    >
      <VisitEditFormSection
        tripRidesIds={tripRidesIds}
        ridesDict={ridesDict}
        formikProps={null /* will be passed in FormDialog */}
      />
    </FormDialog>
  );
}
