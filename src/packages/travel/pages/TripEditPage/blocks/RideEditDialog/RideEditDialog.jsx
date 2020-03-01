import React from 'react';
import FormDialog from 'modules/components/FormDialog';
import RideEditFormSection from 'travel/components/models/rides/RideEditFormSection';

export default function RideEditDialog(props) {
  return (
    <FormDialog {...props}>
      <RideEditFormSection
        formikProps={null /* will be passed in FormDialog */}
      />
    </FormDialog>
  );
}
