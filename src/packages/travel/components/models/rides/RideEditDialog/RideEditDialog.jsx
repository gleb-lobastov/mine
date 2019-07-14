import React from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import locationsPropTypes from 'travel/models/locations/propTypes';
import ridePropTypes from 'travel/models/rides/propTypes';
import visitPropTypes from 'travel/models/visits/propTypes';
import RideEditForm from './blocks/RideEditForm';

const RideEditDialog = ({
  availableVisits,
  initialState,
  children,
  className,
  onSubmit: handleSubmitExternal,
  originLocation,
}) => {
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = values => {
    handleSubmitExternal(values);
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
        <Formik
          initialValues={initialState}
          enableReinitialize={true}
          onSubmit={handleSubmitInternal}
        >
          {({ handleSubmit, ...formikProps }) => (
            <Dialog
              transitionDuration={500}
              open={true}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title">Транспорт</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Как вы добрались в место назначения и как уехали из него?
                </DialogContentText>
                <RideEditForm
                  {...formikProps}
                  availableVisits={availableVisits}
                  originLocation={originLocation}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="secondary">
                  Отмена
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Сохранить
                </Button>
              </DialogActions>
            </Dialog>
          )}
        </Formik>
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
