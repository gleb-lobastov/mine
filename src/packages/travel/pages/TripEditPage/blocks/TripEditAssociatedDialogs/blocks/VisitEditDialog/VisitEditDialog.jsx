import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import VisitEditFormSection from 'travel/components/models/visits/VisitEditFormSection';

export default function VisitEditDialog({ isCreation, ...forwardingProps }) {
  return (
    <FormDialog
      title={isCreation ? 'Создание посешения' : 'Редактирование посещения'}
      {...forwardingProps}
    >
      <VisitEditFormSection
        formikProps={null /* will be passed in FormDialog */}
      />
    </FormDialog>
  );
}
