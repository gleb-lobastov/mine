import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DialogWithForm from 'modules/components/muiExtended/DialogWithForm';
import RideEditForm from './blocks/RideEditForm';

const RideDeleteDialog = ({ ride }) => {
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
          title="Удаление маршрута"
          description="Вы действительно хотите удалить маршрут?"
        >
          <RideEditForm
            availableVisits={availableVisits}
            originLocation={originLocation}
          />
        </DialogWithForm>
      )}
    </div>
  );
};

RideDeleteDialog.defaultProps = {
  className: undefined,
  availableVisits: [],
};

export default RideDeleteDialog;
