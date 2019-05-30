import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import RideEditCard, { useRideState } from './RideEditCard';

const RideInputDialog = ({
  visitId,
  ride,
  visitsByTrip,
  locationsDict,
  children,
  className,
  onSubmit: handleSubmit,
}) => {
  const visitIndex =
    visitsByTrip &&
    visitsByTrip.findIndex(
      ({ visitId: visitIdToCompare }) => visitIdToCompare === visitId,
    );
  const prevVisitId =
    visitIndex >= 1 ? visitsByTrip[visitIndex - 1].visitId : undefined;
  const { rideState, setRideState } = useRideState({
    initialState: ride,
    nearestDepartureVisitId: prevVisitId,
    nearestArrivalVisitId: visitId,
  });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = () => {
    handleSubmit(rideState);
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
      <Dialog
        transitionDuration={500}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Транспорт</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Как вы добрались в место назначения и как уехали из него?
          </DialogContentText>
          <RideEditCard
            locationsDict={locationsDict}
            visitsByTrip={visitsByTrip}
            rideState={rideState}
            setRideState={setRideState}
          />
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
    </div>
  );
};

RideInputDialog.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onSubmit: PropTypes.func.isRequired,
};
RideInputDialog.defaultProps = {
  className: undefined,
};

export default RideInputDialog;
