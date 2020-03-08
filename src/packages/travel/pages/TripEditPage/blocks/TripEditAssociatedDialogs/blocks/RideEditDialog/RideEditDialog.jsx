import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import RideEditFormSection from 'travel/components/models/rides/RideEditFormSection';

export default function RideEditDialog({
  isCreation,
  tripVisitsIds,
  visitsDict,
  ...forwardingProps
}) {
  return (
    <FormDialog
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
