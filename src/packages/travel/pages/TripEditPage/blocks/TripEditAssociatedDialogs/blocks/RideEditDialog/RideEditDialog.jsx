import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import RideEditFormSection from 'travel/components/RideEditFormSection';
import * as locators from '../../../../locators';

export default function RideEditDialog({
  isCreation,
  tripVisitsIds,
  visitsDict,
  ...forwardingProps
}) {
  return (
    <FormDialog
      data-locator={locators.RIDE_DIALOG}
      title={isCreation ? 'Создание маршрута' : 'Редактирование маршрута'}
      {...forwardingProps}
    >
      <RideEditFormSection
        tripVisitsIds={tripVisitsIds}
        visitsDict={visitsDict}
        formikProps={null /* will be passed in FormDialog */}
      />
    </FormDialog>
  );
}
