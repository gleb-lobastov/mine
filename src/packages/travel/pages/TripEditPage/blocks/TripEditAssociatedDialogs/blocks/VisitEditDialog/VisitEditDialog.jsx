import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import VisitEditFormSection from 'travel/components/models/visits/VisitEditFormSection';
import * as locators from '../../../../locators';

export default function VisitEditDialog({
  isCreation,
  tripRidesIds,
  ridesDict,
  ...forwardingProps
}) {
  return (
    <FormDialog
      data-locator={locators.VISIT_DIALOG}
      title={isCreation ? 'Создание посещения' : 'Редактирование посещения'}
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
