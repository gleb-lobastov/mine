import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DialogWithForm from 'modules/components/muiExtended/DialogWithForm';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
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

RideDeleteDialog.propTypes = {
  availableVisits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  initialState: PropTypes.shape(ridePropTypes).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  originLocation: PropTypes.shape(locationsPropTypes).isRequired,
};
RideDeleteDialog.defaultProps = {
  className: undefined,
  availableVisits: [],
};

export default RideDeleteDialog;
