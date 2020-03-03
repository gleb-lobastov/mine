import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import VisitEditFormSection from 'travel/components/models/visits/VisitEditFormSection';

export default function VisitEditDialog({
  availableRidesIds,
  isCreation,
  ridesDict,
  ...forwardingProps
}) {
  return (
    <FormDialog {...forwardingProps}>
      <VisitEditFormSection
        formikProps={null /* will be passed in FormDialog */}
        availableRidesIds={availableRidesIds}
        isCreation={isCreation}
        ridesDict={ridesDict}
      />
    </FormDialog>
  );
}
