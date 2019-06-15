import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ridePropTypes from 'travel/models/rides/propTypes';
import TripEditCard, { useTripState } from './blocks/TripEditCard';

const TripEditDialog = ({ initialState, children, onSubmit: handleSubmit }) => {
  const { tripState, setTripState } = useTripState(initialState);
  const [isOpen, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = () => {
    handleSubmit(tripState);
    handleClose(false);
  };

  return (
    <>
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
        <Dialog
          transitionDuration={500}
          open={isOpen}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Поездка</DialogTitle>
          <DialogContent>
            <DialogContentText>Редактирование поездки</DialogContentText>
            <TripEditCard tripState={tripState} setTripState={setTripState} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Отмена
            </Button>
            <Button onClick={handleSubmitInternal} color="primary">
              Сохранить
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
};

TripEditDialog.propTypes = {
  initialState: PropTypes.shape(ridePropTypes).isRequired,
  children: PropTypes.node.isRequired,
  onSubmit: PropTypes.func.isRequired,
};
TripEditDialog.defaultProps = {};

export default TripEditDialog;
