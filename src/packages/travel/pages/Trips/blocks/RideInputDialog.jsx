import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import RideEditCard, { useRideState } from './RideEditCard';

const RideInputDialog = ({
  ridesDict,
  visit: { arrivalRideId, departureRideId },
  className,
  onSubmit: handleSubmit,
}) => {
  const {
    rideState: arrivalRideState,
    setRideState: setArrivalRideState,
  } = useRideState({ initialState: ridesDict[arrivalRideId] });
  const {
    rideState: departureRideState,
    setRideState: setDepartureRideState,
  } = useRideState({ initialState: ridesDict[departureRideId] });
  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmitInternal = () => {
    handleSubmit({
      arrivalRide: arrivalRideState,
      departureRide: departureRideState,
    });
    handleClose(false);
  };

  return (
    <div className={className}>
      <Button
        data-sort-handler="disabled"
        size="small"
        variant="outlined"
        color="primary"
        onClick={handleClickOpen}
      >
        Редактировать
      </Button>
      <Dialog
        transitionDuration={500}
        fullScreen={true}
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Транспорт</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Как вы добрались в место назначения и как уехали из него?
          </DialogContentText>
          <Typography variant="h6" color="inherit">
            Прибытие
          </Typography>
          <RideEditCard
            rideState={arrivalRideState}
            setRideState={setArrivalRideState}
          />
          <Typography variant="h6" color="inherit">
            Отправление
          </Typography>
          <RideEditCard
            rideState={departureRideState}
            setRideState={setDepartureRideState}
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
  className: PropTypes.string,
  ridesDict: PropTypes.objectOf(
    PropTypes.shape({
      rideId: PropTypes.number,
    }),
  ).isRequired,
  visit: PropTypes.shape({
    arrivalRideId: PropTypes.number,
    departureRideId: PropTypes.number,
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
};
RideInputDialog.defaultProps = {
  className: undefined,
};

export default RideInputDialog;
