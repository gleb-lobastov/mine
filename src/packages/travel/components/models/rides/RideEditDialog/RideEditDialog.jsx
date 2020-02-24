import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import DialogWithForm from 'modules/components/muiExtended/DialogWithForm';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import RideEditForm from './blocks/RideEditForm';

const RideEditDialog = ({
  availableVisits,
  formikProps,
  children,
  className,
  originLocation,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = values => {
    handleClose(false);
  };

  return (
    <div className={className}>
      <IconButton
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        {children}
      </IconButton>
      {isOpen && (
        <DialogWithForm
          initialValues={initialState}
          enableReinitialize={true}
          onSubmit={handleSubmitInternal}
          onReject={handleClose}
          title="Транспорт"
          description="Как вы добрались в место назначения и как уехали из него?"
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

RideEditDialog.propTypes = {
  availableVisits: PropTypes.arrayOf(PropTypes.shape(visitPropTypes)),
  initialState: PropTypes.shape(ridePropTypes).isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
  originLocation: PropTypes.shape(locationsPropTypes).isRequired,
};
RideEditDialog.defaultProps = {
  className: undefined,
  availableVisits: [],
};

export default RideEditDialog;
