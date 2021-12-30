import React from 'react';
import DialogWithForm from 'modules/components/muiExtended/DialogWithForm';
import RideEditFormSection from '../RideEditFormSection';

const RideEditDialog = ({ children, className }) => {
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = values => {
    handleClose(false);
  };

  return (
    <div className={className}>
      {children}
      {isOpen && (
        <DialogWithForm
          initialValues={{}}
          enableReinitialize={true}
          onSubmit={handleSubmitInternal}
          onReject={handleClose}
          title="Транспорт"
          description="Как вы добрались в место назначения и как уехали из него?"
        >
          <RideEditFormSection availableVisits={[]} originLocation={{}} />
        </DialogWithForm>
      )}
    </div>
  );
};

RideEditDialog.defaultProps = {
  className: undefined,
  availableVisits: [],
};

export default RideEditDialog;
