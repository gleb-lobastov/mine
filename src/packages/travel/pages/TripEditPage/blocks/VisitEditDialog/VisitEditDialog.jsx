import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import VisitEditFormSection from 'travel/components/models/visits/VisitEditFormSection';

export default function RideEditDialog(props) {
  return (
    <FormDialog {...props}>
      <VisitEditFormSection
        formikProps={null /* will be passed in FormDialog */}
      />
    </FormDialog>
  );
}
